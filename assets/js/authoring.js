/**
 * authoring.js — DEVELOPER-ONLY content authoring tools. NOT part of the
 * public product surface.
 *
 * As of Phase 14, end users cannot add, import, or edit quiz questions —
 * that UI (an "Author" button and modal) has been removed from
 * index.html to prevent spam, bad data, or content-poisoning
 * if the app is published publicly. This file is intentionally NOT
 * <script>-included by the shipped HTML and CQA.authoring.init() is not
 * called anywhere in the public bootstrap (see main.js).
 *
 * It is kept in the repo purely as an offline maintainer tool: to use it
 * while doing local content work, temporarily add
 *   <script src="assets/js/authoring.js"></script>
 * before render.js in a LOCAL copy of the HTML, and call
 * CQA.authoring.init() after CQA.render.init(). Never re-add it to the
 * shipped/public HTML.
 *
 * Self-contained UI module (like tooltip-manager.js) that owns the
 * authoring modal: import a JSON question pack, export the in-memory
 * pool, and add single questions through a form. All validation and
 * merging is delegated to CQA.data (validateQuestion / hasQuestion /
 * addQuestions); this module only handles files, forms and reporting.
 *
 * Everything stays in browser memory for this page visit — no backend,
 * no persistence. Exported JSON can be re-imported later or turned into
 * a permanent pack file under assets/data/.
 *
 * API: CQA.authoring.init() — wire the modal and the header button.
 */

window.CQA = window.CQA || {};

CQA.authoring = (function () {
  "use strict";

  /** Cached mount points inside the authoring modal. */
  const el = {};
  let returnFocus = null;

  function init() {
    [
      "authoring-btn", "authoring-overlay", "authoring-close", "authoring-pool-count",
      "import-file", "import-report", "btn-export",
      "add-question-form", "author-form-report",
      "aq-id", "aq-providers", "aq-domains", "aq-difficulty", "aq-type",
      "aq-question", "aq-options", "aq-correct", "aq-correct-hint",
      "aq-explanation", "aq-resource-title", "aq-resource-url",
      "aq-keywords", "aq-tooltip-terms",
    ].forEach(function (id) {
      el[id] = document.getElementById(id);
    });

    buildFormControls();
    wireEvents();
    refreshPoolCount();
  }

  /* ======================================================================
     Open / close
     ====================================================================== */

  function isOpen() {
    return !el["authoring-overlay"].classList.contains("is-hidden");
  }

  function open() {
    refreshPoolCount();
    returnFocus = document.activeElement;
    CQA.a11y.setAppInert(true);
    el["authoring-overlay"].classList.remove("is-hidden");
    el["authoring-close"].focus();
  }

  function close() {
    el["authoring-overlay"].classList.add("is-hidden");
    CQA.a11y.setAppInert(false);
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    returnFocus = null;
  }

  function refreshPoolCount() {
    const count = CQA.data.getAllQuestions().length;
    el["authoring-pool-count"].textContent = count + " questions in pool";
    el["btn-export"].textContent = "Download JSON (" + count + " questions)";
  }

  /* ======================================================================
     Reporting helpers
     ====================================================================== */

  function reportLine(kind, text) {
    const line = document.createElement("p");
    line.className = "report-line report-" + kind; // ok | warn | error
    line.textContent = (kind === "ok" ? "✔ " : kind === "warn" ? "⚠ " : "✘ ") + text;
    return line;
  }

  /** Render an addQuestions() report into a container. */
  function renderMergeReport(container, report, emptyMessage) {
    const lines = [];
    if (report.added.length > 0) {
      lines.push(reportLine("ok", "Imported " + report.added.length + " question" +
        (report.added.length === 1 ? "" : "s") + ": " + report.added.join(", ")));
    }
    if (report.duplicates.length > 0) {
      lines.push(reportLine("warn", "Skipped " + report.duplicates.length +
        " duplicate ID" + (report.duplicates.length === 1 ? "" : "s") +
        " (already in the pool): " + report.duplicates.join(", ")));
    }
    report.invalid.forEach(function (item) {
      lines.push(reportLine("error", item.ref + " — " + item.problems.join("; ")));
    });
    if (lines.length === 0 && emptyMessage) {
      lines.push(reportLine("warn", emptyMessage));
    }
    container.replaceChildren(...lines);
  }

  /* ======================================================================
     Import
     ====================================================================== */

  function handleImportFile(file) {
    el["import-report"].replaceChildren(reportLine("warn", "Reading " + file.name + "…"));
    const reader = new FileReader();
    reader.onerror = function () {
      el["import-report"].replaceChildren(
        reportLine("error", "Could not read the file: " + (reader.error ? reader.error.message : "unknown error"))
      );
    };
    reader.onload = function () {
      let parsed;
      try {
        parsed = JSON.parse(reader.result);
      } catch (e) {
        el["import-report"].replaceChildren(
          reportLine("error", "Invalid JSON: " + e.message)
        );
        return;
      }

      // Accept either a bare array of questions or a pack object.
      const questions = Array.isArray(parsed) ? parsed : parsed && parsed.questions;
      if (!Array.isArray(questions)) {
        el["import-report"].replaceChildren(
          reportLine("error",
            "Unrecognized format. Expected an array of questions or an object " +
            "with a \"questions\" array.")
        );
        return;
      }
      if (questions.length === 0) {
        el["import-report"].replaceChildren(
          reportLine("warn", "The file contains no questions.")
        );
        return;
      }

      const label = (parsed && parsed.label) || file.name;
      const report = CQA.data.addQuestions(questions, "Imported: " + label);
      renderMergeReport(el["import-report"], report, "Nothing was imported.");
      refreshPoolCount();
    };
    reader.readAsText(file);
  }

  /* ======================================================================
     Export
     ====================================================================== */

  function exportPool() {
    const pack = {
      id: "cloud-quiz-arena-export",
      label: "Cloud Quiz Arena export",
      exportedAt: new Date().toISOString(),
      questions: CQA.data.getAllQuestions(),
    };
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cloud-quiz-questions.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  /* ======================================================================
     Add-question form
     ====================================================================== */

  /** Fill provider/domain checkboxes and difficulty/type selects. */
  function buildFormControls() {
    const chip = function (groupName, item) {
      const label = document.createElement("label");
      label.className = "chip";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = groupName;
      input.value = item.id;
      label.append(input, document.createTextNode(item.label));
      return label;
    };

    el["aq-providers"].replaceChildren(
      ...CQA.data.getProviders().map(function (p) { return chip("aq-providers", p); })
    );
    el["aq-domains"].replaceChildren(
      ...CQA.data.getDomains().map(function (d) { return chip("aq-domains", d); })
    );

    el["aq-difficulty"].replaceChildren(
      ...CQA.data.getDifficulties().map(function (d) {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = d.label;
        return option;
      })
    );
    el["aq-type"].replaceChildren(
      ...CQA.data.getQuestionModeLabels().map(function (m) {
        const option = document.createElement("option");
        option.value = m.id;
        option.textContent = m.label;
        return option;
      })
    );
    syncTypeDependentFields();
  }

  /** Adjust the options/correct-answer inputs to the selected type. */
  function syncTypeDependentFields() {
    const type = el["aq-type"].value;
    const modes = CQA.data.questionModes;

    if (type === modes.TRUE_FALSE) {
      el["aq-options"].value = "True\nFalse";
      el["aq-options"].readOnly = true;
      el["aq-correct"].placeholder = "true or false";
      el["aq-correct-hint"].textContent = "Enter \"true\" or \"false\".";
    } else {
      if (el["aq-options"].readOnly) el["aq-options"].value = "";
      el["aq-options"].readOnly = false;
      if (type === modes.MULTI_SELECT) {
        el["aq-correct"].placeholder = "e.g. 1,3";
        el["aq-correct-hint"].textContent = "Comma-separated option numbers (first option = 1).";
      } else {
        el["aq-correct"].placeholder = "e.g. 2";
        el["aq-correct-hint"].textContent = "One option number (first option = 1).";
      }
    }
  }

  function checkedValues(groupName) {
    return Array.from(
      document.querySelectorAll('input[name="' + groupName + '"]:checked')
    ).map(function (input) { return input.value; });
  }

  function splitList(raw) {
    return raw.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /** Parse the correct-answer input for the selected type. */
  function parseCorrectAnswer(type, raw, optionCount) {
    const modes = CQA.data.questionModes;
    const text = raw.trim().toLowerCase();

    if (type === modes.TRUE_FALSE) {
      if (text === "true") return { ok: true, value: true };
      if (text === "false") return { ok: true, value: false };
      return { ok: false, error: "Correct answer: enter \"true\" or \"false\"." };
    }

    const inRange = function (n) {
      return Number.isInteger(n) && n >= 1 && n <= optionCount;
    };

    if (type === modes.MULTIPLE_CHOICE) {
      const n = Number(text);
      if (!inRange(n)) {
        return { ok: false, error: "Correct answer: enter one option number between 1 and " + optionCount + "." };
      }
      return { ok: true, value: n - 1 };
    }

    // multi-select
    const numbers = splitList(text).map(Number);
    if (numbers.length === 0 || !numbers.every(inRange)) {
      return { ok: false, error: "Correct answer: comma-separated option numbers between 1 and " + optionCount + "." };
    }
    const indices = Array.from(new Set(numbers))
      .sort(function (a, b) { return a - b; })
      .map(function (n) { return n - 1; });
    return { ok: true, value: indices };
  }

  /** Build, validate and merge the question from the form. */
  function submitQuestionForm(event) {
    event.preventDefault();
    const errors = [];

    const options = el["aq-options"].value
      .split("\n").map(function (s) { return s.trim(); }).filter(Boolean);

    const parsedAnswer = parseCorrectAnswer(el["aq-type"].value, el["aq-correct"].value, options.length);
    if (!parsedAnswer.ok) errors.push(parsedAnswer.error);

    const question = {
      id: el["aq-id"].value.trim(),
      providers: checkedValues("aq-providers"),
      domains: checkedValues("aq-domains"),
      difficulty: el["aq-difficulty"].value,
      type: el["aq-type"].value,
      question: el["aq-question"].value.trim(),
      options: options,
      correctAnswer: parsedAnswer.ok ? parsedAnswer.value : null,
      explanation: el["aq-explanation"].value.trim(),
      resourceTitle: el["aq-resource-title"].value.trim(),
      resourceUrl: el["aq-resource-url"].value.trim(),
      keywords: splitList(el["aq-keywords"].value),
      tooltipTerms: splitList(el["aq-tooltip-terms"].value),
    };

    // Schema validation (skip the correctAnswer complaints we already made).
    if (parsedAnswer.ok) {
      errors.push(...CQA.data.validateQuestion(question));
    } else {
      errors.push(...CQA.data.validateQuestion(question).filter(function (p) {
        return p.indexOf("correctAnswer") !== 0;
      }));
    }
    if (question.id && CQA.data.hasQuestion(question.id)) {
      errors.push("id: \"" + question.id + "\" already exists — choose a unique ID");
    }

    const report = el["author-form-report"];
    if (errors.length > 0) {
      report.replaceChildren(...errors.map(function (e) { return reportLine("error", e); }));
      return;
    }

    CQA.data.addQuestions([question], "Manually authored");
    refreshPoolCount();

    const lines = [reportLine("ok", "Added \"" + question.id + "\". The pool now has " +
      CQA.data.getAllQuestions().length + " questions.")];
    const unknownTerms = question.tooltipTerms.filter(function (t) { return !CQA.data.getTooltip(t); });
    if (unknownTerms.length > 0) {
      lines.push(reportLine("warn", "No tooltip dictionary entry for: " +
        unknownTerms.join(", ") + " — these terms won't show tooltips."));
    }
    report.replaceChildren(...lines);

    // Clear the per-question fields; keep providers/domains/difficulty/type
    // selections so authoring several similar questions stays fast.
    ["aq-id", "aq-question", "aq-correct", "aq-explanation",
     "aq-resource-title", "aq-resource-url", "aq-keywords", "aq-tooltip-terms"]
      .forEach(function (id) { el[id].value = ""; });
    if (!el["aq-options"].readOnly) el["aq-options"].value = "";
  }

  /* ======================================================================
     Events
     ====================================================================== */

  function wireEvents() {
    el["authoring-btn"].addEventListener("click", open);
    el["authoring-close"].addEventListener("click", close);

    el["authoring-overlay"].addEventListener("click", function (event) {
      if (event.target === el["authoring-overlay"]) close();
    });

    // Capture-phase Escape: close this modal unless a tooltip is open
    // (the tooltip manager's bubble-phase handler takes that keypress).
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !isOpen()) return;
      if (CQA.tooltipManager.isOpen()) return;
      event.stopPropagation();
      close();
    }, true);

    el["import-file"].addEventListener("change", function () {
      const file = el["import-file"].files[0];
      if (file) handleImportFile(file);
      el["import-file"].value = ""; // allow re-importing the same file
    });

    el["btn-export"].addEventListener("click", exportPool);
    el["aq-type"].addEventListener("change", syncTypeDependentFields);
    el["add-question-form"].addEventListener("submit", submitQuestionForm);
  }

  return {
    init,
    open,
    close,
    isOpen,
  };
})();
