/**
 * state.js — Application state.
 *
 * Single in-memory store for everything the app tracks: quiz settings,
 * the active quiz session, score/streak, per-provider / per-domain
 * session counters, confidence tracking, and lifetime (page-visit)
 * performance used for adaptive question selection and the progress
 * bars. All state lives in browser memory only — no backend, no
 * persistence. No DOM access and no quiz rules here.
 */

window.CQA = window.CQA || {};

CQA.state = (function () {
  "use strict";

  const POINTS_PER_CORRECT = 10;

  /** Initial state factory — one place defines the full state shape. */
  function createInitialState() {
    return {
      settings: {
        track: null,                          // "cloud" | "noncloud" | "mixed" — setup flow step 1
        scopeTopics: [],                      // non-cloud topic (domain-family) ids from step 2
        providers: [],                        // provider ids — derived from track + scope
        domains: [],                          // scopeTopics ∪ focus areas; empty = all domains
        questionTypes: [
          CQA.data.questionModes.MULTIPLE_CHOICE,
          CQA.data.questionModes.TRUE_FALSE,
          CQA.data.questionModes.MULTI_SELECT,
        ],
        difficulty: "beginner",
        mixed: false,                         // allow cross-provider questions
        questionCount: 10,
        mode: "study",                        // "study" (instant feedback) | "exam" (feedback at end)
        adaptive: true,                       // favor weak domains when sampling
      },
      session: {
        active: false,
        questions: [],       // randomized questions queued for this run
        currentIndex: 0,
        awaitingNext: false, // answer submitted, waiting for "Next"
        finished: false,
        isRetry: false,
        isDaily: false,
        notSureActive: false, // "Not sure" flag for the current question
        optionOrders: {},    // { questionId: [displayPos → original option index] }
        mistakes: [],        // [{ question, selectedIndices, correctIndices, wasUnsure }]
      },
      score: {
        points: 0,
        correct: 0,
        answered: 0,
        streak: 0,
        bestStreak: 0,
      },
      breakdown: {
        providers: {},       // { azure: { answered, correct }, ... } — this session
        domains: {},         // { networking: { answered, correct }, ... } — this session
      },
      confidence: {
        sure:   { answered: 0, correct: 0 },  // answers not flagged "Not sure"
        unsure: { answered: 0, correct: 0 },  // answers flagged "Not sure"
      },
      // Lifetime counters for this page visit — survive resetSession() so
      // adaptive selection and the progress bars can learn across sessions.
      performance: {
        providers: {},
        domains: {},
      },
      // Frozen snapshot of the most recently COMPLETED session, written
      // once by CQA.engine when a session finishes (see quiz-engine.js
      // buildCompletionRecord/advance). null until a session actually
      // finishes; cleared again by resetSession() at the start of the
      // next session. The certificate module reads only from here, never
      // from live settings/session state, so it can't reflect changes
      // made after the quiz ended.
      completion: null,
    };
  }

  let state = createInitialState();

  function get() {
    return state;
  }

  /** Merge a partial settings object into state.settings. */
  function updateSettings(partial) {
    Object.assign(state.settings, partial);
  }

  /** Increment an { answered, correct } counter inside a counters map. */
  function bumpCounter(counters, key, isCorrect) {
    if (!counters[key]) counters[key] = { answered: 0, correct: 0 };
    counters[key].answered += 1;
    if (isCorrect) counters[key].correct += 1;
  }

  /**
   * Record an evaluated answer: score, streak, confidence bucket, session
   * counters, and lifetime performance (a cross-provider question counts
   * for each provider it involves).
   */
  function recordAnswer(question, isCorrect, isUnsure) {
    const score = state.score;
    score.answered += 1;
    if (isCorrect) {
      score.correct += 1;
      score.points += POINTS_PER_CORRECT;
      score.streak += 1;
      if (score.streak > score.bestStreak) score.bestStreak = score.streak;
    } else {
      score.streak = 0;
    }

    const bucket = isUnsure ? state.confidence.unsure : state.confidence.sure;
    bucket.answered += 1;
    if (isCorrect) bucket.correct += 1;

    question.providers.forEach(function (p) {
      bumpCounter(state.breakdown.providers, p, isCorrect);
      bumpCounter(state.performance.providers, p, isCorrect);
    });
    question.domains.forEach(function (d) {
      bumpCounter(state.breakdown.domains, d, isCorrect);
      bumpCounter(state.performance.domains, d, isCorrect);
    });
  }

  /**
   * Reset score, breakdown, confidence and session — keeping the user's
   * setup choices and the lifetime performance counters.
   */
  function resetSession() {
    const settings = state.settings;
    const performance = state.performance;
    state = createInitialState();
    state.settings = settings;
    state.performance = performance;
  }

  return {
    get,
    updateSettings,
    recordAnswer,
    resetSession,
  };
})();
