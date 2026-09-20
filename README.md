# AI-PDLC Maturity Model Tracker

A shared, objective way for leaders to see where AI is actually changing how work gets done across the product development lifecycle (PDLC) — and where it's still just conversation.

## The problem

AI adoption gets discussed in a lot of rooms by a lot of leaders, but the conversation is largely subjective: everyone has an anecdote, nobody has a shared scale. One leader's "we're pretty advanced with AI" means something completely different from another's. Without a common maturity language, prioritization defaults to whoever tells the best story, not where the real opportunity is.

## Vision

A common, evidence-based maturity model that any leader can use to score their own domain, see it alongside everyone else's, and make the case for where to invest next — replacing opinion with a shared, comparable scale.

## Goal

Give leaders a fast way to self-assess AI maturity across every stage of the product development lifecycle, and a structured way to prioritize where AI investment will have the most impact — without requiring a full-time analyst to build the case.

The current prototype also supports a richer operating model: the org defines a shared capability baseline, teams can extend it with team-specific capabilities, and leadership can filter the tracker by org, domain, team, and view to see the right slice of data at the right level.

## Who it's for

Leaders who own a full remit — engineering, product, delivery, CX, incidents, resilience, their own org — scoring their whole domain, not split by profession. One leader, one Org/Domain, covering all 7 PDLC stages.

This includes leaders operating across multiple teams who need both a common org baseline and a local team-specific view without losing comparability.

## What it solves

- **Subjectivity** — replaces "I think we're doing okay with AI" with a defined 5-level maturity scale (L1 Manual → L5 AI-Native) scored against fixed anchors, so scores are comparable across leaders and orgs.
- **Analysis paralysis** — a two-tier model keeps the floor low (a fast pulse across all 7 stages) and the ceiling high (a full six-axis capability scoring, but only where a leader chooses to drill in).
- **Where to invest** — a transparent priority formula (time spent × frequency × AI potential × scalability, adjusted for risk and feasibility) turns raw scores into a ranked, defensible investment shortlist instead of a gut call.
- **Build-once-vs-leave-to-teams** — a placement model (Central / Team-Specific / Hybrid) driven by four yes/no questions, so leadership knows what's worth building centrally.

## How it works

Two tiers, both scored on the same L1–L5 maturity scale:

1. **Stage Pulse** — every leader does this for all 7 PDLC stages: current maturity, target maturity, and a pain/opportunity rating. Low effort, produces an org-wide heatmap.
2. **Capability deep-dive** — optional, for the 2–3 stages a leader's pulse flagged as worth a closer look. Six-axis scoring (time spent, frequency, AI potential, scalability, risk, feasibility) feeds a priority formula that ranks capabilities into P0/P1/P2 investment tiers, plus a placement recommendation (Central/Team-Specific/Hybrid).

The current implementation adds a third practical layer: a configurable capability library that is editable by leaders and can include both org-default and team-custom capabilities. The tracker can be filtered by org, domain, team, and view so leaders can see the org roll-up or a specific team slice without mixing the records together.

The full data model, scoring anchors, priority formula, and capability library are in [`docs/build-spec.md`](docs/build-spec.md) — that file is the technical source of truth; keep the scoring anchors and formula there unchanged so results stay comparable across every leader and every tool that implements this model.

The centerpiece view is a maturity/focus heatmap: PDLC stages across one axis, L1–L5 maturity across the other, with capabilities placed inside each stage and an overlay showing where productivity impact is highest — so a leader can see, for example, that they're L2 in customer onboarding and L1 in incident RCA, but incident RCA is consuming far more capacity, making it the bigger opportunity. The detailed tracker (spreadsheet or app) is the drill-down behind that visual, not a separate product.

## Current prototype features

- org / domain / team / view selectors for scope-aware analysis
- editable capability library grouped by lifecycle stage
- add and delete capability actions using a simple stage-card visual model
- org-default capabilities alongside team-custom capabilities
- included / N/A decisioning and must-have / should-have / optional need tier
- explicit status setting with the default starting at Not started
- a dedicated reference page at [`capability-library.html`](capability-library.html)

## Metrics

**Metrics the tool produces (for the org using it):**
- Maturity movement per stage, per Org/Domain, over time (L1 → L5)
- Distribution of capabilities across P0/P1/P2 priority tiers
- Pilot → Scaled conversion rate (capabilities that moved from `status: Piloting` to `status: Scaled`)
- Before/after impact (`baseline` vs `result`) across scaled capabilities — the leadership-ready proof-of-productivity view

**Metrics for the initiative itself (is this achieving its purpose):**
- Adoption: number of leaders / Org-Domains with a logged Stage Pulse
- Coverage: percentage of the 7 stages pulsed per leader
- Consistency: variance in maturity scoring narrowing across leaders once everyone scores against the same anchors — the direct measure of whether this is actually making the conversation more objective

## Repository structure

```
.
├── README.md              # this file — vision, goals, how it works
├── docs/
│   └── build-spec.md       # data model, scoring anchors, priority formula, capability library
├── LICENSE
└── (app/ or sheet/ — implementation, added next)
```

## Status

Early-stage, pre-implementation. The data model and scoring logic are defined; the tool (app or spreadsheet) is not yet built. See `docs/build-spec.md` for what's being built and `docs/build-spec.md#6-worked-example-rows-for-testing-the-build` for worked examples to validate any implementation against.

## Contributing

Not yet open for external contribution — this is being scaffolded first. A `CONTRIBUTING.md` will follow once the initial implementation lands.

## License

MIT — see [`LICENSE`](LICENSE). (Confirm this is the license you want before the repo goes public; MIT is a permissive default, not a fixed choice.)
