/**
 * quiz-engine.js — Quiz rules and evaluation.
 *
 * Owns the game mechanics: building a randomized question queue from the
 * user's settings, evaluating answers per question mode, recording results
 * into state, and producing the end-of-session summary.
 *
 * Pure logic only — no DOM access. Reads/writes state via CQA.state,
 * reads questions via CQA.data.
 */

window.CQA = window.CQA || {};

CQA.engine = (function () {
  "use strict";

  const modes = CQA.data.questionModes;

  /* ======================================================================
     Question selection
     ====================================================================== */

  /**
   * Fisher–Yates shuffle on a copy — never mutates the input.
   * Pass a custom `rng` (0..1 function) for deterministic shuffles.
   */
  function shuffle(items, rng) {
    const random = rng || Math.random;
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  /**
   * Adaptive weight for a question: 1 for untouched domains, up to 3 for
   * domains the user keeps getting wrong (simple wrong-rate weighting on
   * this visit's lifetime counters — no ML, no persistence).
   */
  function questionWeight(question, domainPerformance) {
    let worstWrongRate = 0;
    question.domains.forEach(function (d) {
      const perf = domainPerformance[d];
      if (perf && perf.answered > 0) {
        const wrongRate = (perf.answered - perf.correct) / perf.answered;
        if (wrongRate > worstWrongRate) worstWrongRate = wrongRate;
      }
    });
    return 1 + 2 * worstWrongRate;
  }

  /**
   * Presentation-only answer shuffle: for each question, a permutation of
   * option indices (display position → original index). Inputs keep the
   * ORIGINAL index as their value, so evaluation, mistakes and review all
   * stay in original-index space and correctness is order-independent.
   * True/False keeps its conventional True-then-False order.
   */
  function buildOptionOrders(questions) {
    const orders = {};
    questions.forEach(function (q) {
      const identity = q.options.map(function (_, i) { return i; });
      orders[q.id] = q.type === modes.TRUE_FALSE ? identity : shuffle(identity);
    });
    return orders;
  }

  /**
   * Weighted sampling without replacement (roulette-wheel per pick).
   * Weights are computed once so large pools stay cheap.
   */
  function weightedSample(pool, count, weightFn) {
    const items = pool.slice();
    const weights = items.map(weightFn);
    let totalWeight = weights.reduce(function (a, b) { return a + b; }, 0);
    const picked = [];

    while (picked.length < count && items.length > 0) {
      let target = Math.random() * totalWeight;
      let index = 0;
      while (index < items.length - 1 && target > weights[index]) {
        target -= weights[index];
        index += 1;
      }
      picked.push(items.splice(index, 1)[0]);
      totalWeight -= weights.splice(index, 1)[0];
    }
    return picked;
  }

  /**
   * Does a question match the user's setup?
   * - Single-provider questions need their provider selected.
   * - Cross-provider questions need the mixed toggle on AND every provider
   *   they compare selected (no AWS-vs-GCP questions if you didn't pick both).
   * - Empty domain selection means "all domains".
   * - Difficulty is an exact match.
   */
  function matchesSettings(question, settings) {
    if (question.providers.length > 1) {
      if (!settings.mixed) return false;
      if (!question.providers.every(function (p) {
        return settings.providers.includes(p);
      })) return false;
    } else if (!settings.providers.includes(question.providers[0])) {
      return false;
    }

    if (settings.domains.length > 0 &&
        !question.domains.some(function (d) { return settings.domains.includes(d); })) {
      return false;
    }

    if (!settings.questionTypes.includes(question.type)) return false;
    if (question.difficulty !== settings.difficulty) return false;
    return true;
  }

  /** All questions matching the given settings (each question is unique by id). */
  function filterQuestions(settings) {
    return CQA.data.getAllQuestions().filter(function (q) {
      return matchesSettings(q, settings);
    });
  }

  /**
   * Whether the current setup has enough selected to start a session:
   * a track, a valid scope for that track, and at least one matching
   * question. The single source of truth for both Start Quiz buttons'
   * enabled/disabled state (see render.js syncStartButtons) — mirrors the
   * same readiness rule the setup panel's zero-match warning already uses.
   */
  function isReadyToStart(settings) {
    if (!settings.track) return false;
    const cloudCount = settings.providers.filter(function (p) { return p !== "neutral"; }).length;
    const scopeValid = settings.track === "noncloud"
      ? settings.scopeTopics.length > 0
      : cloudCount > 0;
    if (!scopeValid) return false;
    return filterQuestions(settings).length > 0;
  }

  /**
   * The set of domain ids that have at least one question for the given
   * provider selection (difficulty/type-agnostic). Used by the setup UI
   * to hide domain chips that would be dead filters.
   */
  function getAvailableDomains(providerIds, mixedAllowed) {
    const available = new Set();
    CQA.data.getAllQuestions().forEach(function (q) {
      const matches = q.providers.length > 1
        ? (mixedAllowed && q.providers.every(function (p) { return providerIds.includes(p); }))
        : providerIds.includes(q.providers[0]);
      if (matches) {
        q.domains.forEach(function (d) { available.add(d); });
      }
    });
    return available;
  }

  /**
   * Start a new quiz session from the current settings.
   * Returns { ok: true, total } or { ok: false, reason } when nothing matches.
   * Resets score/streak/breakdown; keeps the user's setup choices.
   */
  function startSession() {
    const settings = CQA.state.get().settings;
    const pool = filterQuestions(settings);
    if (pool.length === 0) {
      return {
        ok: false,
        reason: CQA.i18n.t("placeholder.zeroMatch"),
      };
    }

    // Adaptive selection: when the pool is bigger than the quiz and we
    // have performance data, oversample questions from weak domains.
    const domainPerformance = CQA.state.get().performance.domains;
    let questions;
    if (settings.adaptive && pool.length > settings.questionCount) {
      questions = weightedSample(pool, settings.questionCount, function (q) {
        return questionWeight(q, domainPerformance);
      });
    } else {
      questions = shuffle(pool).slice(0, settings.questionCount);
    }

    CQA.state.resetSession();
    const session = CQA.state.get().session;
    session.active = true;
    session.questions = shuffle(questions);
    session.currentIndex = 0;
    session.awaitingNext = false;
    session.finished = false;
    session.mistakes = [];
    session.optionOrders = buildOptionOrders(session.questions);

    return { ok: true, total: session.questions.length, requested: settings.questionCount };
  }

  /* ----- Daily challenge ----- */

  const DAILY_QUESTION_COUNT = 10;

  /** Small deterministic PRNG (mulberry32) — good enough for shuffling. */
  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Numeric seed for today's local date: 2026-07-12 → 20260712. */
  function todaySeed() {
    const now = new Date();
    return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  }

  /**
   * Start today's daily challenge: a deterministic, seeded pick from the
   * full question pool — same date, same quiz, on any machine, no server.
   * Ignores setup filters and adaptive weighting so everyone gets the
   * same set; study/exam mode still applies.
   */
  function startDailyChallenge() {
    const pool = CQA.data.getAllQuestions()
      .slice()
      .sort(function (a, b) { return a.id.localeCompare(b.id); }); // stable base order
    if (pool.length === 0) {
      return { ok: false, reason: CQA.i18n.t("placeholder.zeroMatch") };
    }
    const rng = mulberry32(todaySeed());
    const questions = shuffle(pool, rng).slice(0, DAILY_QUESTION_COUNT);

    CQA.state.resetSession();
    const session = CQA.state.get().session;
    session.active = true;
    session.questions = questions;
    session.currentIndex = 0;
    session.awaitingNext = false;
    session.finished = false;
    session.mistakes = [];
    session.isDaily = true;
    session.optionOrders = buildOptionOrders(session.questions);

    return { ok: true, total: questions.length };
  }

  /** The mistakes recorded in the current/last session. */
  function getMistakes() {
    return CQA.state.get().session.mistakes.slice();
  }

  /**
   * Start a retry session built only from the questions answered
   * incorrectly in the current/last session (a question is answered at
   * most once per session, so the set is duplicate-free by construction).
   */
  function startRetrySession() {
    const mistakes = CQA.state.get().session.mistakes;
    if (mistakes.length === 0) {
      return { ok: false, reason: CQA.i18n.t("placeholder.noMistakesToRetry") };
    }
    const questions = shuffle(mistakes.map(function (m) { return m.question; }));

    CQA.state.resetSession();
    const session = CQA.state.get().session;
    session.active = true;
    session.questions = questions;
    session.currentIndex = 0;
    session.awaitingNext = false;
    session.finished = false;
    session.mistakes = [];
    session.isRetry = true;
    session.optionOrders = buildOptionOrders(session.questions);

    return { ok: true, total: questions.length };
  }

  /* ======================================================================
     Session flow
     ====================================================================== */

  function getCurrentQuestion() {
    const session = CQA.state.get().session;
    if (!session.active) return null;
    return session.questions[session.currentIndex] || null;
  }

  function isLastQuestion() {
    const session = CQA.state.get().session;
    return session.currentIndex >= session.questions.length - 1;
  }

  /**
   * The option indices that constitute the correct answer, for any type.
   * (True/False options are always ["True", "False"], so true → index 0.)
   */
  function correctOptionIndices(question) {
    switch (question.type) {
      case modes.MULTIPLE_CHOICE:
        return [question.correctAnswer];
      case modes.TRUE_FALSE:
        return [question.correctAnswer ? 0 : 1];
      case modes.MULTI_SELECT:
        return question.correctAnswer.slice().sort(function (a, b) { return a - b; });
      default:
        return [];
    }
  }

  /** Compare the user's selected option indices against the correct set. */
  function evaluate(question, selectedIndices) {
    const correct = correctOptionIndices(question);
    // Dedupe defensively — a selection should never count twice.
    const selected = Array.from(new Set(selectedIndices))
      .sort(function (a, b) { return a - b; });
    const isCorrect = selected.length === correct.length &&
      selected.every(function (v, i) { return v === correct[i]; });
    return { isCorrect: isCorrect, correctIndices: correct };
  }

  /**
   * Submit an answer for the current question: evaluate it, record score,
   * confidence and per-provider/per-domain counters, remember mistakes
   * for review. `isUnsure` is the user's "Not sure" flag.
   * Returns { isCorrect, correctIndices, isLast } for the renderer.
   */
  function submitAnswer(selectedIndices, isUnsure) {
    const session = CQA.state.get().session;
    const question = getCurrentQuestion();
    if (!question || session.awaitingNext) return null;

    const result = evaluate(question, selectedIndices);
    CQA.state.recordAnswer(question, result.isCorrect, isUnsure === true);
    if (!result.isCorrect) {
      // Preserve everything review mode needs: the full question (with
      // explanation, providers, domains, tooltip terms), what the user
      // picked, what would have been correct, and their confidence.
      session.mistakes.push({
        question: question,
        selectedIndices: selectedIndices.slice(),
        correctIndices: result.correctIndices,
        wasUnsure: isUnsure === true,
      });
    }
    session.awaitingNext = true;

    return {
      isCorrect: result.isCorrect,
      correctIndices: result.correctIndices,
      isLast: isLastQuestion(),
    };
  }

  /**
   * Advance to the next question. Returns the new current question,
   * or null when the session is finished.
   */
  function advance() {
    const session = CQA.state.get().session;
    if (!session.active) return null;
    session.awaitingNext = false;
    session.notSureActive = false; // confidence flag resets per question
    session.questionTimedOut = false; // per-question timer flag resets per question

    if (isLastQuestion()) {
      session.finished = true;
      session.active = false;
      // Freeze a completion record now, at the exact moment the session
      // ends — the certificate module reads only this, never live
      // settings, so it can't be affected by anything the user does
      // afterward (including resetting or reconfiguring setup).
      CQA.state.get().completion = buildCompletionRecord();
      return null;
    }
    session.currentIndex += 1;
    return getCurrentQuestion();
  }

  /** Immutable snapshot of the just-finished session, for the certificate. */
  function buildCompletionRecord() {
    const state = CQA.state.get();
    const settings = state.settings;
    return {
      summary: getSummary(),
      track: settings.track,
      providers: settings.providers.slice(),
      scopeTopics: settings.scopeTopics.slice(),
      domains: settings.domains.slice(),
      difficulty: settings.difficulty,
      mode: settings.mode,
      questionCount: settings.questionCount,
      isRetry: state.session.isRetry === true,
      isDaily: state.session.isDaily === true,
      completedAt: new Date().toISOString(),
    };
  }

  /* ======================================================================
     Summary
     ====================================================================== */

  /** Turn a counters map ({id: {answered, correct}}) into labeled rows. */
  function breakdownRows(counters, registry) {
    return registry
      .filter(function (item) { return counters[item.id]; })
      .map(function (item) {
        const c = counters[item.id];
        return {
          id: item.id,
          label: item.label,
          answered: c.answered,
          correct: c.correct,
          accuracy: Math.round((c.correct / c.answered) * 100),
        };
      });
  }

  /**
   * The domain that hurt the most: most wrong answers, ties broken by
   * lower accuracy. Null when every answer was correct.
   */
  function findHardestDomain(domainRows) {
    let worst = null;
    domainRows.forEach(function (row) {
      const wrong = row.answered - row.correct;
      if (wrong === 0) return;
      if (!worst || wrong > worst.wrong ||
          (wrong === worst.wrong && row.accuracy < worst.accuracy)) {
        worst = { id: row.id, label: row.label, wrong: wrong, accuracy: row.accuracy };
      }
    });
    return worst;
  }

  /** Turn a raw { answered, correct } counter into a summary row. */
  function confidenceRow(counter) {
    return {
      answered: counter.answered,
      correct: counter.correct,
      accuracy: counter.answered > 0
        ? Math.round((counter.correct / counter.answered) * 100)
        : 0,
    };
  }

  /** End-of-session summary for the renderer. */
  function getSummary() {
    const state = CQA.state.get();
    const score = state.score;
    const domains = breakdownRows(state.breakdown.domains, CQA.data.getDomains());
    return {
      points: score.points,
      answered: score.answered,
      correct: score.correct,
      accuracy: score.answered > 0 ? Math.round((score.correct / score.answered) * 100) : 0,
      bestStreak: score.bestStreak,
      mistakes: state.session.mistakes.length,
      isRetry: state.session.isRetry === true,
      isDaily: state.session.isDaily === true,
      providers: breakdownRows(state.breakdown.providers, CQA.data.getProviders()),
      domains: domains,
      hardestDomain: findHardestDomain(domains),
      confidence: {
        sure: confidenceRow(state.confidence.sure),
        unsure: confidenceRow(state.confidence.unsure),
      },
    };
  }

  return {
    filterQuestions,
    isReadyToStart,
    getAvailableDomains,
    startSession,
    startRetrySession,
    startDailyChallenge,
    getMistakes,
    getCurrentQuestion,
    submitAnswer,
    advance,
    getSummary,
  };
})();
