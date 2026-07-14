/**
 * tooltip-manager.js — Contextual glossary tooltips + glossary modal.
 *
 * Reusable, self-contained UI module: it owns the tooltip element and the
 * glossary modal it creates under <body>. The rest of the app interacts
 * with it through three calls:
 *
 *   CQA.tooltipManager.init()          build tooltip/modal, global listeners
 *   CQA.tooltipManager.annotate(root)  wrap known terms found under `root`
 *   CQA.tooltipManager.openGlossary()  open the alphabetical glossary modal
 *
 * Term data comes from the tooltip dictionary in CQA.data (assets/data/
 * tooltips.js). Detection is case-insensitive on word boundaries; only the
 * first occurrence of each term per annotate() call is wrapped to keep
 * text readable. Text inside links, buttons, form controls and code is
 * never wrapped.
 *
 * Interaction model:
 *   hover / keyboard focus  → tooltip shows (with a grace delay on leave,
 *                             so moving the pointer into the tooltip keeps
 *                             it open — no flicker)
 *   click / tap             → tooltip pins open (mobile-friendly popover)
 *   Escape / outside click  → closes tooltip and glossary
 */

window.CQA = window.CQA || {};

/**
 * Shared accessibility micro-utility: while a modal overlay is open, the
 * app shell (header/main/footer) is made inert so Tab and screen readers
 * stay inside the dialog. Defined here because tooltip-manager is the
 * first UI module loaded; render.js and certificate.js reuse it.
 */
CQA.a11y = CQA.a11y || {
  setAppInert: function (isInert) {
    [".app-header", ".app-main", ".app-footer"].forEach(function (selector) {
      const node = document.querySelector(selector);
      if (node) node.inert = isInert;
    });
    // Lock body scroll while a modal is open so touch scrolling stays
    // inside the dialog (styled via body.modal-open in main.css).
    document.body.classList.toggle("modal-open", isInert);
  },
};

CQA.tooltipManager = (function () {
  "use strict";

  /** Never wrap terms inside these elements. */
  const SKIP_SELECTOR = "a, button, code, pre, input, select, textarea, .term, .cqa-tooltip";

  const HIDE_DELAY_MS = 220; // grace period to travel from term to tooltip

  let termRegex = null;     // built lazily from the dictionary
  let tooltipEl = null;     // singleton tooltip node
  let glossaryOverlay = null;
  let glossaryListEl = null;
  let glossaryTitleEl = null;
  let glossaryCloseEl = null;
  let currentTermEl = null; // the .term span the tooltip is anchored to
  let pinned = false;       // click/tap keeps the tooltip open
  let hideTimer = null;
  let lastGlossaryTrigger = null; // focus returns here when the modal closes

  /* ======================================================================
     Term detection
     ====================================================================== */

  function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /** One alternation of all dictionary terms, longest first ("Blob Storage" before "Blob"). */
  function getTermRegex() {
    if (termRegex) return termRegex;
    const terms = CQA.data.getAllTooltips()
      .map(function (t) { return t.term; })
      .sort(function (a, b) { return b.length - a.length; })
      .map(escapeRegex);
    if (terms.length === 0) return null;
    termRegex = new RegExp("\\b(" + terms.join("|") + ")\\b", "gi");
    return termRegex;
  }

  /** Build the interactive span for one detected term. */
  function buildTermSpan(matchedText, entry) {
    const span = document.createElement("span");
    span.className = "term";
    span.textContent = matchedText;
    span.dataset.term = entry.term;
    span.tabIndex = 0;
    span.setAttribute("role", "button");
    span.setAttribute("aria-label", matchedText + " — show definition");

    span.addEventListener("mouseenter", function () { show(span, false); });
    span.addEventListener("mouseleave", scheduleHide);
    span.addEventListener("focus", function () { show(span, false); });
    span.addEventListener("blur", function () { if (!pinned) hide(); });
    span.addEventListener("click", function (event) {
      event.stopPropagation();
      if (pinned && currentTermEl === span) {
        hide();
      } else {
        show(span, true);
      }
    });
    span.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        show(span, true);
      }
    });
    return span;
  }

  /**
   * Wrap dictionary terms found in text nodes under `root`.
   * Safe by construction: only text nodes are split and replaced, so the
   * existing HTML structure is never re-parsed or broken. Skips content
   * inside SKIP_SELECTOR elements; wraps only the first occurrence of
   * each term per call.
   */
  function annotate(root) {
    if (!root) return;
    const regex = getTermRegex();
    if (!regex) return;

    const seen = new Set();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest(SKIP_SELECTOR)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    // Collect first — replacing nodes while walking confuses the TreeWalker.
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(function (node) {
      const text = node.nodeValue;
      regex.lastIndex = 0;

      let match;
      let cursor = 0;
      let fragment = null;

      while ((match = regex.exec(text)) !== null) {
        const entry = CQA.data.getTooltip(match[1]);
        if (!entry) continue;
        const key = entry.term.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        if (!fragment) fragment = document.createDocumentFragment();
        if (match.index > cursor) {
          fragment.appendChild(document.createTextNode(text.slice(cursor, match.index)));
        }
        fragment.appendChild(buildTermSpan(match[1], entry));
        cursor = match.index + match[1].length;
      }

      if (fragment) {
        if (cursor < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(cursor)));
        }
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }

  /* ======================================================================
     Tooltip element & content
     ====================================================================== */

  function buildTooltipEl() {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "cqa-tooltip is-hidden";
    tooltipEl.id = "cqa-tooltip";
    tooltipEl.setAttribute("role", "tooltip");

    // Keep the tooltip open while the pointer is inside it.
    tooltipEl.addEventListener("mouseenter", cancelHide);
    tooltipEl.addEventListener("mouseleave", scheduleHide);
    tooltipEl.addEventListener("click", function (event) { event.stopPropagation(); });

    document.body.appendChild(tooltipEl);
  }

  function providerTag(providerId) {
    const provider = CQA.data.getProviders()
      .find(function (p) { return p.id === providerId; });
    if (!provider) return null;
    const tag = document.createElement("span");
    tag.className = "cqa-tooltip-provider";
    const dot = document.createElement("span");
    dot.className = "chip-dot";
    dot.style.background = "var(" + provider.colorToken + ")";
    dot.setAttribute("aria-hidden", "true");
    tag.append(dot, document.createTextNode(CQA.i18n.label("provider", provider.id, provider.label)));
    return tag;
  }

  /**
   * Fill the tooltip with one dictionary entry's content. The term
   * itself (canonical technical name) is never translated; only the
   * definition switches language, via CQA.data.localizeTooltip().
   */
  function renderTooltipContent(entry) {
    const header = document.createElement("div");
    header.className = "cqa-tooltip-header";
    const title = document.createElement("strong");
    title.className = "cqa-tooltip-term";
    title.textContent = entry.term;
    header.appendChild(title);
    const tag = entry.provider ? providerTag(entry.provider) : null;
    if (tag) header.appendChild(tag);

    const definition = document.createElement("p");
    definition.className = "cqa-tooltip-definition";
    definition.textContent = CQA.data.localizeTooltip(entry, CQA.i18n.getLang());

    tooltipEl.replaceChildren(header, definition);

    if (entry.relatedTerms && entry.relatedTerms.length > 0) {
      const related = document.createElement("div");
      related.className = "cqa-tooltip-related";
      entry.relatedTerms.forEach(function (name) {
        const relatedEntry = CQA.data.getTooltip(name);
        if (!relatedEntry) return;
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "cqa-tooltip-related-chip";
        chip.textContent = relatedEntry.term;
        chip.addEventListener("click", function () {
          renderTooltipContent(relatedEntry); // browse the glossary in place
          position(currentTermEl);
        });
        related.appendChild(chip);
      });
      if (related.childNodes.length > 0) tooltipEl.appendChild(related);
    }

    if (entry.docsLabel) {
      const docs = document.createElement("p");
      docs.className = "cqa-tooltip-docs";
      docs.textContent = CQA.i18n.t("tooltip.docs") + entry.docsLabel;
      tooltipEl.appendChild(docs);
    }
  }

  /** Place the tooltip under its term — above when there is no room below. */
  function position(termEl) {
    if (!termEl || !termEl.isConnected) return;
    const rect = termEl.getBoundingClientRect();
    const margin = 8;

    tooltipEl.style.maxWidth = Math.min(340, window.innerWidth - margin * 2) + "px";
    const size = tooltipEl.getBoundingClientRect();

    let top = rect.bottom + margin;
    if (top + size.height > window.innerHeight - margin && rect.top - size.height - margin > 0) {
      top = rect.top - size.height - margin;
    }
    let left = rect.left;
    left = Math.max(margin, Math.min(left, window.innerWidth - size.width - margin));

    tooltipEl.style.top = Math.round(top) + "px";
    tooltipEl.style.left = Math.round(left) + "px";
  }

  /* ======================================================================
     Show / hide
     ====================================================================== */

  function show(termEl, pin) {
    const entry = CQA.data.getTooltip(termEl.dataset.term);
    if (!entry) return;

    cancelHide();
    if (currentTermEl && currentTermEl !== termEl) {
      currentTermEl.removeAttribute("aria-describedby");
    }
    currentTermEl = termEl;
    pinned = pinned && currentTermEl === termEl ? pinned : false;
    if (pin) pinned = true;

    renderTooltipContent(entry);
    tooltipEl.classList.remove("is-hidden");
    termEl.setAttribute("aria-describedby", tooltipEl.id);
    position(termEl);
  }

  function hide() {
    cancelHide();
    pinned = false;
    tooltipEl.classList.add("is-hidden");
    if (currentTermEl) {
      currentTermEl.removeAttribute("aria-describedby");
      currentTermEl = null;
    }
  }

  function scheduleHide() {
    if (pinned) return;
    cancelHide();
    hideTimer = window.setTimeout(hide, HIDE_DELAY_MS);
  }

  function cancelHide() {
    if (hideTimer !== null) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function isVisible() {
    return !tooltipEl.classList.contains("is-hidden");
  }

  /* ======================================================================
     Glossary modal
     ====================================================================== */

  function buildGlossaryEntry(entry) {
    const item = document.createElement("div");
    item.className = "glossary-entry";

    const header = document.createElement("div");
    header.className = "glossary-entry-header";
    const title = document.createElement("strong");
    title.textContent = entry.term;
    header.appendChild(title);
    const tag = entry.provider ? providerTag(entry.provider) : null;
    if (tag) header.appendChild(tag);

    const definition = document.createElement("p");
    definition.className = "glossary-entry-definition";
    definition.textContent = CQA.data.localizeTooltip(entry, CQA.i18n.getLang());

    item.append(header, definition);

    if (entry.relatedTerms && entry.relatedTerms.length > 0) {
      const related = document.createElement("p");
      related.className = "glossary-entry-related";
      related.textContent = CQA.i18n.t("glossary.related") + entry.relatedTerms.join(", ");
      item.appendChild(related);
    }
    if (entry.docsLabel) {
      const docs = document.createElement("p");
      docs.className = "glossary-entry-docs";
      docs.textContent = CQA.i18n.t("glossary.docs") + entry.docsLabel;
      item.appendChild(docs);
    }
    return item;
  }

  /** Terms (canonical, English) never change with language — only their content does. */
  function renderGlossaryList() {
    glossaryListEl.replaceChildren(
      ...CQA.data.getAllTooltips()
        .slice()
        .sort(function (a, b) { return a.term.localeCompare(b.term); })
        .map(buildGlossaryEntry)
    );
  }

  function buildGlossary() {
    glossaryOverlay = document.createElement("div");
    glossaryOverlay.className = "glossary-overlay is-hidden";

    const modal = document.createElement("div");
    modal.className = "glossary-modal panel";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    const header = document.createElement("div");
    header.className = "glossary-header";
    glossaryTitleEl = document.createElement("h2");
    glossaryTitleEl.className = "glossary-title";
    glossaryCloseEl = document.createElement("button");
    glossaryCloseEl.type = "button";
    glossaryCloseEl.className = "btn btn-icon glossary-close";
    glossaryCloseEl.textContent = "✕";
    glossaryCloseEl.addEventListener("click", closeGlossary);
    header.append(glossaryTitleEl, glossaryCloseEl);

    glossaryListEl = document.createElement("div");
    glossaryListEl.className = "glossary-list";
    renderGlossaryList();

    modal.append(header, glossaryListEl);
    glossaryOverlay.appendChild(modal);
    refreshGlossaryLabels(modal);

    // Clicking the backdrop (not the modal) closes.
    glossaryOverlay.addEventListener("click", function (event) {
      if (event.target === glossaryOverlay) closeGlossary();
    });

    document.body.appendChild(glossaryOverlay);
  }

  /** Re-localize the modal's own chrome (title, aria-label, close button). */
  function refreshGlossaryLabels(modal) {
    const title = CQA.i18n.t("glossary.title");
    (modal || glossaryOverlay.querySelector(".glossary-modal")).setAttribute("aria-label", title);
    glossaryTitleEl.textContent = title;
    glossaryCloseEl.setAttribute("aria-label", CQA.i18n.t("glossary.close"));
  }

  function openGlossary() {
    hide();
    lastGlossaryTrigger = document.activeElement;
    CQA.a11y.setAppInert(true);
    glossaryOverlay.classList.remove("is-hidden");
    const close = glossaryOverlay.querySelector(".glossary-close");
    if (close) close.focus();
  }

  function closeGlossary() {
    glossaryOverlay.classList.add("is-hidden");
    CQA.a11y.setAppInert(false);
    if (lastGlossaryTrigger && lastGlossaryTrigger.isConnected) {
      lastGlossaryTrigger.focus();
    }
    lastGlossaryTrigger = null;
  }

  function isGlossaryOpen() {
    return glossaryOverlay && !glossaryOverlay.classList.contains("is-hidden");
  }

  /**
   * Re-render everything this module owns in the newly-active language:
   * the glossary's own chrome and entries, and — if a tooltip happens to
   * be open — its content. Called by main.js whenever the language
   * changes, unconditionally; cheap enough to run even while hidden so
   * the glossary is ready the next time it's opened.
   */
  function refreshLocalization() {
    refreshGlossaryLabels();
    renderGlossaryList();
    if (isVisible() && currentTermEl) {
      const entry = CQA.data.getTooltip(currentTermEl.dataset.term);
      if (entry) {
        renderTooltipContent(entry);
        position(currentTermEl);
      }
    }
  }

  /* ======================================================================
     Init & global listeners
     ====================================================================== */

  function init() {
    buildTooltipEl();
    buildGlossary();

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (isVisible()) hide();
      else if (isGlossaryOpen()) closeGlossary();
    });

    // Outside click/tap closes a pinned tooltip.
    document.addEventListener("pointerdown", function (event) {
      if (!isVisible()) return;
      if (tooltipEl.contains(event.target)) return;
      if (currentTermEl && currentTermEl.contains(event.target)) return;
      hide();
    });

    // Keep an open tooltip anchored on scroll/resize.
    window.addEventListener("scroll", function () {
      if (isVisible()) position(currentTermEl);
    }, true);
    window.addEventListener("resize", function () {
      if (isVisible()) position(currentTermEl);
    });
  }

  return {
    init,
    annotate,
    openGlossary,
    hide,
    isOpen: function () { return isVisible(); },
    refreshLocalization,
  };
})();
