# AI-PDLC Maturity Model Tracker

A simple way for leaders to see where AI is improving the work across the product lifecycle, where the gaps still are, and where to invest next.

## Why this exists

Most teams talk about AI adoption, but they do not have a common way to measure whether it is actually improving the work. The problem is not whether people are using AI tools. The problem is whether the organization is moving from manual, slow, inconsistent work to more scalable, reliable, and customer-friendly execution.

This tracker gives leaders a shared language for that shift.

## What it does

- Scores the maturity of each PDLC stage and capability from L1 to L5
- Identifies where the highest-value AI opportunities are
- Separates org-level defaults from team-specific capabilities
- Tracks whether a capability is not started, piloting, or scaled
- Measures outcomes such as cycle time, quality, customer experience, resilience, and capacity

## Who it is for

Leaders across product, engineering, delivery, operations, support, and platform. One leader can assess their full remit without splitting everything by function. Moreover, the roles and functions are evolving rapidly in the age of AI and merging, but the capabilities required across the PDLC remain largely stable regardless of which professional, team, or agent performs the task.

## How it works

1. Start with a quick Stage Pulse across all 7 PDLC stages.
2. Identify the stages with the biggest opportunity.
3. Drill into the relevant capabilities.
4. Score maturity, effort, impact, risk, and feasibility.
5. Prioritize the capabilities that matter most.
6. Track the before/after outcome data and scale only what proves value.

## What leaders track

The core question is not whether the team is using AI. The core question is whether the organization is improving the real work.

### North-star outcome metrics

- Cycle time reduction across planning, build, release, and support
- Quality improvement: fewer defects, less rework, stronger test confidence
- Customer impact: faster issue resolution, better onboarding, higher customer value delivery
- Reliability: faster incident detection, shorter MTTR, more stable operations
- Capacity gain: less manual effort and more time for higher-value work
- Maturity movement: the capability moves from L1/L2 toward L3/L4/L5 over time

### Leading indicators

- Maturity movement per stage and capability
- Priority distribution across P0/P1/P2
- Pilot-to-scale conversion rate
- Coverage of key capabilities and owners

### Lagging indicators

- Before/after outcome impact for scaled capabilities
- Reduction in manual work, defects, and resolution times
- Measurable gains in throughput, quality, and customer outcomes

## Why it matters

This is not a dashboard about tool usage. It is a structured way to turn AI from scattered experimentation into systematic business improvement.

The goal is to diagnose the real bottlenecks, prioritize the right capabilities, prove the business impact, and scale the operating model.

## Project status

This repo contains the working concept, prototype, and build spec for the tracker. The detailed logic and data model live in [`docs/build-spec.md`](docs/build-spec.md).

For a realistic example of how the tracker should look in practice, see the worked example rows and sample data in [`docs/build-spec.md`](docs/build-spec.md). Those examples help show how a real team or org would populate the tracker and what the output should look like.

## Example: Dunder Mifflin

A short example helps explain how the tracker works in practice. See the fuller walkthrough in the project example documentation and sample rows in [`docs/build-spec.md`](docs/build-spec.md).

In the example, Michael Scott is the org leader and the team leaders below each assess the capabilities relevant to their remit:

- Pam focuses on customer experience and service enablement
- Jim focuses on product and engineering execution
- Dwight focuses on operations and field execution
- Angela focuses on governance, control, and operational risk

Each leader fills in the same inputs for the capabilities in scope, while Michael rolls up the results to see which capabilities should be funded centrally, locally, or in a hybrid model. The org-level decision is based on outcome impact, not on function labels.

## Repository structure

- [README.md](README.md) — leadership overview
- [docs/build-spec.md](docs/build-spec.md) — technical model and logic
- [index.html](index.html) — prototype dashboard
- [capability-library.html](capability-library.html) — editable capability catalog
- [app.js](app.js) — tracker logic
- [styles.css](styles.css) — UI styling

## License

MIT — see [`LICENSE`](LICENSE).
