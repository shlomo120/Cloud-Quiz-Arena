# ☁️ Cloud Quiz Arena

A static, client-side quiz platform for cloud technologies — Azure, AWS, GCP,
Kubernetes, networking, security, and AI/agent tooling. No backend, no build
step, no sign-up: open `index.html` in a browser and start quizzing.

## Features

- **750+ questions** across Azure, AWS, GCP, Kubernetes, networking, DNS/load
  balancing, containers, identity federation, hybrid connectivity, SIEM, and
  an AI & Agents track (AI fundamentals, Claude, MCP, AI security, Copilot,
  local agents, scripts & secrets, hooks)
- **Study or Exam mode** — instant feedback per question, or results revealed
  only at the end
- **Daily Challenge** — a deterministic 10-question quiz seeded by the date,
  the same for everyone
- **Adaptive focus** — optionally oversample questions from your weaker domains
- **Cross-provider (Mixed) questions** for comparing services across clouds
- **Review Mistakes** — revisit every wrong answer with the full explanation,
  filterable by provider/domain, plus a "retry only what I got wrong" flow
- **Interactive glossary** — cloud/network terms in questions and explanations
  are tappable tooltips, with a full glossary browser
- **Completion certificates** — a printable, single-page certificate for a
  finished session, downloadable as a self-contained HTML file that matches
  the in-app design (same layout, typography and content — not a stripped-down
  fallback)
- **Bilingual** — full English/Hebrew UI with proper RTL support, including
  mixed Hebrew/English technical terminology
- **7 color palettes** — Default, Slate Blue, Amber Graphite, and four
  ecosystem-inspired presets (Azure Blue, AWS Ember, GCP Spectrum, K8s Blue) —
  each with an independent Light/Dark mode, so palette and mode never reset
  each other
- **Fully client-side** — quiz progress, theme/mode, language and lifetime
  performance stats persist via `localStorage`; nothing leaves the browser

## Getting started

No install, no dependencies.
Online Access: https://shlomo120.github.io/Cloud-Quiz-Arena/

Either:

- Open [`index.html`](index.html) directly in a browser, **or**
- Serve the folder with any static file server, e.g.:

  ```sh
  npx serve .
  # or
  python -m http.server 8080
  ```

  then visit `http://localhost:<port>/index.html`.

## Project structure

```
index.html              Single HTML entry point — all markup + <script> load order
assets/
  css/
    tokens.css           Design tokens — colors, spacing, typography, and the
                          7 color palettes (each with a dark + light variant)
    main.css             All component/layout styles
  js/
    main.js               App bootstrap — wires DOM events to engine/render
    state.js               CQA.state   — in-memory settings/session/score state
    quiz-engine.js          CQA.engine  — quiz rules: filtering, scoring, session flow
    data.js                 CQA.data    — provider/domain/difficulty registries
    render.js               CQA.render  — the only module that touches the DOM
    timer.js                 Session + per-question countdown timers
    i18n.js / i18n-strings.js   Translation engine + English/Hebrew dictionaries
    tooltip-manager.js       Glossary tooltip UI + glossary modal
    certificate.js           Completion certificate UI, print styling, and
                              standalone HTML export — one shared model for all three
    authoring.js             Dev-only content authoring tool (not loaded by index.html)
  data/
    questions-*.js          Quiz packs — one file per topic/provider
    tooltips.js              Glossary term dictionary
    README.md                 Question/tooltip schema and pack authoring guide
```

Every module hangs off a shared global `window.CQA` namespace and is loaded
via plain `<script>` tags in `index.html`, in dependency order — no bundler,
no framework.

## Adding quiz content

See [`assets/data/README.md`](assets/data/README.md) for the full question
schema, provider/domain taxonomy, and the steps to add a new question pack.

## Architecture notes

- **No backend, no build step.** Everything runs in the browser; state is
  kept in memory (`CQA.state`) and persisted only via `localStorage` (theme,
  mode, language, lifetime performance stats).
- **One rendering path per view.** `render.js` is the only module that
  touches the DOM; question content is read through a single
  language-aware helper (`CQA.data.localizeQuestion`) rather than duplicated
  per-language templates.
- **Pure quiz logic.** `quiz-engine.js` has no DOM access — question
  filtering, scoring, and session flow are unit-testable in isolation.
- **Palette and mode are independent state values.** Switching a color
  palette never resets the user's chosen Light/Dark mode, and vice versa;
  each palette defines its own light and dark token sets in `tokens.css`.
- **Certificate: one shared model, not three.** The live in-app certificate,
  the browser print output, and the downloaded standalone HTML all render
  from the same DOM structure and class names; print/export-specific paper
  styling is defined once (in `certificate.js`) and reused by both outputs,
  so they can't visually drift apart.
- **Content authoring** (`assets/js/authoring.js`) is a developer-only tool
  for importing/exporting/adding questions offline. It is intentionally not
  referenced by `index.html` — end users cannot add or edit content in this
  build.

## Browser support

Any evergreen browser (Chrome, Edge, Firefox, Safari). Uses standard ES5+
JavaScript, CSS custom properties and logical properties (for RTL) — no
transpilation required.

## License

No license file is currently included — all rights reserved by default. Add
a `LICENSE` file if you intend to open-source this project.
