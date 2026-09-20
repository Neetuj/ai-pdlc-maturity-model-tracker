# AI-PDLC Capability Investment Tracker — Build Spec

This is a build spec for an internal LLM/tool to turn into a working tracker (HTML, spreadsheet, or app — whatever your environment supports). It companions the "AI-PDLC Capability Assessment Guide" doc, which covers the why and the process; this file covers the data model and logic needed to actually build the thing.

Leaders use this at the **leader level**, not split by profession: one leader scores their full remit (engineering, product, delivery, CX, incidents, resilience, running their own org) using two tiers — a fast **stage pulse** across all 7 stages, then an optional **capability-level deep dive** on their top 2–3 stages.

---

## 1. Core concepts

- **Org/Domain**: free-text field identifying the leader's area (e.g. "Payments Platform", "EMEA Support"). Replaces any profession/function split — one leader's Org/Domain spans everything they own.
- **PDLC stage**: a fixed lifecycle stage, with a shorter executive view (7 key stages) and a fuller operational capability map underneath (discover, strategy, define, design, build, validate, release, adopt, operate, support, incident, learn).
- **Stage Pulse entry**: one row per Org/Domain × Stage. Lightweight — no six-axis scoring.
- **Capability entry**: one row per Org/Domain × Stage × Capability. Full scoring, computed priority, and placement.
- **Maturity level**: L1–L5, used identically at both tiers (section 3.1).
- **Placement**: Central / Team-Specific / Hybrid, either taken from a capability's library default or computed from four yes/no answers (section 3.4), with a leader-level override always available.
- **Placement override**: a manual override that can change a capability from its default/computed value to Central, Hybrid, or Team-Specific at the Org/Domain level, while still preserving the underlying default and the final effective model.
- **Capability library**: the editable catalog of capabilities grouped by PDLC stage; allows org-default capabilities and team-custom capabilities to coexist, so there is a shared baseline and room for local variation.
- **Scope selector**: a top-level filter for Org / Domain / Team / View so leaders can look at the org roll-up, a team slice, or a specific domain without mixing data together.
- **AI Opportunity Canvas**: the structured narrative for any capability: job, artifact, inputs, bottlenecks, handoffs, rework, current maturity, standardization gap, automation opportunity, AI leverage, and human control points.
- **Status**: the execution state for a capability. Recommended values are Not assessed / Not started / Piloting / Scaled / Deprioritized / N/A. The default for any unevaluated capability is Not assessed, not Not started.
- **Outcome metrics**: the actual leading and lagging measures that determine whether a capability is improving real work outcomes (cycle time, quality, customer experience, resilience, throughput, and capacity), not just whether AI usage is increasing.
- **Playbook**: the full transformation method behind the tracker — not only a maturity model. It should clearly guide a leader from mapping the PDLC to prioritizing, standardizing, automating, and measuring end-to-end outcomes.

---

## 2. Data model

### 2.1 Stage Pulse entry

| Field | Type | Notes |
| --- | --- | --- |
| `orgDomain` | text | free text |
| `stage` | enum | one of the 7 stages (3.5) |
| `currentMaturity` | 1–5 | L1–L5 (3.1) |
| `targetMaturity` | 1–5 | L1–L5 (3.1) |
| `painOpportunity` | enum | Low / Med / High |
| `notes` | text (optional) | why this stage feels painful or fine |
| `updatedAt` | datetime | |
| `updatedBy` | text | who logged it |

Purpose: produces the org-wide heatmap (maturity gap × pain, per stage, per Org/Domain) with almost no effort. This is the "too little" floor — every leader does this for all 7 stages.

### 2.2 Capability entry

| Field | Type | Notes |
| --- | --- | --- |
| `org` | text | owning org or business unit |
| `domain` | text | leader domain, e.g. Platform, Payments, Operations |
| `team` | text | team or function submitting the data |
| `scope` | enum | Org default / Team custom / Hybrid |
| `orgDomain` | text | free text |
| `stage` | enum | one of the 7 stages (3.5) |
| `capabilityName` | text | from the library (3.5) or custom |
| `currentMaturity` | 1–5 | L1–L5 (3.1) |
| `targetMaturity` | 1–5 | L1–L5 (3.1) |
| `timeSpent` | 1–5 | anchored scale (3.2) |
| `frequency` | 1–5 | anchored scale (3.2) |
| `aiPotential` | 1–5 | anchored scale (3.2) |
| `scalability` | 1–5 | anchored scale (3.2) |
| `risk` | 1–5 | anchored scale (3.2) |
| `feasibility` | 1–5 | anchored scale (3.2) |
| `q1`…`q4` | boolean | placement questions (3.4) |
| `placementDefault` | enum | from the library (3.5), shown before any answers |
| `placementOverride` | enum (optional) | leader-selected override for this Org/Domain: Central / Hybrid / Team-Specific; blank means "use default/computed" |
| `placementEffective` | enum | final model used for reporting and scoring. Derived as `placementOverride` if set, otherwise `placementComputed` or `placementDefault` |
| `placementComputed` | enum (optional) | value created from the four yes/no questions (3.4) |
| `placementOverrideReason` | text (optional) | why the org deviates from the default/computed setting |
| `included` | boolean | whether the capability is in scope for the selected org/team |
| `selectionTier` | enum | Must have / Should have / Optional |
| `status` | enum | Not assessed / Not started / Piloting / Scaled / Deprioritized / N/A. Default = Not assessed until the leader has reviewed the capability. |
| `aiOpportunityNotes` | text | what AI would actually do here |
| `baseline` | text | e.g. "6 hrs/week manual" |
| `result` | text | e.g. "2.5 hrs/week, 58% faster" — populated once piloted |
| `updatedAt` | datetime | |
| `updatedBy` | text | who logged it |

Purpose: this is where investment decisions and prioritization happen — but only for the stages a leader's pulse flagged as worth the deeper look. This is the "too much" ceiling to avoid triggering everywhere. The default status must be Not assessed, so leaders can distinguish between a capability they haven't reviewed yet and a capability they reviewed and deliberately left as not started.

### Status semantics

The system should clearly separate the following meanings:

- **Not assessed**: default value before a leader has reviewed the capability
- **Not started**: reviewed and relevant, but no execution has begun yet
- **N/A**: capability is not relevant for this org, domain, or team
- **Piloting / Scaled / Deprioritized**: execution states after the capability has been reviewed and included

This avoids conflating a data gap with an intentional operating decision.

---

## 3. Reference data (fixed — do not let users edit these)

### 3.1 Maturity levels

| Level | Name | Definition |
| --- | --- | --- |
| L1 | Manual | Work is manual, fragmented, individual-dependent. |
| L2 | AI-Assisted | People use AI to speed up parts of the work; a human still drives it. |
| L3 | Standardized | Common templates, processes, data, and guardrails exist. |
| L4 | AI-Automated | AI carries out most of the workflow, with defined human checkpoints. |
| L5 | AI-Native | AI runs the workflow end to end, escalating exceptions to a person. |

### 3.2 Scoring anchors (capability level only)

| Scale | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| Time spent (team/week) | <2 hrs | 2–5 hrs | 5–10 hrs | 10–20 hrs | >20 hrs |
| Frequency / volume | Rare (quarterly) | Monthly | Weekly | Daily | Continuous |
| AI potential today | Not suited | Draft/summarize only | Proven pattern, needs work | Established pattern | Ready-made tools exist |
| Scalability if solved | One team | This team, many workflows | This function/domain | Multiple domains | Org-wide |
| Risk / control need | Low, internal | Low-medium | Customer-facing | Regulated/security | Safety/legal-critical |
| Feasibility today | Not ready | Early | Ready with effort | Mostly ready | Ready now |

### 3.3 Priority formula & tiers (capability level only)

```
opportunity = timeSpent × frequency × aiPotential × scalability   // range 1–625
riskMultiplier    = {1: 1.00, 2: 0.90, 3: 0.75, 4: 0.55, 5: 0.35}[risk]
feasibilityMultiplier = {1: 0.40, 2: 0.60, 3: 0.80, 4: 0.90, 5: 1.00}[feasibility]
priority = opportunity × riskMultiplier × feasibilityMultiplier

tier = "P0 Invest Now"   if priority >= 120
     = "P1 Near-Term"    if 40 <= priority < 120
     = "P2 Later"        if priority < 40
```

Thresholds (120 / 40) are starting points — recalibrate after the first full pass across every Org/Domain if the distribution skews too heavily to one tier.

### 3.4 Central vs. Team-Specific decision logic

Four yes/no questions per capability:

1. **Q1** — Is the underlying data/process basically the same across most teams?
2. **Q2** — Could one shared tool/prompt/agent serve multiple teams without heavy customization?
3. **Q3** — Does doing this well require deep product- or domain-specific context?
4. **Q4** — Does it require centralized governance (security, legal, brand, data)?

```
if Q3 and (not Q1 or not Q2):
    placementComputed = "Team-Specific"
elif Q1 and Q2 and not Q3:
    placementComputed = "Central"
else:
    placementComputed = "Hybrid"

if Q4 and placementComputed != "Central":
    placementComputed = placementComputed + " (central governance required)"
```

`placementOverride` is always optional and always wins when set by a leader at the Org/Domain level. The final value shown to users is `placementEffective`:

```
if placementOverride is set:
    placementEffective = placementOverride
else if placementComputed is set:
    placementEffective = placementComputed
else:
    placementEffective = placementDefault
```

This preserves the default library model as the baseline, while allowing a leader to document how their organization actually operates. Leaders should be able to choose “Use default”, “Central”, “Hybrid”, or “Team-Specific” from the UI without losing the original default value behind the scenes.

### 3.5 Capability library — 7 stages, with default placement

Organized by **stage**, not by profession, since one leader owns all of these across their domain.

The library is intentionally editable and stage-based: leaders can add or remove capabilities, rename them, and distinguish between org-default and team-custom entries. This prevents the catalog from becoming a rigid list while still preserving a common baseline across the org.

**1. Discover & Plan**
| Capability | Default placement |
| --- | --- |
| Market & customer research | Team-Specific |
| Product/portfolio strategy & OKRs | Team-Specific |
| Roadmap prioritization | Team-Specific |
| Business case / ROI analysis | Hybrid |
| Competitive research | Central |
| Capacity & resourcing planning | Hybrid |
| Risk & dependency forecasting | Hybrid |

**2. Define & Design**
| Capability | Default placement |
| --- | --- |
| Requirements & PRD drafting | Central |
| Epic / story / acceptance criteria creation | Central |
| UX / solution design | Team-Specific |
| Architecture & design reviews | Hybrid |
| Dependency & cross-team risk mapping | Central |
| Compliance / security requirements definition | Central |

**3. Build & Validate**
| Capability | Default placement |
| --- | --- |
| AI-assisted coding | Team-Specific |
| Test creation & automation | Hybrid |
| PR / code reviews | Central |
| Security reviews | Central |
| Technical documentation | Hybrid |
| Release readiness / go-live checks | Central |

**4. Release & Customer Adoption**
| Capability | Default placement |
| --- | --- |
| Release planning & coordination | Central |
| Customer onboarding & configuration | Hybrid |
| Migration & data conversion | Team-Specific |
| Training & enablement | Hybrid |
| Release / customer communications | Central |
| Time-to-value tracking | Central |

**5. Operate, Support & Resilience** *(covers CX and incidents)*
| Capability | Default placement |
| --- | --- |
| Monitoring & alerting triage | Hybrid |
| Support ticket triage | Central |
| Customer troubleshooting | Team-Specific |
| Incident detection & management | Central |
| Root cause analysis / post-incident review | Central |
| Problem management | Central |
| Knowledge management | Central |
| Customer communications & CX sentiment tracking | Hybrid |
| Capacity & performance engineering | Team-Specific |
| Disaster recovery / business continuity planning & testing | Central |
| Chaos / resilience testing | Team-Specific |
| SLA / SLO & error-budget management | Hybrid |
| Vendor & dependency risk management (technical) | Central |

**6. Learn & Optimize**
| Capability | Default placement |
| --- | --- |
| Customer feedback synthesis | Hybrid |
| Product & usage analytics | Central |
| Retrospectives / continuous improvement | Team-Specific |
| Roadmap feedback loop | Team-Specific |

**7. Lead & Run the Org** *(people, budget, governance — outside the product lifecycle proper, still leader-owned)*
| Capability | Default placement |
| --- | --- |
| Capacity & budget planning | Central |
| Hiring & team onboarding | Hybrid |
| Vendor management (business/commercial) | Central |
| OKR / goal rollup & cross-functional prioritization | Central |
| Executive / stakeholder reporting | Central |
| Risk & compliance oversight | Central |

---

## 4. Views the tool needs

The tool should be built as a playbook + tracker, not just a maturity scorecard. There are two complementary layers:

1. **Executive layer** — the fast, leadership-friendly heatmap across the 7 summary stages (Discover & Plan, Define & Design, Build & Validate, Release & Customer Adoption, Operate, Support & Resilience, Learn & Optimize, Lead & Run the Org). This is the first screen and should be visually clean and quick to consume.
2. **Operational layer** — the fuller PDLC capability atlas used to identify work, bottlenecks, and AI opportunity end-to-end. This layer is more detailed and can span the full lifecycle: discover, strategy, define, design, build, validate, release, adopt, operate, support, incident, learn.

The system should also make the transformation path explicit: diagnose the capability gap, prioritize the highest-value opportunities, define the baseline and target state, launch a pilot, measure the real outcomes, and scale the workflow only once the evidence is strong. This is what turns AI experimentation into a systematic business capability transformation.

The required views are:

1. **Org-wide stage heatmap** — every Org/Domain × all 7 stages, colored by maturity gap and pain/opportunity (from Stage Pulse entries), and paired with the mapped capability names under each stage. This is the fast, comprehensive view.
2. **Capability tracker table** — every capability entry, sortable by `priority` descending, filterable by Org/Domain, stage, placement, and tier. Shows current→target maturity, priority score + tier, placement, status.
3. **Full PDLC capability map** — a detailed capability atlas that covers the broader lifecycle beyond the short executive stage list, so it includes discovery, strategy, plan, define, design, build, test, release, adopt, operate, support, incidents, and continuous improvement.
4. **Top priorities (org-wide)** — top 10–15 capability entries by `priority`, across every Org/Domain, for the investment shortlist.
5. **Central / Team-Specific / Hybrid grouped view** — every capability entry grouped by `placementEffective`, with the default/computed placement visible alongside any org override, so leadership can see what to build once vs. leave to teams.
6. **Impact showcase** — every capability entry with a non-empty `result`, shown as a before/after card (baseline → result), grouped or filterable by Org/Domain — this is the leadership-ready proof-of-productivity view.
7. **Override-aware portal editing** — the UI must allow a leader to override a capability's placement from the default/computed value to Central, Hybrid, or Team-Specific, and should display the change as `default`, `override`, and `effective` values side by side.
8. **AI Opportunity Canvas** — a standard form attached to each capability asking: job, artifact, inputs, bottlenecks, handoffs, rework, current maturity, standardization gap, automation opportunity, AI leverage, and human control points.

### 4.1 Capability-aware heatmap definition

The executive heatmap must always show the stage and the mapped capability set behind it. A cell or stage row is not meaningful if it only expresses a maturity value without the list of capabilities that define that stage's operating model.

In other words, every stage should be treated as a bundle of capability entries, not as an abstract label. The UI should make these capabilities visible alongside the stage summary so leaders know what work is actually being scored in that stage.

This applies to the org-level heatmap, team-level heatmap, and the detailed capability view. If a stage is labeled "Build & Validate," the user should immediately see the major capabilities mapped under it such as AI-assisted coding, test creation & automation, release readiness, and security reviews.

### 4.2 Outcome-tracking metric framework

The product is not trying to optimize for tool adoption alone. It is trying to improve the underlying business outcomes of the work being done across the PDLC. The metrics layer must therefore separate:

- **Leading indicators**: maturity movement, priority distribution, coverage, capability-level baseline-to-target gap, pilot-to-scale conversion.
- **Lagging indicators**: cycle time reduction, defect reduction, faster ticket resolution, CX lift, incident MTTR reduction, capacity released for higher-value work.
- **Outcome proof**: before/after values captured in the capability record (`baseline` vs `result`) that show whether an AI-enabled workflow actually improved the work.

This is the heart of the transformation narrative: do we materially improve the business problem, or are we simply using AI in more places without measurable operational gain?

### 4.2 Workbook structure recommendation

To keep the tool practical and reusable, the spreadsheet/app should be organized into multiple tabs rather than a single giant grid:

- Tab 1 — PDLC Capability Map
- Tab 2 — Stage Pulse / Heatmap
- Tab 3 — Maturity Assessment
- Tab 4 — Productivity Baseline
- Tab 5 — AI / Automation Opportunity Canvas
- Tab 6 — Prioritization
- Tab 7 — Roadmap
- Tab 8 — Metrics and Outcomes

This keeps the executive view light while allowing deeper operational analysis without overloading leaders with low-level detail.

## 5. Future roadmap / Phase 2: outcome metrics layer

This is the next evolution of the tracker, and it should be treated as a planned enhancement rather than part of the immediate MVP. The core tracker should stay focused on capability maturity, placement, and prioritization. Once that is stable, the next phase adds a structured outcome metrics layer to prove that maturity improvements are producing business value.

### 5.1 Phase 2 goal

Add a repeatable way to connect capability maturity to measurable business outcomes. The outcome layer is not a replacement for the capability model; it is the evidence layer that tells leaders whether the capability roadmap is translating into real value.

### 5.2 Proposed Phase 2 capabilities

- attach a metric definition to each capability or initiative
- capture baseline and result values for selected workflows
- associate each metric with a business outcome category such as cycle time, quality, customer experience, reliability, or capacity
- allow a leader to specify whether the metric is leading, lagging, or operational proof
- compare before/after values across a chosen time window
- show which initiatives are delivering measurable gains and which remain in pilot mode without evidence

### 5.3 Example Phase 2 metric categories

#### Business outcomes
- cycle time reduction
- defect reduction and rework reduction
- customer issue resolution speed
- incident MTTR reduction
- throughput / productivity gains
- capacity released for higher-value work

#### Leading indicators
- capability maturity movement
- pilot-to-scale conversion rate
- capability coverage and ownership
- investment prioritization movement across P0/P1/P2

#### Lagging indicators
- before/after improvement on key workflows
- reduction in manual effort and defects
- faster release and support cycles
- measurable gains in customer and operational outcomes

### 5.4 Proposed data model additions for Phase 2

| Field | Type | Notes |
| --- | --- | --- |
| `metricName` | text | e.g. "Average ticket resolution time" |
| `metricType` | enum | Leading / Lagging / Outcome |
| `baselineValue` | number | the starting measurement |
| `resultValue` | number | the post-change measurement |
| `unit` | text | e.g. hours, %, count |
| `measurementPeriod` | text | e.g. 30-day, quarterly |
| `source` | text | where the data comes from |
| `owner` | text | person or team accountable |
| `isTracked` | boolean | whether this item is currently measured |
| `impactCategory` | enum | Quality / Speed / CX / Reliability / Capacity |

### 5.5 Suggested Phase 2 UI features

- a dedicated Metrics tab or Outcomes dashboard
- before/after cards for each capability or initiative
- trend lines for selected metrics over time
- a proof-of-value section showing which investments created measurable gains
- a filter for org, domain, team, and impact category
- a clear distinction between maturity score and outcome evidence

### 5.6 Scope boundary for MVP

The initial tracker should remain focused on:

- maturity assessment
- capability prioritization
- placement logic
- org/team operating model clarity

The metrics layer should be explicitly marked as a future enhancement, not presented as a current direct tracking mechanism. In other words, the tracker can say: capability maturity is the input model; outcome metrics are the evidence model that should improve as the maturity model advances.

## 6. Implementation notes

- Keep scoring anchors and the priority formula exactly as written (section 3.2–3.3) so results are comparable across every leader — don't let the tool's builder invent its own scale.
- Persistence is up to your environment: a shared backend/sheet if multiple leaders need to see each other's live entries (recommended, since the whole point is one roll-up), or per-leader files merged manually if no shared store is available.
- Pre-fill the capability library (3.5) as selectable options per stage so leaders pick from it rather than typing capability names from scratch — but always allow a free-text "custom capability" entry, since the library is a starting point, not a ceiling.
- Show `placementDefault` immediately when a capability is selected from the library, before any of the 4 questions are answered — it's a hint, not a lock, and speeds up the common case.
- Don't force capability-level entry for every stage. The UI should make it easy to do the Stage Pulse for all 7 stages first, then open the capability form only for stages a leader chooses to drill into.
- Keep the broader PDLC capability taxonomy in the playbook, even if the executive maturity heatmap stays at 7 summary stages. The leadership view should be clean and digestible; the deeper capability atlas should capture the full end-to-end workflow, including discovery, strategy, adoption, support, incidents, and learning.
- The tool should clearly communicate that L5 is not the target for every capability. Ownership should be based on value, volume, complexity, risk, and feasibility — not on a blanket assumption that every workflow should be AI-native.

## 6. Worked example rows (for testing the build)

**Stage Pulse:**

| orgDomain | stage | currentMaturity | targetMaturity | painOpportunity |
| --- | --- | --- | --- | --- |
| Payments Platform | Operate, Support & Resilience | L1 | L4 | High |
| Payments Platform | Discover & Plan | L2 | L3 | Low |

**Capability entry** (drill-down from the row above):

| field | value |
| --- | --- |
| orgDomain | Payments Platform |
| stage | Operate, Support & Resilience |
| capabilityName | Incident detection & management |
| currentMaturity / targetMaturity | L1 / L4 |
| timeSpent / frequency / aiPotential / scalability | 4 / 5 / 4 / 4 |
| risk / feasibility | 3 / 4 |
| → opportunity | 4×5×4×4 = 320 |
| → riskMultiplier / feasibilityMultiplier | 0.75 / 0.90 |
| → priority | 320 × 0.75 × 0.90 = **216** |
| → tier | **P0 — Invest Now** |
| q1 / q2 / q3 / q4 | Yes / Yes / No / Yes |
| → placement | **Central** (Q4 keeps it Central since Q1+Q2+¬Q3 already resolves Central) |
| status | Piloting |
| baseline / result | "9 hrs/week manual triage" / "4 hrs/week with AI-assisted detection, 55% faster" |
