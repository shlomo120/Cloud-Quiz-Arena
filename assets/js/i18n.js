/**
 * i18n.js — Translation layer (English / Hebrew).
 *
 * A single, shared translation engine every other module reads through —
 * there is exactly one rendering path per piece of UI; only the string
 * source (English vs Hebrew dictionary) changes with the active language.
 *
 * Two lookup styles are supported:
 *   CQA.i18n.t(key, vars?)          — free-form UI strings, e.g. buttons,
 *                                     hints, sentence templates with
 *                                     {placeholders}.
 *   CQA.i18n.label(kind, id, fallback) — registry labels (providers,
 *                                     domains, difficulties, question
 *                                     types), keyed as "<kind>.<id>"
 *                                     (e.g. "domain.identity"). Falls
 *                                     back to the English data.js label
 *                                     (or the raw id) if no translation
 *                                     is registered, so nothing ever
 *                                     renders blank or "undefined".
 *
 * Strings are registered by assets/js/i18n-strings.js via
 * CQA.i18n.register({ en: {...}, he: {...} }) — this file only provides
 * the mechanism, not the content, so translations stay in one place.
 *
 * Static, textContent-only markup in index.html is translated
 * declaratively via data-i18n / data-i18n-placeholder / data-i18n-title /
 * data-i18n-aria-label attributes, applied by applyStaticTranslations().
 * Dynamically-built DOM (chips, summaries, certificates, tooltips…) calls
 * t()/label() directly inside its render functions instead — those
 * functions already re-run on state changes, and main.js also re-runs the
 * currently-visible ones whenever the language changes (see
 * CQA.i18n.onChange in main.js), so nothing goes stale.
 *
 * Language preference persists the same way the theme choice already
 * does — a small localStorage key — consistent with existing app
 * behavior, not a new persistence mechanism.
 */

window.CQA = window.CQA || {};

CQA.i18n = (function () {
  "use strict";

  const STORAGE_KEY = "cqa-lang";
  const SUPPORTED = ["en", "he"];
  const RTL_LANGS = ["he"];

  const dictionaries = { en: {}, he: {} };
  let lang = "en";
  const listeners = [];

  /** Merge additional { en: {...}, he: {...} } entries into the dictionaries. */
  function register(entries) {
    if (entries && entries.en) Object.assign(dictionaries.en, entries.en);
    if (entries && entries.he) Object.assign(dictionaries.he, entries.he);
  }

  /** Free-form UI string lookup with optional {placeholder} substitution. */
  function t(key, vars) {
    const dict = dictionaries[lang] || dictionaries.en;
    let str = dict[key];
    if (str == null) str = dictionaries.en[key];
    if (str == null) str = key; // visible-but-safe fallback, never throws
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", String(vars[k]));
      });
    }
    return str;
  }

  /** Registry label lookup: "<kind>.<id>", falling back to the English label/id. */
  function label(kind, id, fallback) {
    const key = kind + "." + id;
    const dict = dictionaries[lang];
    if (dict && dict[key] != null) return dict[key];
    if (dictionaries.en[key] != null) return dictionaries.en[key];
    return fallback != null ? fallback : id;
  }

  function getLang() {
    return lang;
  }

  function isRtl() {
    return RTL_LANGS.includes(lang);
  }

  /** Apply the language: <html lang/dir>, persist, notify listeners. */
  function setLang(newLang) {
    if (!SUPPORTED.includes(newLang)) return;
    lang = newLang;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", isRtl() ? "rtl" : "ltr");
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private mode / storage disabled — language just won't persist */
    }
    applyStaticTranslations();
    listeners.forEach(function (fn) { fn(lang); });
  }

  function loadSavedLang() {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
    setLang(SUPPORTED.includes(saved) ? saved : "en");
  }

  /** Subscribe to language changes (called after setLang applies the new language). */
  function onChange(fn) {
    listeners.push(fn);
  }

  /**
   * Translate every static, textContent-only element under `root` marked
   * with data-i18n / data-i18n-placeholder / data-i18n-title /
   * data-i18n-aria-label. Safe to call repeatedly (e.g. on every language
   * change) — it only ever overwrites the attributes/text it owns.
   */
  function applyStaticTranslations(root) {
    const scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    scope.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });
    scope.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });
  }

  return {
    register,
    t,
    label,
    getLang,
    isRtl,
    setLang,
    loadSavedLang,
    onChange,
    applyStaticTranslations,
  };
})();
