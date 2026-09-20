const STORAGE_KEY = 'ai-pdlc-tracker-demo-v1';
const SCOPE_KEY = 'ai-pdlc-scope-v1';

const stageOptions = [
  'Discover & Plan',
  'Define & Design',
  'Build & Validate',
  'Release & Customer Adoption',
  'Operate, Support & Resilience',
  'Learn & Optimize',
  'Lead & Run the Org'
];

const defaultState = [
  {
    id: 'customer-research',
    org: 'Pam Beesly',
    parentOrg: 'Michael Scott',
    domain: 'Customer',
    team: 'Customer Experience',
    stage: 'Discover & Plan',
    capability: 'Customer research',
    defaultPlacement: 'Team-Specific',
    override: '',
    included: true,
    selectionTier: 'Must have',
    currentMaturity: 2,
    targetMaturity: 4,
    timeSpent: 3,
    frequency: 3,
    aiPotential: 4,
    scalability: 3,
    risk: 3,
    feasibility: 4,
    notes: 'Interview synthesis and issue clustering are still manual.'
  },
  {
    id: 'customer-research-root',
    org: 'Michael Scott',
    parentOrg: '',
    domain: 'Corporate',
    team: 'Leadership',
    stage: 'Discover & Plan',
    capability: 'Customer research',
    defaultPlacement: 'Hybrid',
    override: 'Central',
    included: true,
    selectionTier: 'Must have',
    currentMaturity: 3,
    targetMaturity: 4,
    timeSpent: 4,
    frequency: 4,
    aiPotential: 4,
    scalability: 4,
    risk: 3,
    feasibility: 5,
    notes: 'Michael aggregates the customer insight view across orgs.'
  },
  {
    id: 'roadmap-prioritization',
    org: 'Jim Halpert',
    parentOrg: 'Michael Scott',
    domain: 'Product',
    team: 'Product',
    stage: 'Discover & Plan',
    capability: 'Roadmap prioritization',
    defaultPlacement: 'Hybrid',
    override: 'Central',
    included: true,
    selectionTier: 'Must have',
    currentMaturity: 2,
    targetMaturity: 4,
    timeSpent: 4,
    frequency: 4,
    aiPotential: 4,
    scalability: 4,
    risk: 2,
    feasibility: 4,
    notes: 'Leadership decisions still rely on manual tradeoff analysis.'
  },
  {
    id: 'prd-drafting',
    org: 'Jim Halpert',
    parentOrg: 'Michael Scott',
    domain: 'Product',
    team: 'Engineering',
    stage: 'Define & Design',
    capability: 'PRD drafting',
    defaultPlacement: 'Central',
    override: '',
    included: true,
    currentMaturity: 3,
    targetMaturity: 4,
    timeSpent: 3,
    frequency: 4,
    aiPotential: 4,
    scalability: 4,
    risk: 2,
    feasibility: 5,
    notes: 'Patterns are already reusable across teams.'
  },
  {
    id: 'architecture-design',
    org: 'Jim Halpert',
    parentOrg: 'Michael Scott',
    domain: 'Product',
    team: 'Engineering',
    stage: 'Define & Design',
    capability: 'Architecture & design reviews',
    defaultPlacement: 'Hybrid',
    override: 'Hybrid',
    included: true,
    selectionTier: 'Should have',
    currentMaturity: 2,
    targetMaturity: 4,
    timeSpent: 3,
    frequency: 4,
    aiPotential: 3,
    scalability: 4,
    risk: 4,
    feasibility: 3,
    notes: 'High-risk decisions still require expert oversight.'
  },
  {
    id: 'ai-coding',
    org: 'Jim Halpert',
    parentOrg: 'Michael Scott',
    domain: 'Product',
    team: 'Engineering',
    stage: 'Build & Validate',
    capability: 'AI-assisted coding',
    defaultPlacement: 'Team-Specific',
    override: '',
    included: true,
    selectionTier: 'Must have',
    currentMaturity: 3,
    targetMaturity: 5,
    timeSpent: 4,
    frequency: 5,
    aiPotential: 5,
    scalability: 4,
    risk: 3,
    feasibility: 4,
    notes: 'Engineers are using AI widely but with inconsistent guardrails.'
  },
  {
    id: 'incident-triage',
    org: 'Dwight Schrute',
    parentOrg: 'Michael Scott',
    domain: 'Operations',
    team: 'Service Operations',
    stage: 'Operate, Support & Resilience',
    capability: 'Incident detection & management',
    defaultPlacement: 'Central',
    override: '',
    included: true,
    selectionTier: 'Must have',
    currentMaturity: 2,
    targetMaturity: 4,
    timeSpent: 4,
    frequency: 4,
    aiPotential: 4,
    scalability: 5,
    risk: 4,
    feasibility: 3,
    notes: 'Much of the work is operationally critical and highly time sensitive.'
  },
  {
    id: 'customer-onboarding',
    org: 'Pam Beesly',
    parentOrg: 'Michael Scott',
    domain: 'Customer',
    team: 'Delivery',
    stage: 'Release & Customer Adoption',
    capability: 'Customer onboarding & configuration',
    defaultPlacement: 'Hybrid',
    override: 'Team-Specific',
    included: true,
    selectionTier: 'Should have',
    currentMaturity: 2,
    targetMaturity: 4,
    timeSpent: 3,
    frequency: 3,
    aiPotential: 3,
    scalability: 3,
    risk: 2,
    feasibility: 4,
    notes: 'The process varies by customer segment and team setup.'
  },
  {
    id: 'product-analytics',
    org: 'Angela Martin',
    parentOrg: 'Michael Scott',
    domain: 'Governance',
    team: 'Compliance',
    stage: 'Learn & Optimize',
    capability: 'Product & usage analytics',
    defaultPlacement: 'Central',
    override: '',
    included: true,
    selectionTier: 'Should have',
    currentMaturity: 3,
    targetMaturity: 5,
    timeSpent: 3,
    frequency: 4,
    aiPotential: 4,
    scalability: 5,
    risk: 2,
    feasibility: 5,
    notes: 'This is promising for cross-team reporting and insight generation.'
  }
];

const state = loadState();
const scopeState = loadScope();
const trackerBody = document.getElementById('trackerBody');
const summaryGrid = document.getElementById('summaryGrid');
const stageFilter = document.getElementById('stageFilter');
const orgDomainInput = document.getElementById('orgDomain');
const orgScopeSelect = document.getElementById('orgScopeSelect');
const domainScopeSelect = document.getElementById('domainScopeSelect');
const teamScopeSelect = document.getElementById('teamScopeSelect');
const viewScopeSelect = document.getElementById('viewScopeSelect');
const resetDataBtn = document.getElementById('resetDataBtn');
const editorModal = document.getElementById('priorityEditor');
const editorBody = document.getElementById('editorBody');
const editorTitle = document.getElementById('editorTitle');
const closeEditorBtn = document.getElementById('closeEditorBtn');

function normalizeState(rows) {
  return rows.map((row) => ({
    ...row,
    org: row.org || 'X Team',
    domain: row.domain || 'Platform',
    team: row.team || 'Product',
    included: row.included ?? true,
    selectionTier: row.selectionTier || 'Should have',
    status: row.status || 'Not assessed'
  }));
}

function loadScope() {
  const saved = localStorage.getItem(SCOPE_KEY);
  if (saved) {
    try {
      return { ...{ org: 'All orgs', domain: 'All domains', team: 'All teams', view: 'Org roll-up' }, ...JSON.parse(saved) };
    } catch (error) {
      console.warn('Failed to parse saved scope state');
    }
  }
  return { org: 'All orgs', domain: 'All domains', team: 'All teams', view: 'Org roll-up' };
}

function saveScope() {
  localStorage.setItem(SCOPE_KEY, JSON.stringify(scopeState));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch (error) {
      console.warn('Failed to parse saved tracker data');
    }
  }
  return normalizeState(structuredClone(defaultState));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getStageOptions() {
  const unique = [...new Set(state.map((row) => row.stage))];
  return ['All', ...unique];
}

function computePriority(item) {
  const opportunity = item.timeSpent * item.frequency * item.aiPotential * item.scalability;
  const riskMultiplierMap = { 1: 1.0, 2: 0.9, 3: 0.75, 4: 0.55, 5: 0.35 };
  const feasibilityMultiplierMap = { 1: 0.4, 2: 0.6, 3: 0.8, 4: 0.9, 5: 1.0 };

  const riskMultiplier = riskMultiplierMap[item.risk] ?? 1;
  const feasibilityMultiplier = feasibilityMultiplierMap[item.feasibility] ?? 1;
  return Math.round(opportunity * riskMultiplier * feasibilityMultiplier);
}

function getEffectivePlacement(item) {
  if (item.override) {
    return item.override;
  }
  return item.defaultPlacement;
}

function getPriorityTier(priority) {
  if (priority >= 120) return 'P0 Invest Now';
  if (priority >= 40) return 'P1 Near-Term';
  return 'P2 Later';
}

function getBadgeClass(placement) {
  const normalized = placement.toLowerCase();
  if (normalized.includes('central')) return 'central';
  if (normalized.includes('team')) return 'team';
  return 'hybrid';
}

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function renderSummary() {
  const visible = getVisibleRows().filter((row) => row.included !== false);
  const assessed = visible.filter((row) => row.status && row.status !== 'Not assessed' && row.status !== 'N/A');
  const avgMaturity = assessed.length
    ? (assessed.reduce((sum, row) => sum + Number(row.currentMaturity), 0) / assessed.length).toFixed(1)
    : '0.0';

  const highPriorityCount = assessed.filter((row) => computePriority(row) >= 120).length;
  const centralCount = assessed.filter((row) => getEffectivePlacement(row) === 'Central').length;
  const gapCount = assessed.filter((row) => row.targetMaturity > row.currentMaturity).length;

  const scopeSummary = document.getElementById('scopeSummary');
  const scopeLabel = `${scopeState.org} / ${scopeState.domain} / ${scopeState.team} / ${scopeState.view}`;
  if (scopeSummary) {
    scopeSummary.textContent = `Scope: ${scopeLabel}`;
  }

  const cards = [
    { label: 'Average maturity', value: avgMaturity, trend: 'Current org view' },
    { label: 'P0 priorities', value: String(highPriorityCount), trend: 'High leverage' },
    { label: 'Central', value: String(centralCount), trend: 'Shared capability count' },
    { label: 'Gap items', value: String(gapCount), trend: 'Target > current' }
  ];

  summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <div class="label">${card.label}</div>
          <div class="value">${card.value}</div>
          <div class="trend">${card.trend}</div>
        </article>
      `
    )
    .join('');
}

function renderStageFilter() {
  const options = getStageOptions();
  stageFilter.innerHTML = options
    .map((option) => `<option value="${option}">${option === 'All' ? 'All stages' : option}</option>`)
    .join('');
}

function getSelectedScopeRows(rows = state) {
  let filtered = rows;

  if (scopeState.org !== 'All orgs') {
    filtered = filtered.filter((row) => {
      const sameOrg = row.org === scopeState.org;
      const underOrg = row.parentOrg === scopeState.org;
      return sameOrg || underOrg;
    });
  }

  if (scopeState.domain !== 'All domains') {
    filtered = filtered.filter((row) => row.domain === scopeState.domain);
  }

  if (scopeState.team !== 'All teams') {
    filtered = filtered.filter((row) => row.team === scopeState.team);
  }

  return filtered;
}

function getVisibleRows() {
  const selected = stageFilter.value;
  let rows = selected === 'All' ? state : state.filter((row) => row.stage === selected);
  return getSelectedScopeRows(rows);
}

function renderScopeControls() {
  const orgs = ['All orgs', 'Michael Scott', 'Pam Beesly', 'Jim Halpert', 'Dwight Schrute', 'Angela Martin'];
  const domains = ['All domains', 'Corporate', 'Customer', 'Product', 'Operations', 'Governance'];
  const teams = ['All teams', 'Leadership', 'Customer Experience', 'Product', 'Engineering', 'Delivery', 'Service Operations', 'Compliance'];

  orgScopeSelect.innerHTML = orgs.map((value) => `<option value="${value}" ${value === scopeState.org ? 'selected' : ''}>${value}</option>`).join('');
  domainScopeSelect.innerHTML = domains.map((value) => `<option value="${value}" ${value === scopeState.domain ? 'selected' : ''}>${value}</option>`).join('');
  teamScopeSelect.innerHTML = teams.map((value) => `<option value="${value}" ${value === scopeState.team ? 'selected' : ''}>${value}</option>`).join('');
  viewScopeSelect.innerHTML = ['Org roll-up', 'Team view', 'Capability library'].map((value) => `<option value="${value}" ${value === scopeState.view ? 'selected' : ''}>${value}</option>`).join('');
}

function renderHeatmap() {
  const heatmapGrid = document.getElementById('heatmapGrid');
  const stages = stageOptions;
  const levels = ['L1', 'L2', 'L3', 'L4', 'L5'];
  const cells = [];

  const scopeRows = getSelectedScopeRows();

  cells.push('<div class="heatmap-header">Stage</div>');
  levels.forEach((label) => cells.push(`<div class="heatmap-header">${label}</div>`));

  stages.forEach((stage) => {
    const relevantRows = scopeRows.filter((item) => item.stage === stage && item.included !== false);
    const capabilityNames = relevantRows.map((item) => item.capability).filter(Boolean);

    const uniqueCapabilityEntries = {};
    relevantRows.forEach((row) => {
      if (!row.capability) return;
      const normalized = row.capability.trim();
      if (!uniqueCapabilityEntries[normalized]) {
        uniqueCapabilityEntries[normalized] = [];
      }
      uniqueCapabilityEntries[normalized].push(Number(row.currentMaturity || 1));
    });

    const stageCapabilities = Object.keys(uniqueCapabilityEntries);
    const averagedCapabilities = stageCapabilities.map((name) => {
      const avg = uniqueCapabilityEntries[name].reduce((sum, value) => sum + value, 0) / uniqueCapabilityEntries[name].length;
      return { name, avg };
    });

    const capabilityText = averagedCapabilities.length ? averagedCapabilities.slice(0, 3).map((item) => item.name).join(' • ') : 'No mapped capabilities';
    const extraCount = averagedCapabilities.length > 3 ? ` +${averagedCapabilities.length - 3} more` : '';

    cells.push(`
      <div class="heatmap-stage">
        <span>${stage}</span>
        <small>${capabilityText}${extraCount}</small>
      </div>
    `);

    const assessedRows = relevantRows.filter((item) => item.status && item.status !== 'Not assessed' && item.status !== 'N/A');

    if (assessedRows.length === 0) {
      levels.forEach(() => cells.push('<div class="heatmap-cell no-data">NA</div>'));
      return;
    }

    levels.forEach((level) => {
      const targetLevel = Number(level.replace('L', ''));
      const averagedMatches = averagedCapabilities.filter((item) => Math.round(item.avg) === targetLevel).length;
      const directMatches = assessedRows.filter((item) => Number(item.currentMaturity) === targetLevel).length;
      const totalMatches = Math.max(averagedMatches, directMatches);
      const value = totalMatches > 0 ? `${totalMatches}` : '—';
      const className = totalMatches > 0 ? `heatmap-cell level-${targetLevel}` : 'heatmap-cell';
      cells.push(`<div class="${className}" title="${stage}: ${stageCapabilities.join(', ')}">${value}</div>`);
    });
  });

  heatmapGrid.innerHTML = cells.join('');
}

function handleFieldChange(id, field, value) {
  const item = state.find((row) => row.id === id);
  if (!item) return;

  if (field === 'included') {
    item[field] = value === 'true';
  } else if (field === 'selectionTier') {
    item[field] = value;
  } else {
    item[field] = field === 'currentMaturity' || field === 'targetMaturity' || field === 'timeSpent' || field === 'frequency' || field === 'aiPotential' || field === 'scalability' || field === 'risk' || field === 'feasibility' ? Number(value) : value;
  }
  saveState();
  render();
}

function renderTable() {
  const visible = getVisibleRows();

  trackerBody.innerHTML = visible
    .map((item) => {
      const effectivePlacement = getEffectivePlacement(item);
      const priority = computePriority(item);
      const tier = getPriorityTier(priority);
      const gap = item.targetMaturity - item.currentMaturity;
      const status = item.status || 'Not started';

      return `
        <tr>
          <td>${item.stage}</td>
          <td>
            <strong>${item.capability}</strong>
            <div class="muted">${item.notes}</div>
          </td>
          <td><span class="badge default">${item.defaultPlacement}</span></td>
          <td>
            <select data-id="${item.id}" data-field="override">
              <option value="">Use default</option>
              <option value="Central" ${item.override === 'Central' ? 'selected' : ''}>Central</option>
              <option value="Hybrid" ${item.override === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
              <option value="Team-Specific" ${item.override === 'Team-Specific' ? 'selected' : ''}>Team-Specific</option>
            </select>
          </td>
          <td><span class="badge ${getBadgeClass(effectivePlacement)}">${effectivePlacement}</span></td>
          <td>
            <select data-id="${item.id}" data-field="currentMaturity">
              ${[1, 2, 3, 4, 5]
                .map((value) => `<option value="${value}" ${value === item.currentMaturity ? 'selected' : ''}>L${value}</option>`)
                .join('')}
            </select>
          </td>
          <td>
            <select data-id="${item.id}" data-field="targetMaturity">
              ${[1, 2, 3, 4, 5]
                .map((value) => `<option value="${value}" ${value === item.targetMaturity ? 'selected' : ''}>L${value}</option>`)
                .join('')}
            </select>
          </td>
          <td>${gap > 0 ? '+' + gap : gap}</td>
          <td>
            <select data-id="${item.id}" data-field="included">
              <option value="true" ${item.included !== false ? 'selected' : ''}>Included</option>
              <option value="false" ${item.included === false ? 'selected' : ''}>N/A</option>
            </select>
          </td>
          <td>
            <select data-id="${item.id}" data-field="selectionTier">
              ${['Must have', 'Should have', 'Optional']
                .map((value) => `<option value="${value}" ${value === (item.selectionTier || 'Should have') ? 'selected' : ''}>${value}</option>`)
                .join('')}
            </select>
          </td>
          <td>
            <button class="priority-button" data-action="edit-priority" data-id="${item.id}">
              <strong>${priority}</strong>
              <span>${tier}</span>
            </button>
          </td>
          <td><span class="muted">See inputs</span></td>
          <td>
            <select data-id="${item.id}" data-field="status">
              ${['Not assessed', 'Not started', 'Piloting', 'Scaled', 'Deprioritized', 'N/A']
                .map((value) => `<option value="${value}" ${value === status ? 'selected' : ''}>${value}</option>`)
                .join('')}
            </select>
          </td>
          <td>${item.notes}</td>
        </tr>
      `;
    })
    .join('');

  document.querySelectorAll('[data-field]').forEach((element) => {
    element.addEventListener('change', (event) => {
      const { id, field } = event.target.dataset;
      handleFieldChange(id, field, event.target.value);
    });
  });

  document.querySelectorAll('[data-action="edit-priority"]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = state.find((row) => row.id === button.dataset.id);
      if (!item) return;
      openPriorityEditor(item);
    });
  });
}

function openPriorityEditor(item) {
  editorTitle.textContent = `${item.capability} — priority inputs`;
  editorBody.innerHTML = `
    <label class="priority-input">
      <span>Time spent</span>
      <select data-editor-id="${item.id}" data-editor-field="timeSpent">
        ${[1,2,3,4,5].map((value) => `<option value="${value}" ${value===item.timeSpent ? 'selected' : ''}>${value}</option>`).join('')}
      </select>
    </label>
    <label class="priority-input">
      <span>Frequency</span>
      <select data-editor-id="${item.id}" data-editor-field="frequency">
        ${[1,2,3,4,5].map((value) => `<option value="${value}" ${value===item.frequency ? 'selected' : ''}>${value}</option>`).join('')}
      </select>
    </label>
    <label class="priority-input">
      <span>AI potential</span>
      <select data-editor-id="${item.id}" data-editor-field="aiPotential">
        ${[1,2,3,4,5].map((value) => `<option value="${value}" ${value===item.aiPotential ? 'selected' : ''}>${value}</option>`).join('')}
      </select>
    </label>
    <label class="priority-input">
      <span>Scalability</span>
      <select data-editor-id="${item.id}" data-editor-field="scalability">
        ${[1,2,3,4,5].map((value) => `<option value="${value}" ${value===item.scalability ? 'selected' : ''}>${value}</option>`).join('')}
      </select>
    </label>
    <label class="priority-input">
      <span>Risk</span>
      <select data-editor-id="${item.id}" data-editor-field="risk">
        ${[1,2,3,4,5].map((value) => `<option value="${value}" ${value===item.risk ? 'selected' : ''}>${value}</option>`).join('')}
      </select>
    </label>
    <label class="priority-input">
      <span>Feasibility</span>
      <select data-editor-id="${item.id}" data-editor-field="feasibility">
        ${[1,2,3,4,5].map((value) => `<option value="${value}" ${value===item.feasibility ? 'selected' : ''}>${value}</option>`).join('')}
      </select>
    </label>
  `;

  editorBody.querySelectorAll('[data-editor-field]').forEach((element) => {
    element.addEventListener('change', (event) => {
      const editorField = event.target.dataset.editorField;
      const editorId = event.target.dataset.editorId;
      handleFieldChange(editorId, editorField, event.target.value);
      openPriorityEditor(state.find((row) => row.id === editorId));
    });
  });

  editorModal.classList.remove('hidden');
  editorModal.setAttribute('aria-hidden', 'false');
}

closeEditorBtn.addEventListener('click', () => {
  editorModal.classList.add('hidden');
  editorModal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', (event) => {
  if (event.target === editorModal) {
    editorModal.classList.add('hidden');
    editorModal.setAttribute('aria-hidden', 'true');
  }
});

function render() {
  renderScopeControls();
  renderSummary();
  renderHeatmap();
  renderTable();
}

stageFilter.addEventListener('change', render);
orgScopeSelect.addEventListener('change', (event) => {
  scopeState.org = event.target.value;
  saveScope();
  render();
});
domainScopeSelect.addEventListener('change', (event) => {
  scopeState.domain = event.target.value;
  saveScope();
  render();
});
teamScopeSelect.addEventListener('change', (event) => {
  scopeState.team = event.target.value;
  saveScope();
  render();
});
viewScopeSelect.addEventListener('change', (event) => {
  scopeState.view = event.target.value;
  saveScope();
  render();
});
orgDomainInput.addEventListener('input', () => {
  document.title = `${orgDomainInput.value || 'AI-Native PDLC'} Tracker`;
});

resetDataBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  state.splice(0, state.length, ...normalizeState(structuredClone(defaultState)));
  saveState();
  render();
});

renderStageFilter();
render();
