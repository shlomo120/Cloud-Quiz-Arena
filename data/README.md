# Quiz Packs & Tooltip Dictionary

This folder holds the quiz content — plain data scripts, no logic.

## Packs (254 questions total)

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
| `tooltips.js` | — | 78 glossary terms |

Each pack calls `CQA.data.registerPack()` and must be included in
`index.html` **after** `assets/js/data.js` and **before**
`assets/js/main.js`. The tooltip dictionary calls
`CQA.data.registerTooltips()` under the same rule.

## Taxonomy

**Providers**: `azure` | `aws` | `gcp` | `neutral`. The `neutral`
pseudo-provider marks provider-agnostic fundamentals (Kubernetes theory,
networking concepts, federation protocols). A question is:

- provider-specific — `providers: ["azure"]`
- cross-provider — `providers: ["azure","aws"]` (shown only when the
  Mixed toggle is on AND all listed providers are selected)
- neutral — `providers: ["neutral"]`

**Domains** (16, grouped in the setup UI via the `group` field in data.js):

- core: `identity`, `compute`, `networking`, `storage`
- ops: `governance`, `monitoring`, `cost`, `resiliency`
- platform: `kubernetes`, `containers`, `dns-lb`, `hybrid`
- security: `security`, `netsec`, `federation`, `siem`

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
