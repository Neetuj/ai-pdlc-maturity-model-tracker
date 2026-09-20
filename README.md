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

Imagine Michael Scott is the org leader and the team leaders below are each assessing their own slice of the business.

### 1) The leaders and their remit

| Leader | Focus area | Team-specific work | Shared org work |
| --- | --- | --- | --- |
| Michael Scott | Org roll-up | Executive reporting, operating rhythm, prioritization | Product analytics, roadmap, release readiness, org-level governance |
| Pam Beesly | Customer experience and service | Customer onboarding, support knowledge, service enablement | Customer feedback synthesis, issue triage, customer communications |
| Jim Halpert | Product and engineering execution | AI-assisted coding, feature definition, UX iteration | Requirements drafting, release planning, testing, engineering productivity |
| Dwight Schrute | Operations and field execution | Warehouse workflow optimization, SOP quality, scheduling | Incident detection, resilience planning, SLA monitoring, risk oversight |
| Angela Martin | Control and operational governance | Budget controls, vendor risk, compliance checks | Incident management, root cause analysis, security reviews, governance reporting |

### 2) What each leader fills in

Each leader evaluates the capability entries that matter to their area. The tracker asks for the same inputs across all cases:

- current maturity
- target maturity
- time spent
- frequency
- AI potential
- scalability
- risk
- feasibility
- whether it is included in scope
- whether it is central, hybrid, or team-specific
- current status: Not started / Piloting / Scaled

### 3) Example capability entries

#### Pam Beesly — customer experience leader

| Capability | Included | Type | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| Customer onboarding & configuration | Yes | Team-specific | L2 | L4 | Piloting | P1 |
| Support ticket triage | Yes | Central | L2 | L4 | Piloting | P0 |
| Customer feedback synthesis | Yes | Hybrid | L1 | L3 | Not started | P0 |

Pam is less focused on product coding and more on the customer journey. At her level, the investment decision is: make customer support and onboarding more consistent, faster, and less manual.

#### Jim Halpert — product and engineering leader

| Capability | Included | Type | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| AI-assisted coding | Yes | Team-specific | L2 | L4 | Piloting | P0 |
| Requirements & PRD drafting | Yes | Central | L2 | L3 | Not started | P1 |
| Test creation & automation | Yes | Hybrid | L2 | L4 | Piloting | P0 |

Jim's value is in engineering throughput and quality. His team-specific capabilities are where the productivity lift is biggest, but some of the biggest gains are shared across the org because they affect release quality and consistency.

#### Dwight Schrute — operations leader

| Capability | Included | Type | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| Warehouse workflow optimization | Yes | Team-specific | L1 | L3 | Not started | P0 |
| Incident detection & management | Yes | Central | L2 | L4 | Piloting | P0 |
| SLA / SLO tracking | Yes | Hybrid | L2 | L3 | Piloting | P1 |

Dwight's world is operational efficiency and reliability. His biggest wins are in execution speed, process consistency, and fewer operational interruptions.

#### Angela Martin — governance and operations leader

| Capability | Included | Type | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| Security reviews | Yes | Central | L2 | L4 | Piloting | P0 |
| Root cause analysis / post-incident review | Yes | Central | L2 | L4 | Piloting | P0 |
| Vendor risk management | Yes | Team-specific | L1 | L3 | Not started | P1 |

Angela is focused on control, reliability, and governance. Her investment decisions are often centralized because the value comes from standardization and risk reduction across the org.

### 4) How Michael sees the org-level output

Michael does not need to see every detail from every team to make the right decision. He sees the rollup:

| Capability | Org view | Team view | Priority | Decision |
| --- | --- | --- | --- | --- |
| Support ticket triage | Central | Pam | P0 | Build centrally |
| Incident detection & management | Central | Dwight / Angela | P0 | Build centrally |
| AI-assisted coding | Team-specific | Jim | P0 | Support team-level investment |
| Customer onboarding & configuration | Team-specific | Pam | P1 | Local team investment |
| Security reviews | Central | Angela | P0 | Centralized governance investment |

Michael's decision is then based on the aggregate picture:

- invest centrally where one shared capability creates leverage across many teams
- support team-level investment where the work is deeply local or specific to a domain
- treat some capabilities as hybrid when they need local execution but shared governance

This is the same logic the tracker uses at org, domain, and team level: the value is in the capability, not in the job title doing the work.

### Michael's org-level summary

| Recommendation | Why it matters |
| --- | --- |
| Build support ticket triage centrally | It affects many teams and improves service consistency |
| Build incident detection centrally | Reliability and operational resilience are shared org outcomes |
| Support AI-assisted coding at team level | It is highly valuable but anchored in engineering context |
| Invest in customer onboarding locally | It is specific to the service experience and customer journey |
| Keep security reviews centralized | Governance, quality, and risk control are org-wide requirements |

This is the decision logic Michael gets from the tool: centralize shared, org-critical capabilities; localize team-specific work when execution is domain-specific; treat hybrid cases as a shared capability with local implementation detail.

The main idea is that each leader scores the capabilities that matter to their remit, while Michael sees the aggregate picture across the full organization. This is the same logic the tracker uses for org, domain, team, and scope-based views.

## Repository structure

- [README.md](README.md) — leadership overview
- [docs/build-spec.md](docs/build-spec.md) — technical model and logic
- [index.html](index.html) — prototype dashboard
- [capability-library.html](capability-library.html) — editable capability catalog
- [app.js](app.js) — tracker logic
- [styles.css](styles.css) — UI styling

## License

MIT — see [`LICENSE`](LICENSE).
