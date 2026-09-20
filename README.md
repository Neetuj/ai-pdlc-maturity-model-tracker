# AI-PDLC Maturity Model Tracker

A leadership tool for turning AI work into measurable business impact across the product lifecycle.

This is a capability-based operating model, not a tool-usage dashboard.

## The problem it solves

Most organizations do not have a shared way to answer three critical questions:

- Where are we actually stuck in the product lifecycle?
- Which work is worth automating or augmenting with AI?
- Are we improving real outcomes, or just adding more AI activity?

Without a common framework, AI conversations stay subjective. Teams talk about adoption, pilots, and experimentation, but they struggle to connect those efforts to business value.

This tracker gives leaders a common language for assessing maturity, prioritizing the right capabilities, and tracking the outcomes that matter.

## Why leaders should use it

This is not a tool for measuring how many people used AI. It is a tool for measuring whether the organization is getting better at the actual work.

It helps leaders:

- identify the highest-impact PDLC capabilities
- score maturity consistently across teams and domains
- distinguish org-wide capabilities from team-specific ones
- prioritize investment based on value, risk, and feasibility
- track whether AI is improving cycle time, quality, customer experience, and resilience

## What it measures

At its core, this tracker measures AI-PDLC capability maturity and investment priority. It is not a direct operational KPI dashboard yet. Instead, it creates the foundation for leaders to understand where the organization is weak, where the highest-value opportunities are, and what should be centralized, hybrid, or team-specific.

The reason this matters is simple: as critical capabilities move up the maturity scale, the expected business outcomes should improve. The metrics below are the downstream effect of capability maturity, not the beginning of the system.

### What the tracker measures today

- maturity by stage and the capabilities mapped into that stage
- capability coverage and ownership across teams and domains
- priority distribution across P0/P1/P2
- status movement from not started to piloting to scaled adoption
- org-wide, hybrid, and team-specific capability placement

The heatmap is not just a stage score. Each stage is explicitly mapped to the capabilities that belong there, so leaders can see both the maturity signal and the actual workstreams represented in that stage.

### North-star outcomes

These are the outcomes leaders expect to see as capability maturity improves.

- cycle time reduction
- quality improvement and reduced rework
- faster customer issue resolution
- lower incident recovery time and higher reliability
- capacity freed up for higher-value work
- movement from manual or assisted work toward standardized and AI-native execution

### Leading indicators

These are the early signals that capability progression is creating value.

- maturity movement by stage and capability
- pilot-to-scale conversion rate
- capability coverage and ownership
- priority distribution across P0/P1/P2

### Lagging indicators

These are the business results that should show up after the capability model has matured.

- before/after improvement on key workflows
- reduction in manual effort and defects
- faster release and support cycles
- measurable gains in customer and operational outcomes

## How to use it

1. Start with a quick Stage Pulse across all 7 PDLC stages.
2. Identify the stages with the biggest gap or opportunity.
3. Drill into the relevant capabilities.
4. Score maturity, effort, risk, feasibility, and outcome impact.
5. Decide what to centralize, what to keep local, and what to treat as hybrid.
6. Track the before/after impact and scale only what proves value.

## Who it is for

This is designed for leaders across product, engineering, delivery, operations, support, and platform. The model helps one leader assess their full remit without forcing work to be split by role or job title. In the age of AI, roles are changing quickly, but the capabilities required across the lifecycle remain a stable way to organize work.

## What problem it solves

It turns AI transformation from vague experimentation into a structured operating model:

- diagnose the real work that matters
- prioritize the highest-value opportunities
- set a target maturity state
- measure the real outcomes being improved
- scale the operating model only when the evidence is strong

## Project status

This repo contains the working concept, prototype, and build spec for the tracker. The technical data model and logic live in [`docs/build-spec.md`](docs/build-spec.md).

For a realistic example of how a leader uses the tracker in practice, see the Dunder Mifflin case study in [`docs/dunder-mifflin-case-study.md`](docs/dunder-mifflin-case-study.md).

## Background

This project reflects a product mindset applied to a complex organizational problem: instead of reacting to AI noise, pressure, or pilot churn, leaders need a way to break a large and ambiguous transformation into clear, manageable decisions.

The real challenge is not simply "How do we use AI?" It is: "Which part of the work matters most, how do we improve it systematically, and how do we know if the investment is actually worth it?"

In many organizations, the common failure pattern is familiar:

- lots of experimentation in different directions
- no shared operating model or common maturity language
- too much focus on tooling instead of business outcomes
- fragmented investments without clear owners or measurable success criteria
- AI work that stays in pilot mode because there is no path from experiment to scale
- leaders hearing different stories about progress without a consistent way to compare them

This project is designed to reduce that noise. It brings clarity to the work, explains where value is likely to be created, and creates a repeatable way to move from ambiguity to action.

The product mindset matters here because it forces us to think holistically: define the problem, break it into the right parts, prioritize based on value, measure the outcome, and iterate with evidence instead of intuition.

## Repository structure

- [README.md](README.md) — leadership overview
- [docs/build-spec.md](docs/build-spec.md) — technical model and logic
- [index.html](index.html) — prototype dashboard
- [capability-library.html](capability-library.html) — editable capability catalog
- [app.js](app.js) — tracker logic
- [styles.css](styles.css) — UI styling

## License

MIT — see [`LICENSE`](LICENSE).
