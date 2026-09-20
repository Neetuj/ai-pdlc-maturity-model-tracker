# Dunder Mifflin AI-PDLC Case Study

This case study shows how a leader can use the tracker to aggregate team-level capability assessment into a single org-level investment decision without collapsing everything into a function-based view.

## Scenario

Michael Scott is the org leader. Four leaders report into him and each scores the capabilities relevant to their area:

- Pam Beesly — customer experience and service enablement
- Jim Halpert — product and engineering execution
- Dwight Schrute — operations and field execution
- Angela Martin — governance, control, and operational risk

The org is not trying to score people by title. It is trying to score the work and the capabilities required to deliver that work reliably, efficiently, and at scale.

## Team-level view

### Pam Beesly — customer experience leader

| Capability | Scope | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- |
| Customer onboarding & configuration | Team-specific | L2 | L4 | Piloting | P1 |
| Support ticket triage | Central | L2 | L4 | Piloting | P0 |
| Customer feedback synthesis | Hybrid | L1 | L3 | Not started | P0 |

### Jim Halpert — product and engineering leader

| Capability | Scope | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- |
| AI-assisted coding | Team-specific | L2 | L4 | Piloting | P0 |
| Requirements & PRD drafting | Central | L2 | L3 | Not started | P1 |
| Test creation & automation | Hybrid | L2 | L4 | Piloting | P0 |

### Dwight Schrute — operations leader

| Capability | Scope | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- |
| Warehouse workflow optimization | Team-specific | L1 | L3 | Not started | P0 |
| Incident detection & management | Central | L2 | L4 | Piloting | P0 |
| SLA / SLO tracking | Hybrid | L2 | L3 | Piloting | P1 |

### Angela Martin — governance leader

| Capability | Scope | Current | Target | Status | Priority |
| --- | --- | --- | --- | --- | --- |
| Security reviews | Central | L2 | L4 | Piloting | P0 |
| Root cause analysis / post-incident review | Central | L2 | L4 | Piloting | P0 |
| Vendor risk management | Team-specific | L1 | L3 | Not started | P1 |

## Org-level roll-up

Michael sees the aggregate view, not the raw team detail. The system groups capabilities into:

- Central: one shared capability creates leverage across the org
- Hybrid: local execution with org-wide governance or consistency
- Team-specific: capability is deeply tied to a team or domain context

| Capability | Aggregate view | Priority | Recommended investment |
| --- | --- | --- | --- |
| Support ticket triage | Central | P0 | Build centrally |
| Incident detection & management | Central | P0 | Build centrally |
| AI-assisted coding | Team-specific | P0 | Support team-level investment |
| Customer onboarding & configuration | Team-specific | P1 | Local team investment |
| Security reviews | Central | P0 | Centralized governance investment |

## Why this matters

This is the real value of the tracker: it helps leaders decide not based on departmental labels, but based on the capabilities required to create value and reduce friction across the organization.

The model separates:

- work that should be standardized once and used many times
- work that should remain local to a team or domain
- work that needs local execution but shared quality controls

## Visual org summary

| Investment type | Capabilities | Decision |
| --- | --- | --- |
| Central | Support ticket triage, Incident detection & management, Security reviews | Build once, scale across org |
| Hybrid | Customer feedback synthesis, Test creation & automation, SLA / SLO tracking | Shared platform + local execution |
| Team-specific | AI-assisted coding, Customer onboarding & configuration, Warehouse workflow optimization | Local team investment |

This quick summary is what Michael sees before drilling deeper: a clear view of where to centralize, where to localize, and where capability design needs both shared standards and local execution.

## Michael's final decision

| Recommendation | Why |
| --- | --- |
| Build support ticket triage centrally | It affects service quality across multiple teams |
| Build incident detection centrally | It drives reliability and resilience across the org |
| Support AI-assisted coding at team level | It is high value but domain-specific to engineering |
| Invest in customer onboarding locally | It is tightly linked to service experience and team workflow |
| Keep security reviews centralized | It is an org-wide governance capability |

This is the operating model the tracker is designed to surface: a clear picture of the work, a clear model of maturity, and a defensible investment decision rooted in outcomes rather than titles or anecdotes.
