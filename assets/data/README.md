# Quiz Packs & Tooltip Dictionary

This folder holds the quiz content — plain data scripts, no logic.

## Packs (756 questions total)

| File | Pack id | Questions |
| --- | --- | --- |
| `questions-azure.js` / `questions-azure-2.js` | azure-core / azure-extended | 12 + 25 |
| `questions-aws.js` / `questions-aws-2.js` | aws-core / aws-extended | 12 + 25 |
| `questions-gcp.js` / `questions-gcp-2.js` | gcp-core / gcp-extended | 12 + 25 |
| `questions-mixed.js` / `questions-mixed-2.js` | mixed-cross-provider / mixed-extended | 9 + 20 |
| `questions-kubernetes.js` | kubernetes | 20 |
| `questions-networking.js` | networking-fundamentals | 20 |
| `questions-netsec.js` | firewall-netsec | 20 |
| `questions-dns-lb.js` | dns-lb | 12 |
| `questions-containers.js` | containers-registries | 12 |
| `questions-federation.js` | identity-federation | 10 |
| `questions-hybrid.js` | hybrid-connectivity | 10 |
| `questions-siem.js` | observability-siem | 10 |
| `questions-topup-core.js` / `-ops.js` / `-platform.js` / `-security.js` | topup-* | Phase 14 coverage top-up (→ 30/domain) |
| `questions-ai-fundamentals.js` | ai-fundamentals-practitioner | 22 |
| `questions-claude.js` | claude-usage-patterns | 22 |
| `questions-mcp.js` | mcp-concepts | 22 |
| `questions-ai-security.js` | ai-security | 24 |
| `questions-copilot.js` | copilot-workflows | 22 |
| `questions-local-agents.js` | local-agents | 22 |
| `questions-scripts-secrets.js` | scripts-and-secrets | 22 |
| `questions-hooks.js` | hooks-and-automation | 22 |
| `questions-ai-mixed.js` | ai-agents-mixed | 12 (cross-domain — every question tags exactly 2 of the 8 AI & Agents domains) |
| `questions-topup-netsec-p21.js` | topup-netsec-p21 | 16 |
| `questions-topup-kubernetes-p21.js` | topup-kubernetes-p21 | 9 |
| `questions-topup-containers-p21.js` | topup-containers-p21 | 10 |
| `questions-topup-dns-lb-p21.js` | topup-dns-lb-p21 | 8 |
| `questions-topup-hybrid-p21.js` | topup-hybrid-p21 | 10 |
| `questions-topup-federation-p21.js` | topup-federation-p21 | 7 |
| `questions-topup-siem-p21.js` | topup-siem-p21 | 6 |
| `questions-topup-ai-fundamentals-p21.js` | topup-ai-fundamentals-p21 | 12 |
| `questions-topup-claude-p21.js` | topup-claude-p21 | 12 |
| `questions-topup-mcp-p21.js` | topup-mcp-p21 | 10 |
| `questions-topup-ai-security-p21.js` | topup-ai-security-p21 | 5 |
| `questions-topup-copilot-p21.js` | topup-copilot-p21 | 12 |
| `questions-topup-local-agents-p21.js` | topup-local-agents-p21 | 12 |
| `questions-topup-scripts-secrets-p21.js` | topup-scripts-secrets-p21 | 10 |
| `questions-topup-hooks-p21.js` | topup-hooks-p21 | 11 |
| `tooltips.js` | — | ~99 glossary terms |

Each pack calls `CQA.data.registerPack()` and must be included in
`index.html` **after** `assets/js/data.js` and **before**
`assets/js/main.js`. The tooltip dictionary calls
`CQA.data.registerTooltips()` under the same rule.

The Phase 20 "AI & Agents" packs and the Phase 21 `topup-*-p21` packs
(340 questions total) are 100% bilingual — `question_he`/`options_he`/
`explanation_he` are populated on every question, unlike the older
extended/Phase-14-topup packs, which are English-only and fall back to
English when Hebrew is active.

**Phase 21 — coverage top-ups.** Rather than a raw domain-total count,
the metric that matters is the pool a user actually sees after filtering
by track + domain + difficulty in the setup UI — some domains looked
fine in total but collapsed to ~7-11 questions once filtered to a single
difficulty (e.g. Non-Cloud / Net Security / Advanced was only ~11). The
15 `topup-*-p21` packs each deepen one existing domain's thinnest
difficulty slice(s) — netsec, kubernetes, containers, dns-lb, hybrid,
federation, siem (all non-cloud/neutral-provider domains) and all 8
Phase 20 AI & Agents domains — without touching the engine, filters, or
any existing question. Every one of these 15 domains now has 12+
questions per difficulty tier in its realistic single-domain, Non-Cloud
filtered view.

## Taxonomy

**Providers**: `azure` | `aws` | `gcp` | `neutral`. The `neutral`
pseudo-provider marks provider-agnostic fundamentals (Kubernetes theory,
networking concepts, federation protocols, AI/agent topics). A question is:

- provider-specific — `providers: ["azure"]`
- cross-provider — `providers: ["azure","aws"]` (shown only when the
  Mixed toggle is on AND all listed providers are selected)
- neutral — `providers: ["neutral"]`

**Domains** (24, grouped in the setup UI via the `group` field in data.js):

- core: `identity`, `compute`, `networking`, `storage`
- ops: `governance`, `monitoring`, `cost`, `resiliency`
- platform: `kubernetes`, `containers`, `dns-lb`, `hybrid`
- security: `security`, `netsec`, `federation`, `siem`
- ai-agents (Phase 20): `ai-fundamentals`, `claude`, `mcp`, `ai-security`,
  `copilot`, `local-agents`, `scripts-secrets`, `hooks` — practical,
  technical AI/agent/security topics for engineers, not consumer AI
  trivia. All eight are also registered as Non-Cloud scope topics
  (`nonCloudTopicIds` in data.js), the same treatment as Kubernetes,
  networking, etc.

## Question schema

```js
{
  id: "az-net-001",              // unique across all packs
  providers: ["azure"],           // see taxonomy above
  domains: ["networking"],        // one or more domain ids from data.js
  difficulty: "beginner",         // "beginner" | "intermediate" | "advanced"
  type: "multiple-choice",        // "multiple-choice" | "true-false" | "multi-select"
  question: "…",
  options: ["…", "…"],            // ["True", "False"] for true-false
  correctAnswer: 0,               // multiple-choice: option index (number)
                                  // true-false:      boolean
                                  // multi-select:    array of option indices
  explanation: "…",               // teaches the concept, not just the answer
  resourceTitle: "…",             // label of the official docs page
  resourceUrl: "https://…",
  keywords: ["…"],                // search/filter tags
  tooltipTerms: ["NSG", "VNet"],  // terms present in the tooltip dictionary
}
```

Questions failing validation are skipped at load time with a console
warning — check the browser console after adding content.

## Tooltip entry schema

```js
{
  term: "NSG",                    // canonical term (lookup is case-insensitive)
  shortDefinition: "…",           // one or two sentences
  provider: "azure",              // optional — omit for cross-cloud/neutral terms
  relatedTerms: ["VNet"],         // optional — other terms in this dictionary
  docsLabel: "Network security groups", // optional — canonical docs page label
}
```

## Adding a new pack

1. Create `questions-<name>.js` calling `CQA.data.registerPack({ id, label, questions })`.
2. Add its `<script>` tag to `index.html` in the data block.
3. Add any new technical terms to `tooltips.js`.
4. New domains go in the `domains` registry in `assets/js/data.js` with a `group`.
