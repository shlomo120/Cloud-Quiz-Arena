/**
 * render.js — DOM rendering.
 *
 * The only module that touches the DOM. Renders the setup controls,
 * the scoreboard, the theme, the active question with its answer
 * controls, post-answer feedback (verdict, explanation, resource
 * reference) and the end-of-session summary.
 *
 * Reads from CQA.state and CQA.data; delegates all decisions to
 * CQA.engine. No quiz rules live here.
 *
 * Phase 15 — localization: every string this module writes goes through
 * CQA.i18n.t() (free-form UI text) or CQA.i18n.label(kind, id, fallback)
 * (registry labels — providers/domains/difficulties/question types).
 * Question content itself is read through CQA.data.localizeQuestion(),
 * the single language-aware read-path — there is exactly one rendering
 * function per view, not a parallel one per language. Because most of
 * this module's functions already re-run whenever state changes, main.js
 * simply re-invokes whichever ones are currently visible when the
 * language changes (see CQA.i18n.onChange in main.js) — no separate
 * "translate the DOM in place" logic needed here.
 */

window.CQA = window.CQA || {};

CQA.render = (function () {
  "use strict";

  const THEME_STORAGE_KEY = "cqa-theme";
  const MODE_STORAGE_KEY = "cqa-mode";

  /** Cached references to the mount points defined in index.html. */
  const el = {};

  /** Cache DOM mount points once at startup. */
  function init() {
    [
      "setup-panel", "setup-toggle", "setup-summary",
      "track-group", "track-hint", "step-scope", "scope-cloud", "scope-topics",
      "topic-list", "topics-hint", "step-domains", "domains-hint",
      "step-options", "mixed-row", "setup-warning",
      "provider-list", "domain-list", "question-type-list", "difficulty-group",
      "question-count", "mixed-toggle", "mode-group", "adaptive-toggle",
      "btn-start", "btn-daily", "btn-reset", "btn-review",
      "theme-picker", "theme-picker-toggle", "theme-picker-menu",
      "theme-picker-swatch", "theme-picker-label",
      "theme-mode-dark", "theme-mode-light", "phase-pill",
      "not-sure-toggle", "question-progress-fill",
      "scoreboard-container", "active-providers", "progress-container",
      "quiz-placeholder", "quiz-placeholder-note", "quiz-placeholder-summary", "btn-start-panel",
      "question-container", "question-provider-badge", "question-progress",
      "question-id-badge", "question-id-value",
      "question-timers", "session-timer", "session-timer-value",
      "question-timer", "question-timer-value", "question-timeout-note",
      "question-prompt", "question-instruction", "answer-options",
      "feedback-area", "feedback-verdict", "feedback-late-note", "feedback-explanation", "feedback-reference",
      "btn-submit", "btn-next", "summary-container",
      "review-overlay", "review-title", "review-close",
      "review-filter-provider", "review-filter-domain", "review-list", "btn-retry",
    ].forEach(function (id) {
      el[id] = document.getElementById(id);
    });
  }

  /* ======================================================================
     Theme
     ====================================================================== */

  /**
   * Available palette presets — must match [data-theme] blocks in tokens.css.
   * The first four are the ecosystem-inspired presets (Phase 16); "dark" is
   * the Default palette; slate/amber are the original neutral/graphite ones.
   * Phase 22: palette and light/dark MODE are separate state values —
   * every palette has a light variant, applied via [data-mode] on <html>.
   * (The old standalone "light" theme is migrated in loadSavedTheme.)
   */
  const THEMES = ["azure", "aws", "gcp", "k8s", "dark", "slate", "amber"];
  const MODES = ["dark", "light"];

  let activeTheme = "dark";
  let activeMode = "dark";

  /** Set the picker toggle's own mini swatch + label to reflect `theme`. */
  function syncThemePickerToggle(theme) {
    el["theme-picker-swatch"].setAttribute("data-swatch-theme", theme);
    el["theme-picker-label"].textContent = CQA.i18n.t("theme." + theme);
  }

  /** Mark the matching option as selected; clear the others. */
  function syncThemeOptionsSelected(theme) {
    el["theme-picker-menu"].querySelectorAll(".theme-option").forEach(function (opt) {
      opt.setAttribute("aria-selected", String(opt.dataset.theme === theme));
    });
  }

  /**
   * Apply a PALETTE. Deliberately never touches the light/dark mode —
   * palette and mode are independent so switching palettes (or any other
   * control) can't reset the user's chosen mode.
   */
  function applyTheme(theme) {
    if (!THEMES.includes(theme)) theme = "dark";
    activeTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    syncThemePickerToggle(theme);
    syncThemeOptionsSelected(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      /* private mode / storage disabled — theme just won't persist */
    }
  }

  /** Mark the active mode button in the theme picker's Light/Dark row. */
  function syncModeButtons() {
    MODES.forEach(function (mode) {
      const btn = el["theme-mode-" + mode];
      if (!btn) return;
      btn.classList.toggle("is-active", activeMode === mode);
      btn.setAttribute("aria-pressed", String(activeMode === mode));
    });
  }

  /** Apply the light/dark MODE for the current palette. Never touches the palette. */
  function applyMode(mode) {
    if (!MODES.includes(mode)) mode = "dark";
    activeMode = mode;
    document.documentElement.setAttribute("data-mode", mode);
    syncModeButtons();
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch (e) { /* ignore */ }
  }

  /** Re-apply the active theme's translated label after a language switch. */
  function refreshThemeLabel() {
    syncThemePickerToggle(activeTheme);
  }

  function loadSavedTheme() {
    let savedTheme = null;
    let savedMode = null;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      savedMode = localStorage.getItem(MODE_STORAGE_KEY);
    } catch (e) { /* ignore */ }
    // Migration: "light" was a standalone theme before the palette/mode
    // split — it maps to the Default palette in light mode.
    if (savedTheme === "light") {
      savedTheme = "dark";
      if (!MODES.includes(savedMode)) savedMode = "light";
    }
    applyTheme(THEMES.includes(savedTheme) ? savedTheme : "dark");
    applyMode(MODES.includes(savedMode) ? savedMode : "dark");
  }

  /* ----- Theme picker popover open/close ----- */

  function isThemeMenuOpen() {
    return !el["theme-picker-menu"].classList.contains("is-hidden");
  }

  function openThemeMenu() {
    el["theme-picker-menu"].classList.remove("is-hidden");
    el["theme-picker-toggle"].setAttribute("aria-expanded", "true");
  }

  function closeThemeMenu() {
    el["theme-picker-menu"].classList.add("is-hidden");
    el["theme-picker-toggle"].setAttribute("aria-expanded", "false");
  }

  function toggleThemeMenu() {
    if (isThemeMenuOpen()) closeThemeMenu();
    else openThemeMenu();
  }

  /* ======================================================================
     Setup controls
     ====================================================================== */

  /**
   * Build a chip-style checkbox (used for providers, domains, topics,
   * question types). `kind` selects the i18n registry lookup
   * ("provider" | "domain" | "qtype"); pass null for items with no
   * translated label (none currently).
   */
  function buildChip(groupName, item, checked, kind, colorVar) {
    const label = document.createElement("label");
    label.className = "chip";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = groupName;
    input.value = item.id;
    input.checked = checked;
    label.appendChild(input);

    if (colorVar) {
      const dot = document.createElement("span");
      dot.className = "chip-dot";
      dot.style.background = "var(" + colorVar + ")";
      dot.setAttribute("aria-hidden", "true");
      label.appendChild(dot);
    }

    const text = kind ? CQA.i18n.label(kind, item.id, item.label) : item.label;
    label.appendChild(document.createTextNode(text));
    if (item.fullName) {
      label.title = item.fullName;
    }
    return label;
  }

  /** Render the whole setup panel: track, scope, focus areas and options. */
  function renderSetup() {
    const settings = CQA.state.get().settings;

    // Step 1 — track radios
    el["track-group"].querySelectorAll("input").forEach(function (input) {
      input.checked = input.value === settings.track;
    });

    renderScope();
    renderFocusDomains();

    el["question-type-list"].replaceChildren(
      ...CQA.data.getQuestionModeLabels().map(function (m) {
        return buildChip("questionTypes", m, settings.questionTypes.includes(m.id), "qtype");
      })
    );

    el["difficulty-group"].replaceChildren(
      ...CQA.data.getDifficulties().map(function (d) {
        const label = document.createElement("label");
        label.className = "segment";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "difficulty";
        input.value = d.id;
        input.checked = settings.difficulty === d.id;
        label.appendChild(input);
        label.appendChild(document.createTextNode(CQA.i18n.label("difficulty", d.id, d.label)));
        return label;
      })
    );

    el["question-count"].value = String(settings.questionCount);
    el["mixed-toggle"].checked = settings.mixed;
    el["adaptive-toggle"].checked = settings.adaptive;

    const modeInput = el["mode-group"]
      .querySelector('input[value="' + settings.mode + '"]');
    if (modeInput) modeInput.checked = true;

    updateSetupFlow();
  }

  /** Step 2 — scope chips: cloud providers and/or non-cloud topics. */
  function renderScope() {
    const settings = CQA.state.get().settings;

    // Cloud provider chips (Neutral is implied by the track, never a chip).
    el["provider-list"].replaceChildren(
      ...CQA.data.getProviders()
        .filter(function (p) { return p.id !== "neutral"; })
        .map(function (p) {
          return buildChip("providers", p, settings.providers.includes(p.id), "provider", p.colorToken);
        })
    );

    // Non-cloud topic chips — only families that actually have neutral content.
    const neutralDomains = CQA.engine.getAvailableDomains(["neutral"], false);
    el["topic-list"].replaceChildren(
      ...CQA.data.getNonCloudTopics()
        .filter(function (t) { return neutralDomains.has(t.id); })
        .map(function (t) {
          return buildChip("topics", t, settings.scopeTopics.includes(t.id), "domain");
        })
    );
  }

  /**
   * Step 3 — focus-area chips, data-aware: only domains that have at least
   * one question for the current provider selection are shown, and topics
   * already chosen as scope are not repeated.
   */
  function renderFocusDomains() {
    const settings = CQA.state.get().settings;
    if (!settings.track) {
      el["domain-list"].replaceChildren();
      return;
    }

    const available = CQA.engine.getAvailableDomains(settings.providers, settings.mixed);
    const scoped = new Set(settings.scopeTopics);

    el["domain-list"].replaceChildren(
      ...CQA.data.getDomainGroups().map(function (group) {
        const items = CQA.data.getDomains().filter(function (d) {
          return d.group === group.id && available.has(d.id) && !scoped.has(d.id);
        });
        if (items.length === 0) return null;

        const wrap = document.createElement("div");
        wrap.className = "domain-group";
        const label = document.createElement("span");
        label.className = "domain-group-label";
        label.textContent = CQA.i18n.label("domainGroup", group.id, group.label);
        const chips = document.createElement("div");
        chips.className = "chip-group";
        items.forEach(function (d) {
          chips.appendChild(buildChip("domains", d, settings.domains.includes(d.id), "domain"));
        });
        wrap.append(label, chips);
        return wrap;
      }).filter(Boolean)
    );

    el["domains-hint"].textContent = settings.track === "cloud"
      ? CQA.i18n.t("domains.hintCloud")
      : CQA.i18n.t("domains.hintNonCloud");
  }

  /**
   * Progressive disclosure: reveal each step only once the previous one
   * has a valid selection, keep contextual controls relevant, and refresh
   * the live summary and zero-match warning.
   */
  function updateSetupFlow() {
    const settings = CQA.state.get().settings;
    const hasTrack = !!settings.track;
    const cloudCount = settings.providers
      .filter(function (p) { return p !== "neutral"; }).length;
    const scopeValid = settings.track === "noncloud"
      ? settings.scopeTopics.length > 0
      : cloudCount > 0;

    el["track-hint"].classList.toggle("is-hidden", hasTrack);
    el["step-scope"].classList.toggle("is-hidden", !hasTrack);
    el["scope-cloud"].classList.toggle("is-hidden",
      !(settings.track === "cloud" || settings.track === "mixed"));
    el["scope-topics"].classList.toggle("is-hidden",
      !(settings.track === "noncloud" || settings.track === "mixed"));
    el["topics-hint"].classList.toggle("is-hidden",
      settings.track !== "noncloud" || settings.scopeTopics.length > 0);

    const showRest = hasTrack && scopeValid;
    el["step-domains"].classList.toggle("is-hidden", !showRest);
    el["step-options"].classList.toggle("is-hidden", !showRest);

    // Cross-provider questions only make sense with 2+ cloud providers.
    el["mixed-row"].classList.toggle("is-hidden", cloudCount < 2);

    renderSetupSummary();
    renderSetupWarning(showRest);
    syncStartButtons();
    renderPlaceholderSummary();
    syncPhasePill(); // keeps the header pill localized after language switches
  }

  /**
   * Enable/disable both Start Quiz buttons (left setup panel + right quiz
   * panel) together from one readiness check — there is exactly one rule
   * for "can a session start right now" (CQA.engine.isReadyToStart), never
   * a per-button copy of it.
   */
  function syncStartButtons() {
    const ready = CQA.engine.isReadyToStart(CQA.state.get().settings);
    el["btn-start"].disabled = !ready;
    el["btn-start-panel"].disabled = !ready;
  }

  /** Compact one-line recap of the current setup, shown above the panel's
   * own Start Quiz button so the choice made on the left stays visible
   * without duplicating the full setup summary. */
  function renderPlaceholderSummary() {
    const settings = CQA.state.get().settings;
    const summary = el["quiz-placeholder-summary"];
    if (!settings.track) {
      summary.textContent = "";
      summary.classList.add("is-hidden");
      return;
    }

    const labelFor = function (kind, registry, ids) {
      return registry.filter(function (item) { return ids.includes(item.id); })
        .map(function (item) { return CQA.i18n.label(kind, item.id, item.label); });
    };
    const scopeParts = labelFor("provider", CQA.data.getProviders(),
      settings.providers.filter(function (p) { return p !== "neutral"; }))
      .concat(labelFor("domain", CQA.data.getDomains(), settings.scopeTopics));

    const countKey = settings.questionCount === 1 ? "summary.questionCount" : "summary.questionCount.plural";
    const parts = [
      CQA.i18n.t("track." + settings.track),
      scopeParts.join(", ") || CQA.i18n.t("summary.dash"),
      CQA.i18n.t(countKey, { count: settings.questionCount }),
      CQA.i18n.t(settings.mode === "exam" ? "mode.exam" : "mode.study"),
    ];
    summary.textContent = parts.join(" · ");
    summary.classList.remove("is-hidden");
  }

  /** Inline warning when the current combination matches zero questions. */
  function renderSetupWarning(flowReady) {
    const warning = el["setup-warning"];
    if (!flowReady) {
      warning.classList.add("is-hidden");
      return;
    }
    const count = CQA.engine.filterQuestions(CQA.state.get().settings).length;
    warning.classList.toggle("is-hidden", count > 0);
    if (count === 0) {
      warning.textContent = CQA.i18n.t("setup.warning.zeroMatch");
    }
  }

  /** Compact live summary of the current setup (also shown when collapsed). */
  function renderSetupSummary() {
    const settings = CQA.state.get().settings;
    const box = el["setup-summary"];
    if (!settings.track) {
      box.replaceChildren();
      box.classList.add("is-hidden");
      return;
    }
    box.classList.remove("is-hidden");

    const labelFor = function (kind, registry, ids) {
      return registry.filter(function (item) { return ids.includes(item.id); })
        .map(function (item) { return CQA.i18n.label(kind, item.id, item.label); });
    };
    const row = function (name, value) {
      const span = document.createElement("span");
      span.className = "setup-summary-row";
      const strong = document.createElement("strong");
      strong.textContent = name + ": ";
      span.append(strong, document.createTextNode(value));
      return span;
    };

    const scopeParts = [];
    const cloudLabels = labelFor("provider", CQA.data.getProviders(),
      settings.providers.filter(function (p) { return p !== "neutral"; }));
    if (cloudLabels.length > 0) scopeParts.push(cloudLabels.join(", "));
    const topicLabels = labelFor("domain", CQA.data.getDomains(), settings.scopeTopics);
    if (topicLabels.length > 0) scopeParts.push(topicLabels.join(", "));

    const focusIds = settings.domains.filter(function (d) {
      return !settings.scopeTopics.includes(d);
    });
    const focusText = focusIds.length === 0 ? CQA.i18n.t("summary.allAvailable")
      : focusIds.length > 3 ? CQA.i18n.t("summary.selectedCount", { count: focusIds.length })
      : labelFor("domain", CQA.data.getDomains(), focusIds).join(", ");

    const typeText = settings.questionTypes.length === 3 ? CQA.i18n.t("summary.allTypes")
      : labelFor("qtype", CQA.data.getQuestionModeLabels(), settings.questionTypes).join(", ") ||
        CQA.i18n.t("summary.none");
    const difficultyLabel = CQA.i18n.label("difficulty", settings.difficulty, settings.difficulty);

    const matches = CQA.engine.filterQuestions(settings).length;
    const matchesKey = matches === 1 ? "summary.matchingQuestions" : "summary.matchingQuestions.plural";

    box.replaceChildren(
      row(CQA.i18n.t("summaryRow.track"), CQA.i18n.t("track." + settings.track)),
      row(CQA.i18n.t("summaryRow.scope"), scopeParts.join(" + ") || CQA.i18n.t("summary.dash")),
      row(CQA.i18n.t("summaryRow.focus"), focusText),
      row(CQA.i18n.t("summaryRow.type"), typeText),
      row(CQA.i18n.t("summaryRow.difficulty"), difficultyLabel +
        " · " + CQA.i18n.t(settings.mode === "exam" ? "mode.exam" : "mode.study") +
        " · " + settings.questionCount + " Qs"),
      row(CQA.i18n.t("summaryRow.pool"), CQA.i18n.t(matchesKey, { count: matches }))
    );
  }

  /** Collapse/expand the setup panel (the toggle is only visible on mobile). */
  function setSetupCollapsed(collapsed) {
    el["setup-panel"].classList.toggle("is-collapsed", collapsed);
    el["setup-toggle"].setAttribute("aria-expanded", String(!collapsed));
    el["setup-toggle"].textContent = CQA.i18n.t(collapsed ? "setup.show" : "setup.hide");
  }

  function toggleSetupCollapsed() {
    setSetupCollapsed(!el["setup-panel"].classList.contains("is-collapsed"));
  }

  /** After a quiz starts on a small screen, collapse setup so the question is in reach. */
  function collapseSetupOnMobile() {
    if (window.matchMedia("(max-width: 860px)").matches) {
      setSetupCollapsed(true);
    }
  }

  /* ======================================================================
     Scoreboard
     ====================================================================== */

  function buildStatTile(label, value) {
    const tile = document.createElement("div");
    tile.className = "stat-tile";

    const valueEl = document.createElement("div");
    valueEl.className = "stat-value";
    valueEl.textContent = value;

    const labelEl = document.createElement("div");
    labelEl.className = "stat-label";
    labelEl.textContent = label;

    tile.append(valueEl, labelEl);
    return tile;
  }

  /** Is an exam session running (results must stay hidden)? */
  function isExamInProgress() {
    const state = CQA.state.get();
    return state.settings.mode === "exam" &&
      state.session.active && !state.session.finished;
  }

  /** Render score, answered, correct, accuracy, streak + active providers. */
  function renderScoreboard() {
    const state = CQA.state.get();
    const score = state.score;
    const accuracy = score.answered > 0
      ? Math.round((score.correct / score.answered) * 100) + "%"
      : CQA.i18n.t("summary.dash");

    // In exam mode, correctness stats stay hidden until the end.
    const masked = isExamInProgress();
    const maskedValue = CQA.i18n.t("board.masked");
    const mask = function (value) { return masked ? maskedValue : value; };

    // Priority order: the four key metrics land in the first two rows
    // of the 2-column mobile grid.
    el["scoreboard-container"].replaceChildren(
      buildStatTile(CQA.i18n.t("board.score"), mask(String(score.points))),
      buildStatTile(CQA.i18n.t("board.answered"), String(score.answered)),
      buildStatTile(CQA.i18n.t("board.accuracy"), mask(accuracy)),
      buildStatTile(CQA.i18n.t("board.streak"), mask(String(score.streak))),
      buildStatTile(CQA.i18n.t("board.correct"), mask(String(score.correct))),
      buildStatTile(CQA.i18n.t("board.bestStreak"), mask(String(score.bestStreak)))
    );

    renderProgress();

    const providers = CQA.data.getProviders()
      .filter(function (p) { return state.settings.providers.includes(p.id); });

    if (providers.length === 0) {
      const note = document.createElement("span");
      note.className = "empty-note";
      note.textContent = CQA.i18n.t("summary.noneSelected");
      el["active-providers"].replaceChildren(note);
      return;
    }

    el["active-providers"].replaceChildren(
      ...providers.map(function (p) {
        const tag = document.createElement("span");
        tag.className = "provider-tag";
        const dot = document.createElement("span");
        dot.className = "chip-dot";
        dot.style.background = "var(" + p.colorToken + ")";
        dot.setAttribute("aria-hidden", "true");
        tag.append(dot, document.createTextNode(CQA.i18n.label("provider", p.id, p.label)));
        return tag;
      })
    );
  }

  /* ======================================================================
     Progress bars (lifetime accuracy, this page visit)
     ====================================================================== */

  /** Turn lifetime counters into breakdown rows for known registry items. */
  function performanceRows(kind, counters, registry) {
    return registry
      .filter(function (item) { return counters[item.id] && counters[item.id].answered > 0; })
      .map(function (item) {
        const c = counters[item.id];
        return {
          label: CQA.i18n.label(kind, item.id, item.label),
          answered: c.answered,
          correct: c.correct,
          accuracy: Math.round((c.correct / c.answered) * 100),
        };
      });
  }

  /** Compact provider/domain accuracy bars in the sidebar. */
  function renderProgress() {
    const container = el["progress-container"];

    // While an exam runs, freeze the bars — live updates would leak results.
    if (isExamInProgress()) return;

    const performance = CQA.state.get().performance;
    const providerRows = performanceRows("provider", performance.providers, CQA.data.getProviders());
    const domainRows = performanceRows("domain", performance.domains, CQA.data.getDomains());

    if (providerRows.length === 0 && domainRows.length === 0) {
      container.replaceChildren();
      container.classList.add("is-hidden");
      return;
    }

    container.classList.remove("is-hidden");
    container.replaceChildren();
    if (providerRows.length > 0) {
      container.appendChild(buildBreakdownSection(CQA.i18n.t("board.providerAccuracy"), providerRows, true));
    }
    if (domainRows.length > 0) {
      container.appendChild(buildBreakdownSection(CQA.i18n.t("board.domainAccuracy"), domainRows, true));
    }
  }

  /* ======================================================================
     Quiz area views
     ====================================================================== */

  /**
   * Header phase pill: mirrors whichever quiz-area view is visible —
   * setup label, in-quiz progress counter, or completion. Re-run on view
   * switches and language changes (via updateSetupFlow / renderQuestion).
   */
  function syncPhasePill() {
    const pill = el["phase-pill"];
    if (!pill) return;
    const session = CQA.state.get().session;
    if (!el["question-container"].classList.contains("is-hidden") && session.active) {
      pill.dataset.phase = "quiz";
      pill.textContent = CQA.i18n.t("phase.progress", {
        index: session.currentIndex + 1, total: session.questions.length,
      });
    } else if (!el["summary-container"].classList.contains("is-hidden")) {
      pill.dataset.phase = "summary";
      pill.textContent = CQA.i18n.t("phase.complete");
    } else {
      pill.dataset.phase = "setup";
      pill.textContent = CQA.i18n.t("phase.setup");
    }
  }

  /** Show exactly one of the quiz area views: placeholder | question | summary. */
  function showView(view) {
    el["quiz-placeholder"].classList.toggle("is-hidden", view !== "placeholder");
    el["question-container"].classList.toggle("is-hidden", view !== "question");
    el["summary-container"].classList.toggle("is-hidden", view !== "summary");
    syncPhasePill();
  }

  /** Show the pre-quiz placeholder, optionally with a status message. */
  function showPlaceholder(message) {
    showView("placeholder");
    const note = el["quiz-placeholder-note"];
    note.textContent = message || "";
    note.classList.toggle("is-hidden", !message);
  }

  /* ======================================================================
     Question rendering
     ====================================================================== */

  /** Localized per-type instruction line, resolved at render time. */
  function typeInstruction(type) {
    switch (type) {
      case CQA.data.questionModes.MULTIPLE_CHOICE: return CQA.i18n.t("question.type.multipleChoice");
      case CQA.data.questionModes.TRUE_FALSE: return CQA.i18n.t("question.type.trueFalse");
      case CQA.data.questionModes.MULTI_SELECT: return CQA.i18n.t("question.type.multiSelect");
      default: return "";
    }
  }

  /** Provider badge content: color dots + label(s). */
  function renderProviderBadge(question) {
    const badge = el["question-provider-badge"];
    const providers = CQA.data.getProviders()
      .filter(function (p) { return question.providers.includes(p.id); });

    const parts = [];
    providers.forEach(function (p) {
      const dot = document.createElement("span");
      dot.className = "chip-dot";
      dot.style.background = "var(" + p.colorToken + ")";
      dot.setAttribute("aria-hidden", "true");
      parts.push(dot);
    });
    const label = providers.map(function (p) { return CQA.i18n.label("provider", p.id, p.label); }).join(" + ");
    parts.push(document.createTextNode(
      providers.length > 1 ? CQA.i18n.t("question.crossProviderPrefix") + label : label
    ));
    badge.replaceChildren(...parts);
  }

  /** Question-ID badge: the raw id is never translated, only its label/title. */
  function renderQuestionId(question) {
    const badge = el["question-id-badge"];
    badge.classList.remove("is-copied");
    badge.dataset.qid = question.id;
    el["question-id-value"].textContent = question.id;
  }

  let copiedResetTimer = null;

  /** Copy the active question's ID to the clipboard with brief "Copied!" feedback. */
  function copyQuestionId() {
    const badge = el["question-id-badge"];
    const qid = badge.dataset.qid;
    if (!qid || !navigator.clipboard) return;
    navigator.clipboard.writeText(qid).then(function () {
      badge.classList.add("is-copied");
      el["question-id-value"].textContent = CQA.i18n.t("question.id.copied");
      clearTimeout(copiedResetTimer);
      copiedResetTimer = setTimeout(function () {
        badge.classList.remove("is-copied");
        el["question-id-value"].textContent = qid;
      }, 1500);
    }).catch(function () { /* clipboard unavailable — silently ignore */ });
  }

  /* ======================================================================
     Timers (Phase 19B)
     ====================================================================== */

  const TIMER_CRITICAL_THRESHOLD = 10; // seconds

  /** MM:SS, e.g. 59 → "00:59", 754 → "12:34". */
  function formatClock(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  /** Count-up full-session timer — plain elapsed time, no critical state. */
  function renderSessionTimer(elapsedSeconds) {
    el["session-timer-value"].textContent = formatClock(elapsedSeconds);
  }

  /**
   * Count-down per-question timer. In its last 10 seconds it changes both
   * color (via .is-critical) AND the text itself (a prefixed ⚠), so the
   * warning never relies on color alone.
   */
  function renderQuestionTimer(remainingSeconds) {
    const chip = el["question-timer"];
    const critical = remainingSeconds > 0 && remainingSeconds <= TIMER_CRITICAL_THRESHOLD;
    chip.classList.toggle("is-critical", critical);
    el["question-timer-value"].textContent = (critical ? "⚠ " : "") + formatClock(remainingSeconds);
  }

  /** Disable every answer input + Submit — used when Exam mode times out. */
  function lockAnswerControlsForTimeout() {
    el["answer-options"].querySelectorAll(".answer-option").forEach(function (option) {
      option.classList.add("is-locked");
      const input = option.querySelector("input");
      if (input) input.disabled = true;
    });
    el["btn-submit"].disabled = true;
  }

  /**
   * Show the per-question timeout state. Practice mode just displays an
   * inline note — the question stays fully answerable. Exam mode also
   * locks every answer control so nothing can be submitted after the fact.
   */
  function showQuestionTimeout(mode) {
    const note = el["question-timeout-note"];
    note.classList.remove("is-hidden");
    if (mode === "exam") {
      note.textContent = CQA.i18n.t("timer.expired.exam");
      note.classList.add("is-locked-note");
      lockAnswerControlsForTimeout();
    } else {
      note.textContent = CQA.i18n.t("timer.expired.practice");
      note.classList.remove("is-locked-note");
    }
  }

  const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

  /**
   * Build one selectable answer option row. `displayPos` is the option's
   * position in the shuffled DISPLAY order (drives the A/B/C key badge);
   * `index` stays the ORIGINAL option index used for validation.
   */
  function buildAnswerOption(question, optionText, index, displayPos) {
    const isMulti = question.type === CQA.data.questionModes.MULTI_SELECT;
    const label = document.createElement("label");
    label.className = "answer-option";

    const input = document.createElement("input");
    input.type = isMulti ? "checkbox" : "radio";
    input.name = "answer";
    input.value = String(index);
    label.appendChild(input);

    const key = document.createElement("span");
    key.className = "answer-option-key";
    key.setAttribute("aria-hidden", "true");
    key.textContent = OPTION_LETTERS[displayPos] || "";
    label.appendChild(key);

    const text = document.createElement("span");
    text.className = "answer-option-text";
    text.textContent = optionText;
    label.appendChild(text);

    return label;
  }

  /** Render the current question with fresh answer controls. */
  function renderQuestion(question, index, total) {
    if (!question) return; // defensive: never render an empty card
    showView("question");
    CQA.tooltipManager.hide(); // don't leave a tooltip anchored to removed text
    renderProviderBadge(question);
    renderQuestionId(question);
    el["question-progress"].textContent = CQA.i18n.t("question.progress", { index: index + 1, total: total });
    // Progress track fills with COMPLETED questions (index of the current
    // one), matching the redesign's semantics — empty at Q1, full only
    // once the last question is answered and the summary appears.
    el["question-progress-fill"].style.width =
      (total > 0 ? Math.round((index / total) * 100) : 0) + "%";

    // Fresh per-question timer display; main.js starts the actual countdown
    // right after this render call. The timeout note/lock from a previous
    // question never leaks in — answer-options below is rebuilt from
    // scratch with fresh, enabled inputs regardless.
    el["question-timer"].classList.remove("is-critical");
    el["question-timer-value"].textContent = formatClock(CQA.timer.QUESTION_SECONDS);
    el["question-timeout-note"].classList.add("is-hidden");
    el["question-timeout-note"].classList.remove("is-locked-note");
    el["question-timeout-note"].textContent = "";

    const localized = CQA.data.localizeQuestion(question, CQA.i18n.getLang());
    el["question-prompt"].textContent = localized.question;
    el["question-instruction"].textContent = typeInstruction(question.type);

    // Options render in the session's shuffled display order, but every
    // input keeps its ORIGINAL index as value — validation is unaffected.
    const displayOrder = CQA.state.get().session.optionOrders[question.id] ||
      question.options.map(function (_, i) { return i; });
    el["answer-options"].replaceChildren(
      ...displayOrder.map(function (originalIndex, displayPos) {
        return buildAnswerOption(question, localized.options[originalIndex], originalIndex, displayPos);
      })
    );
    el["answer-options"].setAttribute("aria-label", typeInstruction(question.type));

    el["feedback-area"].classList.add("is-hidden");
    el["feedback-area"].classList.remove("feedback-correct", "feedback-incorrect");
    el["btn-submit"].classList.remove("is-hidden");
    el["btn-submit"].disabled = true;
    el["btn-submit"].textContent = CQA.i18n.t(
      CQA.state.get().settings.mode === "exam" ? "answer.submitContinue" : "answer.submit"
    );
    el["btn-next"].classList.add("is-hidden");
    syncNotSureChip(); // reflect the (reset) session flag on the control

    // Turn known glossary terms in the prompt into interactive tooltips.
    CQA.tooltipManager.annotate(el["question-prompt"]);

    // Move focus to the new prompt so keyboard/screen-reader users land
    // on the question, not on the now-hidden Next button.
    el["question-prompt"].focus();
  }

  /**
   * Reflect session.notSureActive (the source of truth) on the checkbox
   * and its chip. The .is-checked class drives the visible active state —
   * more reliable than :has(:checked), which failed to restyle after
   * click-toggles in some engines (the original "not functional" bug).
   */
  function syncNotSureChip() {
    const active = CQA.state.get().session.notSureActive === true;
    el["not-sure-toggle"].checked = active;
    const chip = el["not-sure-toggle"].closest(".not-sure-chip");
    if (chip) chip.classList.toggle("is-checked", active);
  }

  /** The option indices the user currently has selected. */
  function readSelectedAnswers() {
    return Array.from(
      el["answer-options"].querySelectorAll('input[name="answer"]:checked')
    ).map(function (input) { return Number(input.value); });
  }

  /** Enable Submit only once the user selected something. */
  function syncSubmitEnabled() {
    el["btn-submit"].disabled = readSelectedAnswers().length === 0;
  }

  /* ======================================================================
     Feedback
     ====================================================================== */

  /**
   * Mark the options, lock the inputs, and show verdict + explanation +
   * resource reference. `result` comes from CQA.engine.submitAnswer().
   * `wasLate` (Practice mode only) flags that the per-question timer had
   * already expired when the user submitted — scoring is unaffected, this
   * is purely an inline visual note.
   */
  function renderFeedback(question, result, wasLate) {
    const localized = CQA.data.localizeQuestion(question, CQA.i18n.getLang());

    const lateNote = el["feedback-late-note"];
    lateNote.classList.toggle("is-hidden", !wasLate);
    if (wasLate) lateNote.textContent = CQA.i18n.t("timer.answeredLate");

    const options = Array.from(el["answer-options"].querySelectorAll(".answer-option"));
    options.forEach(function (option) {
      const input = option.querySelector("input");
      // input.value carries the ORIGINAL option index (options may be
      // displayed shuffled), so marking must use it — not the DOM position.
      const originalIndex = Number(input.value);
      const wasSelected = input.checked;
      input.disabled = true;
      if (result.correctIndices.includes(originalIndex)) {
        option.classList.add("is-correct");
      } else if (wasSelected) {
        option.classList.add("is-wrong");
      }
      option.classList.add("is-locked");
    });

    const area = el["feedback-area"];
    area.classList.remove("is-hidden");
    area.classList.add(result.isCorrect ? "feedback-correct" : "feedback-incorrect");

    el["feedback-verdict"].textContent = CQA.i18n.t(result.isCorrect ? "feedback.correct" : "feedback.incorrect");
    el["feedback-explanation"].textContent = localized.explanation;

    const ref = el["feedback-reference"];
    if (question.resourceUrl) {
      const link = document.createElement("a");
      link.href = question.resourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = localized.resourceTitle || question.resourceUrl;
      ref.replaceChildren(document.createTextNode(CQA.i18n.t("feedback.learnMore")), link);
    } else {
      ref.replaceChildren();
    }

    el["btn-submit"].classList.add("is-hidden");
    el["btn-next"].classList.remove("is-hidden");
    el["btn-next"].textContent = CQA.i18n.t(result.isLast ? "answer.showSummary" : "answer.next");
    el["btn-next"].focus();

    // Glossary terms in the explanation and reference line (never inside
    // the docs link itself — links are excluded by the tooltip manager).
    CQA.tooltipManager.annotate(area);
  }

  /* ======================================================================
     Review Mistakes modal
     ====================================================================== */

  let reviewReturnFocus = null;

  /** Enable/disable the Review Mistakes button based on recorded mistakes. */
  function updateReviewButton() {
    const count = CQA.state.get().session.mistakes.length;
    const btn = el["btn-review"];

    // During an exam, even the mistake count would leak results.
    if (isExamInProgress()) {
      btn.disabled = true;
      btn.textContent = CQA.i18n.t("control.review");
      btn.title = CQA.i18n.t("control.review.title.examLocked");
      return;
    }

    btn.disabled = count === 0;
    btn.textContent = count > 0 ? CQA.i18n.t("control.review.count", { count: count }) : CQA.i18n.t("control.review");
    btn.title = count > 0
      ? CQA.i18n.t("control.review.title.ready")
      : CQA.i18n.t("control.review.title.empty");
  }

  /** Small inline provider dot + label group for cards. */
  function buildProviderLabels(providerIds) {
    const wrap = document.createElement("span");
    wrap.className = "review-providers";
    CQA.data.getProviders()
      .filter(function (p) { return providerIds.includes(p.id); })
      .forEach(function (p) {
        const dot = document.createElement("span");
        dot.className = "chip-dot";
        dot.style.background = "var(" + p.colorToken + ")";
        dot.setAttribute("aria-hidden", "true");
        wrap.append(dot, document.createTextNode(CQA.i18n.label("provider", p.id, p.label) + " "));
      });
    return wrap;
  }

  /** Fill a filter <select> with "all" + only the values present in mistakes. */
  function populateReviewFilter(select, kind, registry, presentIds, allLabel) {
    const current = select.value || "all";
    const options = [{ id: "all", label: allLabel }].concat(
      registry.filter(function (item) { return presentIds.has(item.id); })
    );
    select.replaceChildren(
      ...options.map(function (item) {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.id === "all" ? item.label : CQA.i18n.label(kind, item.id, item.label);
        return option;
      })
    );
    select.value = options.some(function (o) { return o.id === current; }) ? current : "all";
  }

  /** One reviewed mistake: question, marked options, explanation, reference. */
  function buildReviewCard(mistake) {
    const question = mistake.question;
    const localized = CQA.data.localizeQuestion(question, CQA.i18n.getLang());
    const card = document.createElement("article");
    card.className = "review-card";

    const meta = document.createElement("div");
    meta.className = "review-card-meta";
    meta.appendChild(buildProviderLabels(question.providers));
    const domains = document.createElement("span");
    domains.className = "review-card-domains";
    const domainLabels = CQA.data.getDomains()
      .filter(function (d) { return question.domains.includes(d.id); })
      .map(function (d) { return CQA.i18n.label("domain", d.id, d.label); });
    domains.textContent = domainLabels.join(" · ") + " · " +
      CQA.i18n.label("difficulty", question.difficulty, question.difficulty) +
      (mistake.wasUnsure ? CQA.i18n.t("review.markedNotSure") : "");
    meta.appendChild(domains);

    const idTag = document.createElement("span");
    idTag.className = "review-card-id";
    idTag.textContent = CQA.i18n.t("review.card.idLabel") + " " + question.id;
    meta.appendChild(idTag);

    const prompt = document.createElement("h3");
    prompt.className = "review-card-prompt";
    prompt.textContent = localized.question;

    const options = document.createElement("div");
    options.className = "review-card-options";
    localized.options.forEach(function (text, index) {
      const row = document.createElement("div");
      row.className = "review-option";
      const isCorrect = mistake.correctIndices.includes(index);
      const wasPicked = mistake.selectedIndices.includes(index);

      let mark = "";
      if (isCorrect) {
        row.classList.add("is-correct");
        mark = "✔ ";
      } else if (wasPicked) {
        row.classList.add("is-wrong");
        mark = "✘ ";
      }
      row.textContent = mark + text;
      if (wasPicked) {
        const you = document.createElement("span");
        you.className = "review-your-choice";
        you.textContent = CQA.i18n.t(isCorrect ? "review.yourChoice" : "review.yourChoiceIncorrect");
        row.appendChild(you);
      }
      options.appendChild(row);
    });

    const explanation = document.createElement("p");
    explanation.className = "review-card-explanation";
    explanation.textContent = localized.explanation;

    card.append(meta, prompt, options, explanation);

    if (question.resourceUrl) {
      const ref = document.createElement("p");
      ref.className = "review-card-reference";
      const link = document.createElement("a");
      link.href = question.resourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = localized.resourceTitle || question.resourceUrl;
      ref.append(document.createTextNode(CQA.i18n.t("review.learnMore")), link);
      card.appendChild(ref);
    }

    // Glossary terms in prompt/explanation become interactive here too.
    CQA.tooltipManager.annotate(card);
    return card;
  }

  /** Render the mistake list, honoring the provider/domain filters. */
  function renderReviewList() {
    const providerFilter = el["review-filter-provider"].value || "all";
    const domainFilter = el["review-filter-domain"].value || "all";

    const mistakes = CQA.engine.getMistakes().filter(function (m) {
      if (providerFilter !== "all" && !m.question.providers.includes(providerFilter)) return false;
      if (domainFilter !== "all" && !m.question.domains.includes(domainFilter)) return false;
      return true;
    });

    if (mistakes.length === 0) {
      const empty = document.createElement("p");
      empty.className = "review-empty";
      empty.textContent = CQA.i18n.t("review.empty");
      el["review-list"].replaceChildren(empty);
      return;
    }
    el["review-list"].replaceChildren(...mistakes.map(buildReviewCard));
  }

  /** Open the review modal for the current session's mistakes. */
  function openReview() {
    const mistakes = CQA.engine.getMistakes();
    if (mistakes.length === 0) return;

    el["review-title"].textContent = CQA.i18n.t("review.title.count", { count: mistakes.length });

    const providerIds = new Set();
    const domainIds = new Set();
    mistakes.forEach(function (m) {
      m.question.providers.forEach(function (p) { providerIds.add(p); });
      m.question.domains.forEach(function (d) { domainIds.add(d); });
    });
    populateReviewFilter(el["review-filter-provider"], "provider", CQA.data.getProviders(), providerIds, CQA.i18n.t("review.filter.allProviders"));
    populateReviewFilter(el["review-filter-domain"], "domain", CQA.data.getDomains(), domainIds, CQA.i18n.t("review.filter.allDomains"));

    renderReviewList();
    reviewReturnFocus = document.activeElement;
    CQA.a11y.setAppInert(true);
    el["review-overlay"].classList.remove("is-hidden");
    el["review-close"].focus();
  }

  function closeReview() {
    CQA.tooltipManager.hide();
    el["review-overlay"].classList.add("is-hidden");
    CQA.a11y.setAppInert(false);
    if (reviewReturnFocus && reviewReturnFocus.isConnected) {
      reviewReturnFocus.focus();
    }
    reviewReturnFocus = null;
  }

  function isReviewOpen() {
    return !el["review-overlay"].classList.contains("is-hidden");
  }

  /* ======================================================================
     Session summary
     ====================================================================== */

  /** One breakdown row: label, correct/answered and an accuracy bar. */
  function buildBreakdownRow(row) {
    const wrap = document.createElement("div");
    wrap.className = "breakdown-row";

    const label = document.createElement("span");
    label.className = "breakdown-label";
    label.textContent = row.label;

    const bar = document.createElement("div");
    bar.className = "breakdown-bar";
    const fill = document.createElement("div");
    fill.className = "breakdown-bar-fill";
    fill.style.width = row.accuracy + "%";
    bar.appendChild(fill);

    const value = document.createElement("span");
    value.className = "breakdown-value";
    value.textContent = row.correct + "/" + row.answered + " · " + row.accuracy + "%";

    wrap.append(label, bar, value);
    return wrap;
  }

  function buildBreakdownSection(title, rows, compact) {
    const section = document.createElement("div");
    section.className = compact ? "breakdown-section breakdown-compact" : "breakdown-section";
    const heading = document.createElement("h3");
    heading.className = "breakdown-title";
    heading.textContent = title;
    section.appendChild(heading);
    rows.forEach(function (row) { section.appendChild(buildBreakdownRow(row)); });
    return section;
  }

  /** Render the end-of-session summary from CQA.engine.getSummary(). */
  function renderSummary(summary) {
    showView("summary");

    const heading = document.createElement("h2");
    heading.className = "summary-title";
    heading.textContent = CQA.i18n.t(
      summary.isDaily ? "summary.title.daily" : summary.isRetry ? "summary.title.retry" : "summary.title.session"
    );

    const lead = document.createElement("p");
    lead.className = "summary-lead";
    lead.textContent = CQA.i18n.t("summary.lead", { correct: summary.correct, answered: summary.answered });

    const tiles = document.createElement("div");
    tiles.className = "stats-grid summary-stats";
    tiles.append(
      buildStatTile(CQA.i18n.t("board.score"), String(summary.points)),
      buildStatTile(CQA.i18n.t("board.accuracy"), summary.accuracy + "%"),
      buildStatTile(CQA.i18n.t("board.bestStreak"), String(summary.bestStreak)),
      buildStatTile(CQA.i18n.t("summary.mistakesLabel"), String(summary.mistakes))
    );

    const container = el["summary-container"];
    container.replaceChildren(heading, lead, tiles);

    if (summary.hardestDomain) {
      const hardest = document.createElement("p");
      hardest.className = "summary-hardest";
      const domainLabel = CQA.i18n.label("domain", summary.hardestDomain.id, summary.hardestDomain.label);
      const countPhrase = summary.hardestDomain.wrong + " " +
        CQA.i18n.t(summary.hardestDomain.wrong === 1 ? "summary.wrongAnswer" : "summary.wrongAnswers");
      hardest.textContent = CQA.i18n.t("summary.hardestDomain", {
        domain: domainLabel, count: countPhrase, accuracy: summary.hardestDomain.accuracy,
      });
      container.appendChild(hardest);
    }

    if (summary.providers.length > 0) {
      container.appendChild(buildBreakdownSection(CQA.i18n.t("summary.section.providerPerformance"), summary.providers));
    }
    if (summary.domains.length > 0) {
      container.appendChild(buildBreakdownSection(CQA.i18n.t("summary.section.byDomain"), summary.domains));
    }

    // Confidence vs correctness — how well calibrated were you?
    const confidenceRows = [];
    if (summary.confidence.sure.answered > 0) {
      confidenceRows.push(Object.assign({ label: CQA.i18n.t("summary.confident") }, summary.confidence.sure));
    }
    if (summary.confidence.unsure.answered > 0) {
      confidenceRows.push(Object.assign({ label: CQA.i18n.t("summary.notSure") }, summary.confidence.unsure));
    }
    if (confidenceRows.length > 0) {
      container.appendChild(
        buildBreakdownSection(CQA.i18n.t("summary.section.confidence"), confidenceRows)
      );
    }

    // Explicit "Not sure" tallies: total flagged, correct, incorrect.
    if (summary.confidence.unsure.answered > 0) {
      const u = summary.confidence.unsure;
      const note = document.createElement("p");
      note.className = "summary-confidence-note";
      note.textContent = CQA.i18n.t("summary.confidenceNote", {
        count: u.answered, correct: u.correct, incorrect: u.answered - u.correct,
      });
      container.appendChild(note);
    }

    const actions = document.createElement("div");
    actions.className = "summary-actions";

    const again = document.createElement("button");
    again.type = "button";
    again.className = "btn btn-primary";
    again.textContent = CQA.i18n.t("summary.startAnother");
    again.addEventListener("click", function () {
      el["btn-start"].click();
    });
    actions.appendChild(again);

    // Certificate is available for every completed session (required for
    // Exam, optional/available for Study/Practice too) — CQA.certificate
    // reads only the frozen completion record set when this session ended.
    const certificate = document.createElement("button");
    certificate.type = "button";
    certificate.className = "btn";
    certificate.textContent = CQA.i18n.t("summary.generateCertificate");
    certificate.addEventListener("click", function () {
      CQA.certificate.open();
    });
    actions.appendChild(certificate);

    if (summary.mistakes > 0) {
      const review = document.createElement("button");
      review.type = "button";
      review.className = "btn";
      review.textContent = CQA.i18n.t("control.review.count", { count: summary.mistakes });
      review.addEventListener("click", openReview);
      actions.appendChild(review);

      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "btn";
      retry.textContent = CQA.i18n.t("summary.retryWrong");
      retry.addEventListener("click", function () {
        el["btn-retry"].click();
      });
      actions.appendChild(retry);
    }

    container.appendChild(actions);
  }

  return {
    init,
    el,
    loadSavedTheme,
    applyTheme,
    applyMode,
    refreshThemeLabel,
    isThemeMenuOpen,
    openThemeMenu,
    closeThemeMenu,
    toggleThemeMenu,
    renderSetup,
    renderScope,
    renderFocusDomains,
    updateSetupFlow,
    renderSetupSummary,
    toggleSetupCollapsed,
    collapseSetupOnMobile,
    renderScoreboard,
    showPlaceholder,
    renderQuestion,
    copyQuestionId,
    renderSessionTimer,
    renderQuestionTimer,
    showQuestionTimeout,
    readSelectedAnswers,
    syncNotSureChip,
    syncSubmitEnabled,
    renderFeedback,
    renderSummary,
    updateReviewButton,
    openReview,
    closeReview,
    isReviewOpen,
    renderReviewList,
  };
})();
