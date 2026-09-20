# AI-PDLC Capability Investment Tracker — Build Spec

This is a build spec for an internal LLM/tool to turn into a working tracker (HTML, spreadsheet, or app — whatever your environment supports). It companions the "AI-PDLC Capability Assessment Guide" doc, which covers the why and the process; this file covers the data model and logic needed to actually build the thing.

Leaders use this at the **leader level**, not split by profession: one leader scores their full remit (engineering, product, delivery, CX, incidents, resilience, running their own org) using two tiers — a fast **stage pulse** across all 7 stages, then an optional **capability-level deep dive** on their top 2–3 stages.

---

## 1. Core concepts

- **Org/Domain**: free-text field identifying the leader's area (e.g. "Payments Platform", "EMEA Support"). Replaces any profession/function split — one leader's Org/Domain spans everything they own.
- **PDLC stage**: one of the 7 fixed stages (section 3.5). Every entry belongs to exactly one stage.
- **Stage Pulse entry**: one row per Org/Domain × Stage. Lightweight — no six-axis scoring.
- **Capability entry**: one row per Org/Domain × Stage × Capability. Full scoring, computed priority, and placement.
- **Maturity level**: L1–L5, used identically at both tiers (section 3.1).
- **Placement**: Central / Team-Specific / Hybrid, either taken from a capability's library default or computed from four yes/no answers (section 3.4), with manual override always available.

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
| `placementFinal` | enum (optional) | manual override; if unset, use the computed suggestion (3.4), falling back to `placementDefault` when no questions are answered yet |
| `aiOpportunityNotes` | text | what AI would actually do here |
| `status` | enum | Not started / Piloting / Scaled / Deprioritized |
| `baseline` | text | e.g. "6 hrs/week manual" |
| `result` | text | e.g. "2.5 hrs/week, 58% faster" — populated once piloted |
| `updatedAt` | datetime | |
| `updatedBy` | text | who logged it |

Purpose: this is where investment decisions and prioritization happen — but only for the stages a leader's pulse flagged as worth the deeper look. This is the "too much" ceiling to avoid triggering everywhere.

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
    placement = "Team-Specific"
elif Q1 and Q2 and not Q3:
    placement = "Central"
else:
    placement = "Hybrid"

if Q4 and placement != "Central":
    placement = placement + " (central governance required)"
```

`placementFinal` overrides this when a leader sets it explicitly; otherwise use the computed value; if no questions have been answered yet, show `placementDefault` from the library below as a starting hint.

### 3.5 Capability library — 7 stages, with default placement

Organized by **stage**, not by profession, since one leader owns all of these across their domain.

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

1. **Org-wide stage heatmap** — every Org/Domain × all 7 stages, colored by maturity gap and pain/opportunity (from Stage Pulse entries). This is the fast, comprehensive view.
2. **Capability tracker table** — every capability entry, sortable by `priority` descending, filterable by Org/Domain, stage, placement, and tier. Shows current→target maturity, priority score + tier, placement, status.
3. **Top priorities (org-wide)** — top 10–15 capability entries by `priority`, across every Org/Domain, for the investment shortlist.
4. **Central / Team-Specific / Hybrid grouped view** — every capability entry grouped by `placementFinal` (or computed placement), so leadership can see what to build once vs. leave to teams.
5. **Impact showcase** — every capability entry with a non-empty `result`, shown as a before/after card (baseline → result), grouped or filterable by Org/Domain — this is the leadership-ready proof-of-productivity view.

## 5. Implementation notes

- Keep scoring anchors and the priority formula exactly as written (section 3.2–3.3) so results are comparable across every leader — don't let the tool's builder invent its own scale.
- Persistence is up to your environment: a shared backend/sheet if multiple leaders need to see each other's live entries (recommended, since the whole point is one roll-up), or per-leader files merged manually if no shared store is available.
- Pre-fill the capability library (3.5) as selectable options per stage so leaders pick from it rather than typing capability names from scratch — but always allow a free-text "custom capability" entry, since the library is a starting point, not a ceiling.
- Show `placementDefault` immediately when a capability is selected from the library, before any of the 4 questions are answered — it's a hint, not a lock, and speeds up the common case.
- Don't force capability-level entry for every stage. The UI should make it easy to do the Stage Pulse for all 7 stages first, then open the capability form only for stages a leader chooses to drill into.

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
