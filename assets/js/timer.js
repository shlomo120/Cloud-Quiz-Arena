/**
 * timer.js — Interval bookkeeping for the per-question and full-session
 * timers (Phase 19B).
 *
 * Pure timing logic only — no DOM access, no quiz rules. Owns exactly two
 * intervals, each in a single module-scoped variable: starting either one
 * always clears the previous instance first, so there can never be more
 * than one question interval or one session interval alive at once (no
 * duplicate intervals, no drift from stacked timers).
 *
 * main.js orchestrates *when* timers start/stop around the quiz flow
 * (session start, question render, answer, advance, reset) and supplies
 * the onTick/onExpire callbacks; render.js only ever receives plain
 * numbers to display. This mirrors the existing engine/render split —
 * CQA.timer reads/writes nothing in CQA.state itself.
 */

window.CQA = window.CQA || {};

CQA.timer = (function () {
  "use strict";

  const QUESTION_SECONDS = 60;

  let questionInterval = null;
  let questionRemaining = QUESTION_SECONDS;

  let sessionInterval = null;
  let sessionElapsed = 0;

  function clearQuestionInterval() {
    if (questionInterval !== null) {
      clearInterval(questionInterval);
      questionInterval = null;
    }
  }

  /**
   * (Re)start the 60-second per-question countdown, ticking once per
   * second. Always clears any previous question interval first. `onTick`
   * is called immediately with the starting value, then every second;
   * `onExpire` fires exactly once when the count reaches zero (the
   * interval is cleared before it's called, so it can't fire twice).
   */
  function startQuestionTimer(onTick, onExpire) {
    clearQuestionInterval();
    questionRemaining = QUESTION_SECONDS;
    onTick(questionRemaining);
    questionInterval = setInterval(function () {
      questionRemaining -= 1;
      if (questionRemaining <= 0) {
        questionRemaining = 0;
        onTick(questionRemaining);
        clearQuestionInterval();
        onExpire();
        return;
      }
      onTick(questionRemaining);
    }, 1000);
  }

  function stopQuestionTimer() {
    clearQuestionInterval();
  }

  function getQuestionRemaining() {
    return questionRemaining;
  }

  function clearSessionInterval() {
    if (sessionInterval !== null) {
      clearInterval(sessionInterval);
      sessionInterval = null;
    }
  }

  /**
   * Start the count-up session timer from zero, ticking once per second.
   * Always clears any previous session interval first.
   */
  function startSessionTimer(onTick) {
    clearSessionInterval();
    sessionElapsed = 0;
    onTick(sessionElapsed);
    sessionInterval = setInterval(function () {
      sessionElapsed += 1;
      onTick(sessionElapsed);
    }, 1000);
  }

  function stopSessionTimer() {
    clearSessionInterval();
  }

  function getSessionElapsed() {
    return sessionElapsed;
  }

  /** Stop both timers — the single cleanup call for session end/reset. */
  function stopAll() {
    clearQuestionInterval();
    clearSessionInterval();
  }

  return {
    QUESTION_SECONDS,
    startQuestionTimer,
    stopQuestionTimer,
    getQuestionRemaining,
    startSessionTimer,
    stopSessionTimer,
    getSessionElapsed,
    stopAll,
  };
})();
