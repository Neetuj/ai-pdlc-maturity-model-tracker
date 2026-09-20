# AI-PDLC Maturity Model Tracker

A shared, objective way for leaders to see where AI is actually changing how work gets done across the product development lifecycle (PDLC) — and where it's still just conversation.

## The problem

AI adoption gets discussed in a lot of rooms by a lot of leaders, but the conversation is largely subjective: everyone has an anecdote, nobody has a shared scale. One leader's "we're pretty advanced with AI" means something completely different from another's. Without a common maturity language, prioritization defaults to whoever tells the best story, not where the real opportunity is.

The deeper issue is that most organizations do not have a systematic way to break the AI transformation problem down into operational capabilities, measure the real outcomes they are trying to improve, and then scale what works without losing governance or quality. The result is a patchwork of pilots, isolated wins, and vague claims that "AI is helping" without clear proof of business value.

## Mission

Help leaders diagnose where AI can meaningfully improve the product development lifecycle, prioritize the highest-value capabilities, measure the real outcomes they are moving, and scale adoption in a structured, repeatable way across the organization.

## Vision

A common, evidence-based maturity model that any leader can use to score their own domain, see it alongside everyone else's, and make the case for where to invest next — replacing opinion with a shared, comparable scale. The measure of success is not whether people are using AI, but whether the work is faster, more reliable, more customer-friendly, and more scalable as the org moves from manual work toward AI-native execution.

## Background

Most transformation programs fail not because they lack ideas, but because they lack a way to connect AI experiments to business outcomes. Leaders know the big picture — better speed, quality, customer experience, resilience, and capacity — but they do not have a practical structure for breaking that big picture into the operational capabilities that actually create value. This tracker is designed to provide that structure: a common language for maturity, a way to identify the real bottlenecks, and a method for measuring whether portfolio-level progress is translating into business impact.

## Goal

Give leaders a fast way to self-assess AI maturity across every stage of the product development lifecycle, and a structured way to prioritize where AI investment will have the most impact — without requiring a full-time analyst to build the case.

The current prototype also supports a richer operating model: the org defines a shared capability baseline, teams can extend it with team-specific capabilities, and leadership can filter the tracker by org, domain, team, and view to see the right slice of data at the right level.

## Who it's for

Leaders who own a full remit — engineering, product, delivery, CX, incidents, resilience, their own org — scoring their whole domain, not split by profession. One leader, one Org/Domain, covering all 7 PDLC stages.

This includes leaders operating across multiple teams who need both a common org baseline and a local team-specific view without losing comparability.

## What it solves

- **Subjectivity** — replaces "I think we're doing okay with AI" with a defined 5-level maturity scale (L1 Manual → L5 AI-Native) scored against fixed anchors, so scores are comparable across leaders and orgs.
- **Problem decomposition** — breaks the AI transformation challenge into stage-level and capability-level views so leaders can identify the exact workflow bottlenecks and business outcomes they are trying to improve, instead of debating AI in the abstract.
- **Outcome tracking** — focuses on the real metrics that matter: cycle time, quality, customer experience, operational efficiency, support resolution, and capacity gains, not just tool usage or adoption activity.
- **Analysis paralysis** — a two-tier model keeps the floor low (a fast pulse across all 7 stages) and the ceiling high (a full six-axis capability scoring, but only where a leader chooses to drill in).
- **Where to invest** — a transparent priority formula (time spent × frequency × AI potential × scalability, adjusted for risk and feasibility) turns raw scores into a ranked, defensible investment shortlist instead of a gut call.
- **Build-once-vs-leave-to-teams** — a placement model (Central / Team-Specific / Hybrid) driven by four yes/no questions, so leadership knows what's worth building centrally.
- **Systematic scaling** — gives leaders a repeatable way to move from diagnosis to pilot to scale to measurable business value, rather than isolated AI experiments.

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

The real score of this work is not enthusiasm, dashboard traffic, or AI tool usage. It is whether AI is materially improving how work gets done and whether the organization is systematically moving from manual/fragile execution to more scalable, reliable, and customer-friendly operating models.

### Outcome-focused metrics (primary)
These are the metrics the tool should prioritize because they reflect the actual business problem being solved:

- Cycle time reduction for planning, build, review, release, support, and incident resolution
- Quality improvement: defect escape rate, rework rate, test pass rate, change failure rate
- Customer experience impact: onboarding time, time to resolve tickets, CSAT, first-contact resolution, time to value
- Operational efficiency: hours saved per workflow, backlog reduction, manual effort removed, staff capacity freed for higher-value work
- Reliability and resilience: incident rate, MTTR, SLO attainment, production stability, governance exception rate
- Scale and recurrence: percentage of workflows standardized, volume moved from manual to automated, % of AI-supported work with quality guardrails and human review

### Leading indicators (early signals of progress)
These help leaders know whether the transformation is moving in the right direction before the lagging business results fully show up:

- Maturity movement per stage, per Org/Domain, over time (L1 → L5)
- Distribution of capabilities across P0/P1/P2 priority tiers
- Pilot → Scaled conversion rate (capabilities that moved from `status: Piloting` to `status: Scaled`)
- Capability coverage: percentage of priority capabilities with a defined baseline, target state, and owner
- Baseline-to-target gap closure on selected capabilities

### Lagging indicators (proof of value)
These are the stronger proof points that the AI transformation is actually solving the business problem:

- Before/after impact (`baseline` vs `result`) across scaled capabilities — the leadership-ready proof-of-productivity view
- Improvement in ticket resolution time, onboarding time, release cycle time, and incident MTTR
- Reduction in rework, defects, or manual work for prioritized capabilities
- Measurable throughput or quality gains after a capability reaches maturity L3/L4/L5

### Initiative health metrics (secondary, not the headline score)
These still matter, but they are support metrics, not the primary objective:

- Adoption: number of leaders / Org-Domains with a logged Stage Pulse
- Coverage: percentage of the 7 stages pulsed per leader
- Consistency: variance in maturity scoring narrowing across leaders once everyone scores against the same anchors
- Governance health: how many capabilities have owners, target states, review cadence, and measurable success criteria

The central principle is simple: leadership should judge this initiative by real outcomes, not by the number of AI tools used or how many people filled in a form.

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
