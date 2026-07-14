/**
 * data.js — Quiz data registry.
 *
 * Holds provider/domain/difficulty metadata and acts as the registration
 * point for quiz packs and the tooltip dictionary. Quiz packs live in
 * assets/data/ and register themselves via CQA.data.registerPack();
 * the tooltip dictionary registers via CQA.data.registerTooltips().
 *
 * Question schema (every question object in a pack):
 *   id            string   unique, e.g. "az-net-001"
 *   providers     string[] one or more provider ids, e.g. ["azure","aws"]
 *   domains       string[] one or more domain ids, e.g. ["networking"]
 *   difficulty    string   "beginner" | "intermediate" | "advanced"
 *   type          string   "multiple-choice" | "true-false" | "multi-select"
 *   question      string   the prompt shown to the user (English, canonical)
 *   options       string[] answer options (["True","False"] for true-false)
 *   correctAnswer          multiple-choice: option index (number)
 *                          true-false:      boolean
 *                          multi-select:    array of option indices
 *   explanation   string   teaches the concept, not just the answer
 *   resourceTitle string   label of the reference documentation (always
 *                          English — it is the vendor doc page's own title)
 *   resourceUrl   string   link to official documentation
 *   keywords      string[] search/filter tags
 *   tooltipTerms  string[] terms in this question found in the tooltip
 *                          dictionary (rendered as interactive tooltips)
 *   question_he   string?  Hebrew translation of `question` (Phase 15)
 *   options_he    string[]? Hebrew translations of `options`, SAME ORDER
 *                          and length as `options` — index i here is the
 *                          Hebrew text for options[i], correctAnswer is
 *                          unaffected by language
 *   explanation_he string? Hebrew translation of `explanation`
 *   All three `_he` fields are optional; CQA.data.localizeQuestion(q, lang)
 *   is the one read-path every renderer uses, falling back to the
 *   English field when no translation exists yet. Per the Hebrew style
 *   guide, translated text keeps official product/service names
 *   (Azure, AWS, GCP, IAM, VNet, NSG, Kubernetes, Pod, …) in English.
 *
 * Tooltip entry schema:
 *   term               string   canonical term, e.g. "NSG" (never translated)
 *   shortDefinition    string   one or two sentences, English
 *   shortDefinition_he string?  Hebrew translation (Phase 15); read via
 *                               CQA.data.localizeTooltip(entry, lang)
 *   provider           string?  provider id if the term is provider-specific
 *   relatedTerms       string[]? other terms in the dictionary
 *   docsLabel          string?  label of the canonical docs page (English)
 *
 * No quiz logic belongs in this file — data definitions only.
 *
 * DEVELOPER NOTE — content taxonomy (Phases 10–11):
 *
 * Providers: azure | aws | gcp | neutral.
 *   "neutral" is a pseudo-provider for provider-agnostic fundamentals
 *   (Kubernetes concepts, networking theory, federation protocols, …).
 *   It behaves exactly like a provider everywhere — selection chip,
 *   engine filtering, badges, breakdowns — so NO schema change was
 *   needed: a question is provider-specific (["azure"]), cross-provider
 *   (["azure","aws"], shown only with the Mixed toggle), or neutral
 *   (["neutral"]).
 *
 * Domains (24), grouped for the setup UI via the `group` field:
 *   core:      identity, compute, networking, storage
 *   ops:       governance, monitoring, cost, resiliency
 *   platform:  kubernetes, containers, dns-lb, hybrid
 *   security:  security, netsec, federation, siem
 *   ai-agents: ai-fundamentals, claude, mcp, ai-security, copilot,
 *              local-agents, scripts-secrets, hooks (Phase 20)
 *
 * Question totals by pack:
 *   azure-core 12 + azure-extended 25 = 37   aws:  12 + 25 = 37
 *   gcp-core   12 + gcp-extended   25 = 37   mixed: 9 + 20 = 29
 *   kubernetes 20 · networking-fundamentals 20 · firewall-netsec 20
 *   dns-lb 12 · containers-registries 12 · identity-federation 10
 *   hybrid-connectivity 10 · observability-siem 10
 *   Cloud/platform/security subtotal: 254 questions (416 after the
 *   Phase 14 coverage expansion, which added 4 topup-* packs so every
 *   domain reaches 30 questions with 10+ at each difficulty).
 *
 *   Phase 20 — AI & Agents (all fully bilingual, see below):
 *   ai-fundamentals-practitioner 22 · claude-usage-patterns 22
 *   mcp-concepts 22 · ai-security 24 · copilot-workflows 22
 *   local-agents 22 · scripts-and-secrets 22 · hooks-and-automation 22
 *   ai-agents-mixed 12 (cross-domain, tagged with exactly 2 of the
 *   domains above) = 190 questions.
 *
 *   Phase 21 — coverage top-ups (all fully bilingual): fixed thin
 *   filtered pools (e.g. Non-Cloud/Net Security/Advanced was ~11
 *   questions) by deepening the weakest domains rather than adding new
 *   ones. 15 topup-*-p21 packs, +150 questions total:
 *   netsec +16 (priority — the flagged example) · kubernetes +9 ·
 *   containers +10 · dns-lb +8 · hybrid +10 · federation +7 · siem +6 ·
 *   ai-fundamentals +12 · claude +12 · mcp +10 · ai-security +5 ·
 *   copilot +12 · local-agents +12 · scripts-secrets +10 · hooks +11.
 *   Every one of these 15 domains now clears 12+ questions per
 *   difficulty tier in its realistic Non-Cloud/single-domain filtered
 *   view (up from as few as 7-11). Cloud-native domains (identity,
 *   compute, storage, governance, monitoring, cost, resiliency) already
 *   cleared the 30-total/10-per-difficulty targets and were left as-is.
 *
 *   Grand total: 756 questions. Tooltip dictionary: ~99 terms.
 *
 * Phase 15 — bilingual content: all tooltip terms carry a Hebrew
 * shortDefinition_he. Full question translation (question_he/options_he/
 * explanation_he) is applied to the foundational core packs — azure-core,
 * aws-core, gcp-core, mixed-cross-provider (45 questions, the set every
 * learner sees regardless of which providers/domains they filter to) —
 * as a complete, production-quality example of the pattern, and to every
 * Phase 20/21 AI & Agents and coverage-topup question (340 questions,
 * 100% bilingual). The remaining ~371 cloud/platform/security extended
 * questions remain English-only for now and automatically fall back to
 * English text when Hebrew is active (see localizeQuestion) rather than
 * showing anything broken or blank; extending translation to the rest
 * of the bank means adding the same three `_he` fields to more question
 * objects, no code changes required.
 */

window.CQA = window.CQA || {};

CQA.data = (function () {
  "use strict";

  /**
   * Provider registry. Add new cloud providers here.
   * `colorToken` maps to a CSS variable defined in tokens.css.
   */
  const providers = [
    { id: "azure",   label: "Azure",   fullName: "Microsoft Azure", colorToken: "--color-azure" },
    { id: "aws",     label: "AWS",     fullName: "Amazon Web Services", colorToken: "--color-aws" },
    { id: "gcp",     label: "GCP",     fullName: "Google Cloud Platform", colorToken: "--color-gcp" },
    { id: "neutral", label: "Neutral", fullName: "Provider-neutral fundamentals", colorToken: "--color-neutral" },
  ];

  /** Display groups for the domain chips in the setup panel. */
  const domainGroups = [
    { id: "core",      label: "Core cloud" },
    { id: "ops",       label: "Operations" },
    { id: "platform",  label: "Platform & connectivity" },
    { id: "security",  label: "Security & identity" },
    { id: "ai-agents", label: "AI & Agents" },
  ];

  /** Knowledge domains a question can belong to (grouped for the UI). */
  const domains = [
    { id: "identity",   label: "Identity",     group: "core" },
    { id: "compute",    label: "Compute",      group: "core" },
    { id: "networking", label: "Networking",   group: "core" },
    { id: "storage",    label: "Storage",      group: "core" },
    { id: "governance", label: "Governance",   group: "ops" },
    { id: "monitoring", label: "Monitoring",   group: "ops" },
    { id: "cost",       label: "Cost",         group: "ops" },
    { id: "resiliency", label: "Resiliency",   group: "ops" },
    { id: "kubernetes", label: "Kubernetes",   group: "platform" },
    { id: "containers", label: "Containers",   group: "platform" },
    { id: "dns-lb",     label: "DNS & LB",     group: "platform" },
    { id: "hybrid",     label: "Hybrid",       group: "platform" },
    { id: "security",   label: "Security",     group: "security" },
    { id: "netsec",     label: "Net Security", group: "security" },
    { id: "federation", label: "Federation",   group: "security" },
    { id: "siem",       label: "SIEM",         group: "security" },
    // Phase 20 — AI & Agents: practical, technical AI/agent/security topics.
    // Provider-neutral like the platform/security non-cloud families above.
    { id: "ai-fundamentals", label: "AI Fundamentals",  group: "ai-agents" },
    { id: "claude",          label: "Claude",           group: "ai-agents" },
    { id: "mcp",             label: "MCP",              group: "ai-agents" },
    { id: "ai-security",     label: "AI Security",      group: "ai-agents" },
    { id: "copilot",         label: "Copilot",          group: "ai-agents" },
    { id: "local-agents",    label: "Local Agents",     group: "ai-agents" },
    { id: "scripts-secrets", label: "Scripts & Secrets", group: "ai-agents" },
    { id: "hooks",           label: "Hooks",            group: "ai-agents" },
  ];

  /** Question modes supported by the quiz engine. */
  const questionModes = Object.freeze({
    MULTIPLE_CHOICE: "multiple-choice",
    TRUE_FALSE: "true-false",
    MULTI_SELECT: "multi-select",
  });

  /** UI labels for question modes. */
  const questionModeLabels = [
    { id: questionModes.MULTIPLE_CHOICE, label: "Multiple Choice" },
    { id: questionModes.TRUE_FALSE,      label: "True / False" },
    { id: questionModes.MULTI_SELECT,    label: "Multi-Select" },
  ];

  /**
   * Setup-flow config: which domain families are offered as "Non-Cloud"
   * scope topics (Step 2 of the progressive setup). A lightweight mapping
   * layer — these are ordinary domain ids; no question metadata changed.
   */
  const nonCloudTopicIds = [
    "kubernetes", "networking", "netsec", "dns-lb",
    "containers", "federation", "hybrid", "siem",
    // Phase 20 — AI & Agents topics, same non-cloud/neutral-provider treatment.
    "ai-fundamentals", "claude", "mcp", "ai-security",
    "copilot", "local-agents", "scripts-secrets", "hooks",
  ];

  /** Difficulty levels. */
  const difficulties = [
    { id: "beginner",     label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced",     label: "Advanced" },
  ];

  const validProviderIds = providers.map(function (p) { return p.id; });
  const validDomainIds = domains.map(function (d) { return d.id; });
  const validDifficultyIds = difficulties.map(function (d) { return d.id; });
  const validTypes = Object.values(questionModes);

  /** Registered quiz packs: { id, label, questions } */
  const packs = [];

  /** All registered questions, keyed by question id (guards duplicates). */
  const questionsById = {};

  /** Tooltip dictionary, keyed by lower-cased term. */
  const tooltipsByTerm = {};

  /**
   * Structural validation against the question schema. Returns an array
   * of human-readable problem strings — empty when the question is valid.
   * Does NOT check id uniqueness (see hasQuestion / addQuestions).
   */
  function validateQuestion(q) {
    if (!q || typeof q !== "object") return ["question is not an object"];
    const problems = [];

    if (!q.id || typeof q.id !== "string") {
      problems.push("id: a non-empty string is required");
    }
    if (!Array.isArray(q.providers) || q.providers.length === 0) {
      problems.push("providers: a non-empty array is required");
    } else {
      const bad = q.providers.filter(function (p) { return !validProviderIds.includes(p); });
      if (bad.length > 0) {
        problems.push("providers: unknown value(s) \"" + bad.join("\", \"") +
          "\" (valid: " + validProviderIds.join(", ") + ")");
      }
    }
    if (!Array.isArray(q.domains) || q.domains.length === 0) {
      problems.push("domains: a non-empty array is required");
    } else {
      const bad = q.domains.filter(function (d) { return !validDomainIds.includes(d); });
      if (bad.length > 0) {
        problems.push("domains: unknown value(s) \"" + bad.join("\", \"") +
          "\" (valid: " + validDomainIds.join(", ") + ")");
      }
    }
    if (!validDifficultyIds.includes(q.difficulty)) {
      problems.push("difficulty: must be one of " + validDifficultyIds.join(", "));
    }
    if (!validTypes.includes(q.type)) {
      problems.push("type: must be one of " + validTypes.join(", "));
    }
    if (!q.question || typeof q.question !== "string") {
      problems.push("question: text is required");
    }
    if (!Array.isArray(q.options) || q.options.length < 2 ||
        !q.options.every(function (o) { return typeof o === "string" && o.length > 0; })) {
      problems.push("options: at least 2 non-empty strings are required");
    } else {
      const optionCount = q.options.length;
      const isValidIndex = function (v) {
        return typeof v === "number" && Number.isInteger(v) && v >= 0 && v < optionCount;
      };
      if (q.type === questionModes.MULTIPLE_CHOICE && !isValidIndex(q.correctAnswer)) {
        problems.push("correctAnswer: multiple-choice needs one option index (0–" +
          (optionCount - 1) + ")");
      }
      if (q.type === questionModes.MULTI_SELECT &&
          (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0 ||
           !q.correctAnswer.every(isValidIndex))) {
        problems.push("correctAnswer: multi-select needs a non-empty array of option indices (0–" +
          (optionCount - 1) + ")");
      }
    }
    if (q.type === questionModes.TRUE_FALSE && typeof q.correctAnswer !== "boolean") {
      problems.push("correctAnswer: true-false needs a boolean (true or false)");
    }
    if (!q.explanation || typeof q.explanation !== "string") {
      problems.push("explanation: text is required");
    }
    // Bilingual fields are optional, but if present must mirror the
    // English options array exactly — a mismatch would silently corrupt
    // the answer mapping when Hebrew is the active language. Soft check:
    // logged, not fatal, so a translation typo can't take down the pack.
    if (Array.isArray(q.options) && Array.isArray(q.options_he) &&
        q.options_he.length !== q.options.length) {
      console.warn("CQA.data: '" + (q.id || "?") + "' options_he length (" +
        q.options_he.length + ") does not match options length (" +
        q.options.length + ") — Hebrew answers may be mismatched.");
    }

    return problems;
  }

  /** Is a question with this id already registered? */
  function hasQuestion(id) {
    return Object.prototype.hasOwnProperty.call(questionsById, id);
  }

  /**
   * Register a quiz pack: { id, label, questions: [<question schema>] }.
   * Invalid or duplicate questions are skipped with a console warning.
   */
  function registerPack(pack) {
    if (!pack || !pack.id || !Array.isArray(pack.questions)) {
      throw new Error("CQA.data.registerPack: pack must include id and questions[]");
    }
    const accepted = pack.questions.filter(function (q) {
      const problems = validateQuestion(q);
      if (q && q.id && hasQuestion(q.id)) problems.push("duplicate id");
      if (problems.length > 0) {
        console.warn("CQA.data: skipping question '" + ((q && q.id) || "?") +
          "' in pack '" + pack.id + "': " + problems.join("; "));
        return false;
      }
      questionsById[q.id] = q;
      return true;
    });
    packs.push({ id: pack.id, label: pack.label || pack.id, questions: accepted });
  }

  /**
   * Merge questions into the pool at runtime (importer / add-question
   * form). Nothing is persisted — imports live for this page visit.
   * Returns a report:
   *   { added: [ids], duplicates: [ids], invalid: [{ ref, problems }] }
   */
  function addQuestions(list, sourceLabel) {
    if (!Array.isArray(list)) {
      throw new Error("CQA.data.addQuestions: expected an array of questions");
    }
    const report = { added: [], duplicates: [], invalid: [] };
    const accepted = [];

    list.forEach(function (q, index) {
      const ref = (q && q.id) ? q.id : "item " + (index + 1);
      const problems = validateQuestion(q);
      if (problems.length > 0) {
        report.invalid.push({ ref: ref, problems: problems });
        return;
      }
      if (hasQuestion(q.id)) {
        report.duplicates.push(q.id);
        return;
      }
      questionsById[q.id] = q;
      accepted.push(q);
      report.added.push(q.id);
    });

    if (accepted.length > 0) {
      packs.push({
        id: "custom-" + Date.now(),
        label: sourceLabel || "Imported pack",
        questions: accepted,
      });
    }
    return report;
  }

  /**
   * Register tooltip dictionary entries:
   * [{ term, shortDefinition, provider?, relatedTerms?, docsLabel? }]
   */
  function registerTooltips(entries) {
    if (!Array.isArray(entries)) {
      throw new Error("CQA.data.registerTooltips: expected an array of entries");
    }
    entries.forEach(function (entry) {
      if (!entry.term || !entry.shortDefinition) {
        console.warn("CQA.data: skipping tooltip entry without term/shortDefinition");
        return;
      }
      tooltipsByTerm[entry.term.toLowerCase()] = entry;
    });
  }

  /* ----- Accessors ----- */

  function getProviders() { return providers.slice(); }
  function getDomains() { return domains.slice(); }
  function getDomainGroups() { return domainGroups.slice(); }

  /** Domain objects offered as Non-Cloud scope topics, in registry order. */
  function getNonCloudTopics() {
    return domains.filter(function (d) { return nonCloudTopicIds.includes(d.id); });
  }
  function getDifficulties() { return difficulties.slice(); }
  function getQuestionModeLabels() { return questionModeLabels.slice(); }
  function getPacks() { return packs.slice(); }

  /** All registered questions across packs (each question appears once). */
  function getAllQuestions() {
    return Object.values(questionsById);
  }

  /**
   * The single localization read-path for question content (Phase 15).
   * Returns { question, options, explanation, resourceTitle } in the
   * requested language, falling back to English for any field whose
   * Hebrew counterpart (question_he / options_he / explanation_he) is
   * absent — most questions are English-only so far; translated ones
   * carry the extra fields alongside the originals rather than as
   * separate objects, keeping exactly one question per id.
   *
   * resourceTitle is intentionally never translated: it is the actual
   * title of the (English) vendor documentation page being linked to,
   * so translating it would misrepresent what the link points to.
   *
   * correctAnswer/options length/order are untouched by language — a
   * translated options_he array must mirror options index-for-index,
   * which is how every translated question in this codebase is written.
   */
  function localizeQuestion(question, lang) {
    const he = lang === "he";
    return {
      question: (he && question.question_he) || question.question,
      options: (he && question.options_he) || question.options,
      explanation: (he && question.explanation_he) || question.explanation,
      resourceTitle: question.resourceTitle,
    };
  }

  /** Case-insensitive tooltip lookup; returns undefined when unknown. */
  function getTooltip(term) {
    return term ? tooltipsByTerm[term.toLowerCase()] : undefined;
  }

  /** Localized short definition for a tooltip entry, with English fallback. */
  function localizeTooltip(entry, lang) {
    return (lang === "he" && entry.shortDefinition_he) || entry.shortDefinition;
  }

  function getAllTooltips() {
    return Object.values(tooltipsByTerm);
  }

  return {
    questionModes,
    registerPack,
    registerTooltips,
    validateQuestion,
    hasQuestion,
    addQuestions,
    getProviders,
    getDomains,
    getDomainGroups,
    getNonCloudTopics,
    getDifficulties,
    getQuestionModeLabels,
    getPacks,
    getAllQuestions,
    localizeQuestion,
    getTooltip,
    localizeTooltip,
    getAllTooltips,
  };
})();
