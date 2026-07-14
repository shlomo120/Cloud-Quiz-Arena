/**
 * certificate.js — Completion certificate.
 *
 * Self-contained UI module (like tooltip-manager.js) that renders a
 * printable completion certificate for the most recently finished quiz
 * session. Everything it shows comes from CQA.state.get().completion —
 * an immutable snapshot CQA.engine writes once, at the exact moment a
 * session finishes (see quiz-engine.js buildCompletionRecord). This
 * module never reads live settings/session state, so the certificate
 * can't drift if the user resets or reconfigures the quiz afterward.
 *
 * Exam-mode completion is required to show a "Generate Certificate"
 * action (render.js adds the button for every finished session); Study/
 * Practice sessions get the same button but a clearly different,
 * non-certifying wording ("Practice Completion" vs "Exam Completion").
 * Nothing here implies a vendor/official certification — see the
 * disclaimer footer on every certificate.
 *
 * Phase 15 — localization: every label goes through CQA.i18n.t()/
 * CQA.i18n.label(); the certificate (both the in-app view and the
 * downloaded standalone HTML) renders in whichever language is active
 * when it's generated. Official provider names in the scope line stay
 * in English via CQA.i18n.label("provider", …) — Azure/AWS/GCP are
 * never translated, only "Neutral" and domain names are.
 *
 * API: CQA.certificate.init() — build the modal once at bootstrap.
 *      CQA.certificate.open() — show the certificate for the last
 *        completed session (no-ops if none exists).
 *      CQA.certificate.refreshLocalization() — re-render in the new
 *        language if the modal happens to be open (called by main.js
 *        on every language change).
 */

window.CQA = window.CQA || {};

CQA.certificate = (function () {
  "use strict";

  const NAME_STORAGE_KEY = "cqa-certificate-name";
  const PASS_THRESHOLD = 70;
  const EXCELLENT_THRESHOLD = 90;

  const el = {};
  let returnFocus = null;

  function init() {
    buildOverlay();

    // Capture-phase Escape: close this modal unless a tooltip is open
    // above it (mirrors the pattern used by the review/glossary modals).
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !isOpen()) return;
      if (CQA.tooltipManager.isOpen()) return;
      event.stopPropagation();
      close();
    }, true);
  }

  /* ======================================================================
     Modal shell
     ====================================================================== */

  function buildOverlay() {
    el.overlay = document.createElement("div");
    el.overlay.className = "certificate-overlay is-hidden";
    el.overlay.id = "certificate-overlay";
    el.overlay.addEventListener("click", function (event) {
      if (event.target === el.overlay) close();
    });

    el.modal = document.createElement("div");
    el.modal.className = "certificate-modal panel";
    el.modal.setAttribute("role", "dialog");
    el.modal.setAttribute("aria-modal", "true");

    el.modal.appendChild(buildHeader());
    el.modal.appendChild(buildControls());

    el.view = document.createElement("div");
    el.view.className = "certificate-view";
    el.modal.appendChild(el.view);

    el.overlay.appendChild(el.modal);
    document.body.appendChild(el.overlay);
    refreshChromeLabels();
  }

  function buildHeader() {
    const header = document.createElement("div");
    header.className = "certificate-header no-print";

    el.title = document.createElement("h2");
    el.title.className = "certificate-modal-title";

    el.closeBtn = document.createElement("button");
    el.closeBtn.type = "button";
    el.closeBtn.className = "btn btn-icon";
    el.closeBtn.textContent = "✕";
    el.closeBtn.addEventListener("click", close);

    header.append(el.title, el.closeBtn);
    return header;
  }

  function buildControls() {
    const controls = document.createElement("div");
    controls.className = "certificate-controls no-print";

    const nameRow = document.createElement("label");
    nameRow.className = "certificate-name-field";
    el.nameLabel = document.createElement("span");
    el.nameLabel.className = "field-label";
    el.nameInput = document.createElement("input");
    el.nameInput.type = "text";
    el.nameInput.id = "certificate-name-input";
    el.nameInput.className = "select";
    el.nameInput.addEventListener("input", handleNameInput);
    nameRow.append(el.nameLabel, el.nameInput);

    el.nameHint = document.createElement("span");
    el.nameHint.className = "field-hint certificate-name-hint";

    const actionsRow = document.createElement("div");
    actionsRow.className = "certificate-actions-row";

    el.printBtn = document.createElement("button");
    el.printBtn.type = "button";
    el.printBtn.className = "btn btn-primary";
    el.printBtn.addEventListener("click", function () { window.print(); });

    el.downloadBtn = document.createElement("button");
    el.downloadBtn.type = "button";
    el.downloadBtn.className = "btn";
    el.downloadBtn.addEventListener("click", downloadHtml);

    el.shareBtn = document.createElement("button");
    el.shareBtn.type = "button";
    el.shareBtn.className = "btn";
    el.shareBtn.addEventListener("click", copyShareText);

    actionsRow.append(el.printBtn, el.downloadBtn, el.shareBtn);

    el.shareStatus = document.createElement("span");
    el.shareStatus.className = "certificate-share-status";
    el.shareStatus.setAttribute("aria-live", "polite");

    controls.append(nameRow, el.nameHint, actionsRow, el.shareStatus);
    return controls;
  }

  /** Re-localize the modal's own static chrome (title, labels, buttons). */
  function refreshChromeLabels() {
    const title = CQA.i18n.t("certificate.modalTitle");
    el.modal.setAttribute("aria-label", title);
    el.title.textContent = title;
    el.closeBtn.setAttribute("aria-label", CQA.i18n.t("certificate.close"));
    el.nameLabel.textContent = CQA.i18n.t("certificate.nameLabel");
    el.nameInput.placeholder = CQA.i18n.t("certificate.namePlaceholder");
    el.nameHint.textContent = CQA.i18n.t("certificate.nameHint");
    el.printBtn.textContent = CQA.i18n.t("certificate.print");
    el.downloadBtn.textContent = CQA.i18n.t("certificate.download");
    el.shareBtn.textContent = CQA.i18n.t("certificate.share");
  }

  /* ======================================================================
     Open / close
     ====================================================================== */

  function isOpen() {
    return el.overlay && !el.overlay.classList.contains("is-hidden");
  }

  /** Show the certificate for the last completed session. No-op if none. */
  function open() {
    const record = CQA.state.get().completion;
    if (!record) return; // never generate from an empty/abandoned session

    let savedName = "";
    try {
      savedName = localStorage.getItem(NAME_STORAGE_KEY) || "";
    } catch (e) { /* private mode / storage disabled */ }
    el.nameInput.value = savedName;

    renderView(record, savedName);
    syncControlsEnabled(savedName);

    returnFocus = document.activeElement;
    CQA.a11y.setAppInert(true);
    el.overlay.classList.remove("is-hidden");
    el.nameInput.value.trim() ? el.printBtn.focus() : el.nameInput.focus();
  }

  function close() {
    el.overlay.classList.add("is-hidden");
    el.shareStatus.textContent = "";
    CQA.a11y.setAppInert(false);
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    returnFocus = null;
  }

  function handleNameInput() {
    const name = el.nameInput.value;
    try {
      if (name.trim()) localStorage.setItem(NAME_STORAGE_KEY, name);
    } catch (e) { /* ignore */ }
    const record = CQA.state.get().completion;
    if (record) renderView(record, name);
    syncControlsEnabled(name);
  }

  function syncControlsEnabled(name) {
    const ready = name.trim().length > 0;
    el.printBtn.disabled = !ready;
    el.downloadBtn.disabled = !ready;
    el.shareBtn.disabled = !ready;
    el.nameHint.classList.toggle("is-hidden", ready);
  }

  /**
   * Re-render everything in the newly-active language: the modal's own
   * chrome always, and the certificate view (same record, same name) only
   * if the modal is currently open. Called by main.js on every language
   * change — cheap and safe to call unconditionally.
   */
  function refreshLocalization() {
    refreshChromeLabels();
    if (!isOpen()) return;
    const record = CQA.state.get().completion;
    if (record) renderView(record, el.nameInput.value);
  }

  /* ======================================================================
     Certificate content
     ====================================================================== */

  /** Badge shown on the certificate — wording differs by mode, never overstates. */
  function computeBadge(record) {
    const accuracy = record.summary.accuracy;
    if (record.mode === "exam") {
      if (accuracy >= EXCELLENT_THRESHOLD) return { labelKey: "certificate.badge.excellent", tone: "excellent" };
      if (accuracy >= PASS_THRESHOLD) return { labelKey: "certificate.badge.pass", tone: "pass" };
      return {
        labelKey: "certificate.badge.completed",
        tone: "neutral",
        note: CQA.i18n.t("certificate.badge.note.notPassed", { threshold: PASS_THRESHOLD }),
      };
    }
    if (accuracy >= EXCELLENT_THRESHOLD) return { labelKey: "certificate.badge.excellent", tone: "excellent" };
    return { labelKey: "certificate.badge.practiceCompleted", tone: "neutral" };
  }

  /** Human-readable scope line: providers/topics + focus domains, localized. */
  function describeScope(record) {
    const labelFor = function (kind, registry, ids) {
      return registry.filter(function (item) { return ids.includes(item.id); })
        .map(function (item) { return CQA.i18n.label(kind, item.id, item.label); });
    };
    const parts = [];
    const cloudLabels = labelFor("provider", CQA.data.getProviders(),
      record.providers.filter(function (p) { return p !== "neutral"; }));
    if (cloudLabels.length > 0) parts.push(cloudLabels.join(", "));
    const topicLabels = labelFor("domain", CQA.data.getDomains(), record.scopeTopics);
    if (topicLabels.length > 0) parts.push(topicLabels.join(", "));
    if (parts.length === 0) parts.push(CQA.i18n.t("certificate.body.fallbackScope"));

    const focusIds = record.domains.filter(function (d) {
      return !record.scopeTopics.includes(d);
    });
    if (focusIds.length > 0 && focusIds.length <= 3) {
      parts.push(labelFor("domain", CQA.data.getDomains(), focusIds).join(", "));
    }
    return parts.join(" · ");
  }

  /**
   * Formatted in the app's active language explicitly (never the visitor's
   * OS/browser locale, which could be anything) — "en-US" or "he-IL" to
   * match CQA.i18n.getLang(), so the date reads naturally in whichever
   * language the certificate itself is in.
   */
  function formatDate(iso) {
    const locale = CQA.i18n.getLang() === "he" ? "he-IL" : "en-US";
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric", month: "long", day: "numeric",
    });
  }

  function buildStat(label, value) {
    const stat = document.createElement("div");
    stat.className = "certificate-stat";
    const v = document.createElement("div");
    v.className = "certificate-stat-value";
    v.textContent = value;
    const l = document.createElement("div");
    l.className = "certificate-stat-label";
    l.textContent = label;
    stat.append(v, l);
    return stat;
  }

  /** Body sentence: "For (successfully) completing an Exam/Practice session on <scope>." */
  function bodyText(record, badge, scopeText) {
    const isExam = record.mode === "exam";
    const prefixKey = isExam
      ? (badge.tone === "neutral" ? "certificate.body.examPlain" : "certificate.body.examSuccess")
      : "certificate.body.practice";
    return CQA.i18n.t(prefixKey) + scopeText + ".";
  }

  /** Render the printable certificate content into el.view. */
  function renderView(record, name) {
    const isExam = record.mode === "exam";
    const badge = computeBadge(record);
    const scopeText = describeScope(record);
    const displayName = name.trim() || CQA.i18n.t("certificate.recipientPlaceholder");

    el.view.replaceChildren();

    const brand = document.createElement("div");
    brand.className = "certificate-brand";
    brand.textContent = CQA.i18n.t("certificate.brand");

    const title = document.createElement("h1");
    title.className = "certificate-title";
    title.textContent = CQA.i18n.t(isExam ? "certificate.title.exam" : "certificate.title.practice");

    const subtitle = document.createElement("p");
    subtitle.className = "certificate-subtitle";
    subtitle.textContent = CQA.i18n.t(isExam ? "certificate.subtitle.exam" : "certificate.subtitle.practice");

    const badgeEl = document.createElement("span");
    badgeEl.className = "certificate-badge certificate-badge-" + badge.tone;
    badgeEl.textContent = CQA.i18n.t(badge.labelKey);

    const recipientLabel = document.createElement("p");
    recipientLabel.className = "certificate-recipient-label";
    recipientLabel.textContent = CQA.i18n.t("certificate.recipientLabel");

    const recipient = document.createElement("p");
    recipient.className = "certificate-recipient";
    recipient.textContent = displayName;

    const body = document.createElement("p");
    body.className = "certificate-body-text";
    body.textContent = bodyText(record, badge, scopeText);

    const difficultyLabel = CQA.i18n.label("difficulty", record.difficulty, record.difficulty);
    const stats = document.createElement("div");
    stats.className = "certificate-stats";
    stats.append(
      buildStat(CQA.i18n.t("certificate.stat.score"), String(record.summary.accuracy) + "%"),
      buildStat(CQA.i18n.t("certificate.stat.correct"), record.summary.correct + " / " + record.summary.answered),
      buildStat(CQA.i18n.t("certificate.stat.difficulty"), difficultyLabel),
      buildStat(CQA.i18n.t("certificate.stat.questions"), String(record.questionCount))
    );

    const dateLine = document.createElement("p");
    dateLine.className = "certificate-date";
    dateLine.textContent = CQA.i18n.t("certificate.dateLine", { date: formatDate(record.completedAt) });

    const footer = document.createElement("p");
    footer.className = "certificate-footer";
    footer.textContent = CQA.i18n.t("certificate.footer");

    el.view.append(brand, title, subtitle, badgeEl, recipientLabel, recipient, body, stats, dateLine);
    if (badge.note) {
      const note = document.createElement("p");
      note.className = "certificate-badge-note";
      note.textContent = badge.note;
      el.view.appendChild(note);
    }
    el.view.appendChild(footer);
  }

  /* ======================================================================
     Export / share
     ====================================================================== */

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /** Build a standalone, self-styled HTML document from the current certificate. */
  function buildStandaloneHtml(record, name) {
    const badge = computeBadge(record);
    const isExam = record.mode === "exam";
    const displayName = name.trim() || CQA.i18n.t("certificate.recipientPlaceholder");
    const title = CQA.i18n.t(isExam ? "certificate.title.exam" : "certificate.title.practice");
    const lang = CQA.i18n.getLang();
    const dir = CQA.i18n.isRtl() ? "rtl" : "ltr";

    return "<!DOCTYPE html>\n<html lang=\"" + lang + "\" dir=\"" + dir + "\"><head><meta charset=\"UTF-8\">" +
      "<title>" + escapeHtml(title) + " — " + escapeHtml(CQA.i18n.t("certificate.brand")) + "</title>" +
      "<style>" +
      "body{font-family:Georgia,serif;background:#eceae4;margin:0;padding:2.5rem;color:#2b2822;}" +
      ".cert{max-width:640px;margin:0 auto;background:#f6f4ee;border:2px solid #d8d3c6;border-radius:12px;" +
      "padding:3rem 2.5rem;text-align:center;}" +
      ".brand{font-size:1rem;color:#5f594c;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1.5rem;}" +
      "h1{font-size:1.8rem;margin:0 0 0.25rem;}" +
      ".subtitle{color:#5f594c;margin:0 0 1rem;}" +
      ".badge{display:inline-block;padding:0.3rem 1rem;border-radius:999px;font-weight:700;margin-bottom:1.5rem;" +
      "background:#e6f4ec;color:#1e7d55;border:1px solid #1e7d55;}" +
      ".recipient-label{color:#8d8778;margin:0;font-size:0.9rem;}" +
      ".recipient{font-size:1.6rem;font-weight:700;margin:0.25rem 0 1rem;}" +
      ".body{margin:0 0 1.5rem;}" +
      ".stats{display:flex;justify-content:center;gap:2rem;margin-bottom:1.5rem;flex-wrap:wrap;}" +
      ".stat-value{font-size:1.3rem;font-weight:700;}" +
      ".stat-label{font-size:0.8rem;color:#8d8778;text-transform:uppercase;}" +
      ".date{color:#5f594c;}" +
      ".footer{margin-top:2rem;font-size:0.8rem;color:#8d8778;border-top:1px solid #d8d3c6;padding-top:1rem;}" +
      "</style></head><body>" +
      "<div class=\"cert\">" +
      "<div class=\"brand\">" + escapeHtml(CQA.i18n.t("certificate.brand")) + "</div>" +
      "<h1>" + escapeHtml(title) + "</h1>" +
      "<p class=\"subtitle\">" + escapeHtml(CQA.i18n.t(isExam ? "certificate.subtitle.exam" : "certificate.subtitle.practice")) + "</p>" +
      "<div class=\"badge\">" + escapeHtml(CQA.i18n.t(badge.labelKey)) + "</div>" +
      "<p class=\"recipient-label\">" + escapeHtml(CQA.i18n.t("certificate.recipientLabel")) + "</p>" +
      "<p class=\"recipient\">" + escapeHtml(displayName) + "</p>" +
      "<p class=\"body\">" + escapeHtml(bodyText(record, badge, describeScope(record))) + "</p>" +
      "<div class=\"stats\">" +
      "<div><div class=\"stat-value\">" + record.summary.accuracy + "%</div><div class=\"stat-label\">" + escapeHtml(CQA.i18n.t("certificate.stat.score")) + "</div></div>" +
      "<div><div class=\"stat-value\">" + record.summary.correct + " / " + record.summary.answered + "</div><div class=\"stat-label\">" + escapeHtml(CQA.i18n.t("certificate.stat.correct")) + "</div></div>" +
      "<div><div class=\"stat-value\">" + escapeHtml(CQA.i18n.label("difficulty", record.difficulty, record.difficulty)) + "</div><div class=\"stat-label\">" + escapeHtml(CQA.i18n.t("certificate.stat.difficulty")) + "</div></div>" +
      "<div><div class=\"stat-value\">" + record.questionCount + "</div><div class=\"stat-label\">" + escapeHtml(CQA.i18n.t("certificate.stat.questions")) + "</div></div>" +
      "</div>" +
      "<p class=\"date\">" + escapeHtml(CQA.i18n.t("certificate.dateLine", { date: formatDate(record.completedAt) })) + "</p>" +
      (badge.note ? "<p style=\"color:#9a6b0a;\">" + escapeHtml(badge.note) + "</p>" : "") +
      "<p class=\"footer\">" + escapeHtml(CQA.i18n.t("certificate.footer")) + "</p>" +
      "</div></body></html>";
  }

  function downloadHtml() {
    const record = CQA.state.get().completion;
    if (!record || !el.nameInput.value.trim()) return;
    const html = buildStandaloneHtml(record, el.nameInput.value);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cloud-quiz-arena-certificate.html";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function buildShareText(record, name) {
    const modeLabel = CQA.i18n.t(record.mode === "exam" ? "certificate.modeLabel.exam" : "certificate.modeLabel.practice");
    return CQA.i18n.t("certificate.share.text", {
      modeLabel: modeLabel,
      scope: describeScope(record),
      accuracy: record.summary.accuracy,
      correct: record.summary.correct,
      answered: record.summary.answered,
      date: formatDate(record.completedAt),
    });
  }

  function copyShareText() {
    const record = CQA.state.get().completion;
    if (!record || !el.nameInput.value.trim()) return;
    const text = buildShareText(record, el.nameInput.value);

    const showCopied = function () {
      el.shareStatus.textContent = CQA.i18n.t("certificate.share.copied");
    };
    const showFailed = function () {
      el.shareStatus.textContent = CQA.i18n.t("certificate.share.failed");
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied, showFailed);
      return;
    }
    // Fallback for older/insecure contexts: select a hidden textarea and execCommand.
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.focus();
    helper.select();
    try {
      document.execCommand("copy") ? showCopied() : showFailed();
    } catch (e) {
      showFailed();
    }
    helper.remove();
  }

  return {
    init,
    open,
    close,
    refreshLocalization,
  };
})();
