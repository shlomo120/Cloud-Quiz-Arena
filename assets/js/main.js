/**
 * =========================================================================
 * Cloud Quiz Arena — main.js (application entry point)
 * =========================================================================
 * A static, client-side quiz platform for cloud technologies.
 * Plain HTML/CSS/JS, no backend, no build step — open
 * index.html directly in a browser.
 *
 * Module responsibilities (all share the global CQA namespace,
 * loaded in this order via <script> tags in index.html):
 *
 *   data.js        CQA.data    — provider/domain/difficulty registries,
 *                                question modes, quiz-pack and tooltip
 *                                registration (packs live in assets/data/).
 *   state.js       CQA.state   — in-memory app state: quiz settings,
 *                                session progress, score/streak, and
 *                                per-provider/per-domain counters.
 *   quiz-engine.js CQA.engine  — quiz rules: question filtering and
 *                                shuffling, answer evaluation per mode,
 *                                session flow, summary. Pure logic, no DOM.
 *   tooltip-manager.js
 *                  CQA.tooltipManager
 *                              — self-contained glossary UI: detects
 *                                dictionary terms in rendered text, shows
 *                                hover/tap tooltips, and owns the
 *                                glossary modal.
 *   certificate.js CQA.certificate
 *                              — self-contained completion-certificate UI:
 *                                renders the printable certificate view,
 *                                the display-name prompt, and the share-text
 *                                builder from a completed session summary.
 *   render.js      CQA.render  — renders the app views: theme, setup
 *                                controls, scoreboard, questions,
 *                                feedback, summary.
 *   main.js        (this file) — bootstraps the app and wires DOM events
 *                                to the engine, state and render.
 *
 * Content authoring: end users cannot add, import, or edit questions in
 * this build — there is no such UI surface. assets/js/authoring.js is a
 * developer-only utility (question-pack import/export/add-question form)
 * kept in the repo for offline content work; it is NOT referenced by
 * index.html and must stay that way in any public deployment.
 *
 * Extension points:
 *   - New provider: add an entry in data.js and a color token in tokens.css.
 *   - New quiz pack: add a file under assets/data/ that calls
 *     CQA.data.registerPack(), then include it in the HTML shell.
 * =========================================================================
 */

(function () {
  "use strict";

  /** Read the checked values of a chip checkbox group. */
  function checkedValues(groupName) {
    return Array.from(
      document.querySelectorAll('input[name="' + groupName + '"]:checked')
    ).map(function (input) { return input.value; });
  }

  /** settings.domains is always scope topics ∪ checked focus chips. */
  function recomputeDomains() {
    const settings = CQA.state.get().settings;
    const merged = settings.scopeTopics.concat(
      checkedValues("domains").filter(function (d) {
        return !settings.scopeTopics.includes(d);
      })
    );
    CQA.state.updateSettings({ domains: merged });
  }

  /** Providers derived from track + scope: Non-Cloud/Mixed imply "neutral". */
  function recomputeProviders() {
    const settings = CQA.state.get().settings;
    const clouds = checkedValues("providers");
    const providers = settings.track === "noncloud" ? ["neutral"]
      : settings.track === "mixed" ? clouds.concat("neutral")
      : clouds;
    CQA.state.updateSettings({ providers: providers });
    // Cross-provider toggle is meaningless below 2 cloud providers.
    if (clouds.length < 2 && settings.mixed) {
      CQA.state.updateSettings({ mixed: false });
      CQA.render.el["mixed-toggle"].checked = false;
    }
  }

  /** Track change resets incompatible child selections, then re-renders. */
  function handleTrackChange(track) {
    const providerDefaults = {
      cloud: ["azure", "aws", "gcp"],
      noncloud: ["neutral"],
      mixed: ["azure", "aws", "gcp", "neutral"],
    };
    CQA.state.updateSettings({
      track: track,
      providers: providerDefaults[track] || [],
      scopeTopics: [],
      domains: [],
      mixed: false,
    });
    CQA.render.el["mixed-toggle"].checked = false;
    CQA.render.renderScope();
    CQA.render.renderFocusDomains();
    CQA.render.renderScoreboard(); // "Active providers" follows the track
  }

  /** Wire setup controls so user choices flow into state. */
  function wireSetupControls() {
    const setupPanel = document.getElementById("setup-panel");

    setupPanel.addEventListener("change", function (event) {
      const input = event.target;
      switch (input.name || input.id) {
        case "track":
          handleTrackChange(input.value);
          break;
        case "providers":
          recomputeProviders();
          recomputeDomains();
          CQA.render.renderFocusDomains(); // availability follows providers
          CQA.render.renderScoreboard();
          break;
        case "topics":
          CQA.state.updateSettings({ scopeTopics: checkedValues("topics") });
          recomputeDomains();
          CQA.render.renderFocusDomains(); // chosen topics leave the focus list
          break;
        case "domains":
          recomputeDomains();
          break;
        case "questionTypes":
          CQA.state.updateSettings({ questionTypes: checkedValues("questionTypes") });
          break;
        case "difficulty":
          CQA.state.updateSettings({ difficulty: input.value });
          break;
        case "question-count":
          CQA.state.updateSettings({ questionCount: Number(input.value) });
          break;
        case "mixed-toggle":
          CQA.state.updateSettings({ mixed: input.checked });
          CQA.render.renderFocusDomains(); // cross-provider domains (dis)appear
          break;
        case "adaptive-toggle":
          CQA.state.updateSettings({ adaptive: input.checked });
          break;
        case "mode":
          CQA.state.updateSettings({ mode: input.value });
          break;
      }
      CQA.render.updateSetupFlow(); // visibility, live summary, zero-match warning
    });
  }

  /* ======================================================================
     Quiz flow
     ====================================================================== */

  // Short pause before auto-advancing an Exam-mode question the per-question
  // timer locked with no answer — long enough to read "time expired", short
  // enough to match Exam mode's existing "submit and move on" pace (Exam
  // mode never otherwise pauses for feedback; see submitAnswer()).
  const EXAM_TIMEOUT_ADVANCE_DELAY_MS = 1500;
  let examTimeoutAdvanceId = null;

  function clearExamTimeoutAdvance() {
    if (examTimeoutAdvanceId !== null) {
      clearTimeout(examTimeoutAdvanceId);
      examTimeoutAdvanceId = null;
    }
  }

  function startQuiz() {
    if (!CQA.state.get().settings.track) {
      CQA.render.showPlaceholder(CQA.i18n.t("placeholder.needTrack"));
      return;
    }
    const outcome = CQA.engine.startSession();
    if (!outcome.ok) {
      CQA.render.showPlaceholder(outcome.reason);
      return;
    }
    CQA.timer.startSessionTimer(CQA.render.renderSessionTimer);
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();
    CQA.render.collapseSetupOnMobile();
    showCurrentQuestion();
  }

  function retryWrongAnswers() {
    const outcome = CQA.engine.startRetrySession();
    if (!outcome.ok) return;
    if (CQA.render.isReviewOpen()) CQA.render.closeReview();
    CQA.timer.startSessionTimer(CQA.render.renderSessionTimer);
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();
    CQA.render.collapseSetupOnMobile();
    showCurrentQuestion();
  }

  function startDailyChallenge() {
    const outcome = CQA.engine.startDailyChallenge();
    if (!outcome.ok) {
      CQA.render.showPlaceholder(outcome.reason);
      return;
    }
    CQA.timer.startSessionTimer(CQA.render.renderSessionTimer);
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();
    CQA.render.collapseSetupOnMobile();
    showCurrentQuestion();
  }

  function showCurrentQuestion() {
    const session = CQA.state.get().session;
    CQA.render.renderQuestion(
      CQA.engine.getCurrentQuestion(),
      session.currentIndex,
      session.questions.length
    );
    // Starts fresh every render — including the language-switch refresh
    // path, which is an accepted, already-documented edge case (see
    // onLanguageChange: an in-flight question is deliberately reset there).
    CQA.timer.startQuestionTimer(CQA.render.renderQuestionTimer, handleQuestionTimeout);
  }

  /**
   * The 60s per-question timer reached zero. Practice mode just shows an
   * inline note and leaves every control active — the user can still
   * submit normally afterward (submitAnswer() below flags it as late).
   * Exam mode locks the question and records it as unanswered (empty
   * selection — the existing scoring path already treats that as
   * incorrect), then auto-advances after a short pause.
   */
  function handleQuestionTimeout() {
    const session = CQA.state.get().session;
    if (!session.active || session.awaitingNext) return; // already answered/moved on
    session.questionTimedOut = true;

    if (CQA.state.get().settings.mode !== "exam") {
      CQA.render.showQuestionTimeout("practice");
      return;
    }

    CQA.render.showQuestionTimeout("exam");
    const result = CQA.engine.submitAnswer([], false); // unanswered — never the transient unsubmitted selection
    if (!result) return;
    CQA.render.renderScoreboard(); // masked, only "Answered" ticks up
    CQA.render.updateReviewButton();

    clearExamTimeoutAdvance();
    examTimeoutAdvanceId = setTimeout(function () {
      examTimeoutAdvanceId = null;
      // Guard: the session may have been reset/ended during the pause.
      if (CQA.state.get().session.active && CQA.state.get().session.awaitingNext) {
        nextQuestion();
      }
    }, EXAM_TIMEOUT_ADVANCE_DELAY_MS);
  }

  function submitAnswer() {
    const selected = CQA.render.readSelectedAnswers();
    if (selected.length === 0) return;

    const wasLate = CQA.state.get().session.questionTimedOut === true;
    CQA.timer.stopQuestionTimer(); // answered — the countdown no longer applies
    const result = CQA.engine.submitAnswer(
      selected,
      CQA.state.get().session.notSureActive === true
    );
    if (!result) return;

    // Exam mode: no feedback yet — move straight on; results come at the end.
    if (CQA.state.get().settings.mode === "exam") {
      CQA.render.renderScoreboard(); // masked, only "Answered" ticks up
      nextQuestion();
      return;
    }

    CQA.render.renderFeedback(CQA.engine.getCurrentQuestion(), result, wasLate);
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();
  }

  function nextQuestion() {
    CQA.timer.stopQuestionTimer(); // defensive — already stopped on submit/timeout, never two live intervals
    clearExamTimeoutAdvance();
    const question = CQA.engine.advance();
    if (question) {
      showCurrentQuestion();
      return;
    }
    // Session over: stop the session clock, render the summary, unmask exam results.
    CQA.timer.stopSessionTimer();
    CQA.render.renderSummary(CQA.engine.getSummary());
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();
  }

  function resetSession() {
    CQA.timer.stopAll();
    clearExamTimeoutAdvance();
    CQA.state.resetSession();
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();
    CQA.render.showPlaceholder();
  }

  /** Wire the quiz control bar, question actions and header actions. */
  function wireControls() {
    const el = CQA.render.el;

    // Theme picker: popover with a mini palette swatch per option.
    el["theme-picker-toggle"].addEventListener("click", CQA.render.toggleThemeMenu);
    el["theme-picker-menu"].querySelectorAll(".theme-option").forEach(function (option) {
      option.addEventListener("click", function () {
        CQA.render.applyTheme(option.dataset.theme);
        CQA.render.closeThemeMenu();
        el["theme-picker-toggle"].focus();
      });
    });
    // Outside click closes the popover without touching the theme.
    document.addEventListener("click", function (event) {
      if (!CQA.render.isThemeMenuOpen()) return;
      if (el["theme-picker"].contains(event.target)) return;
      CQA.render.closeThemeMenu();
    });
    document.getElementById("lang-select").addEventListener("change", function (event) {
      CQA.i18n.setLang(event.target.value);
    });
    el["setup-toggle"].addEventListener("click", CQA.render.toggleSetupCollapsed);
    document.getElementById("glossary-btn")
      .addEventListener("click", CQA.tooltipManager.openGlossary);
    el["btn-start"].addEventListener("click", startQuiz);
    el["btn-start-panel"].addEventListener("click", startQuiz);
    el["btn-daily"].addEventListener("click", startDailyChallenge);
    el["btn-reset"].addEventListener("click", resetSession);
    el["btn-submit"].addEventListener("click", submitAnswer);
    el["btn-next"].addEventListener("click", nextQuestion);
    el["question-id-badge"].addEventListener("click", CQA.render.copyQuestionId);

    // Enable Submit as soon as the user selects an option.
    el["answer-options"].addEventListener("change", CQA.render.syncSubmitEnabled);

    // "Not sure" flag: session state is the source of truth; the chip's
    // visible active state is synced via a class (not :has, which proved
    // unreliable after click-toggles).
    el["not-sure-toggle"].addEventListener("change", function () {
      CQA.state.get().session.notSureActive = el["not-sure-toggle"].checked;
      CQA.render.syncNotSureChip();
    });

    // Review Mistakes modal
    el["btn-review"].addEventListener("click", CQA.render.openReview);
    el["review-close"].addEventListener("click", CQA.render.closeReview);
    el["btn-retry"].addEventListener("click", retryWrongAnswers);
    el["review-filter-provider"].addEventListener("change", CQA.render.renderReviewList);
    el["review-filter-domain"].addEventListener("change", CQA.render.renderReviewList);

    // Backdrop click closes the review modal.
    el["review-overlay"].addEventListener("click", function (event) {
      if (event.target === el["review-overlay"]) CQA.render.closeReview();
    });

    // Escape closes the review modal — captured before the tooltip
    // manager's handler so an open tooltip is dismissed first, on its own
    // keypress, without also closing the modal underneath it.
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (!CQA.render.isReviewOpen()) return;
      if (CQA.tooltipManager.isOpen()) return; // tooltip handler takes this one
      event.stopPropagation();
      CQA.render.closeReview();
    }, true);

    // Escape closes the theme picker popover and returns focus to its toggle.
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (!CQA.render.isThemeMenuOpen()) return;
      CQA.render.closeThemeMenu();
      el["theme-picker-toggle"].focus();
    });
  }

  /**
   * Re-render whatever is currently visible in the newly-active language.
   * Registered once via CQA.i18n.onChange and fired after every switch
   * (including the initial load). Most render functions already re-run
   * on ordinary state changes, so this just re-invokes the ones relevant
   * to what's on screen right now — nothing here mutates quiz progress.
   */
  function onLanguageChange() {
    const el = CQA.render.el;
    document.getElementById("lang-select").value = CQA.i18n.getLang();
    CQA.render.refreshThemeLabel(); // theme option text is data-i18n; only the toggle's own label needs a manual refresh

    CQA.render.renderSetup(); // rebuilds all setup chips/segments + summary + warning
    el["setup-toggle"].textContent = CQA.i18n.t(
      el["setup-panel"].classList.contains("is-collapsed") ? "setup.show" : "setup.hide"
    );
    CQA.render.renderScoreboard();
    CQA.render.updateReviewButton();

    const session = CQA.state.get().session;
    if (!el["question-container"].classList.contains("is-hidden")) {
      // Re-render the current question fresh in the new language. Any
      // unsubmitted selection (or feedback awaiting "Next") is cleared —
      // a deliberately simple, clearly-scoped behavior for the rare case
      // of switching language mid-question; no score/progress is touched.
      session.awaitingNext = false;
      showCurrentQuestion();
    } else if (!el["summary-container"].classList.contains("is-hidden") && session.finished) {
      CQA.render.renderSummary(CQA.engine.getSummary());
    }

    if (CQA.render.isReviewOpen()) CQA.render.openReview(); // refreshes title/filters/cards
    CQA.tooltipManager.refreshLocalization();
    CQA.certificate.refreshLocalization();
  }

  function bootstrap() {
    CQA.render.init();
    CQA.tooltipManager.init();
    CQA.certificate.init();
    CQA.render.loadSavedTheme();
    wireSetupControls();
    wireControls();

    CQA.i18n.onChange(onLanguageChange);
    CQA.i18n.loadSavedLang(); // applies static translations and fires onLanguageChange
  }

  document.addEventListener("DOMContentLoaded", bootstrap);
})();
