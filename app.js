const STORAGE_KEY = 'ai-pdlc-tracker-demo-v1';

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
    stage: 'Discover & Plan',
    capability: 'Customer research',
    defaultPlacement: 'Team-Specific',
    override: '',
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
    id: 'roadmap-prioritization',
    stage: 'Discover & Plan',
    capability: 'Roadmap prioritization',
    defaultPlacement: 'Hybrid',
    override: 'Central',
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
    stage: 'Define & Design',
    capability: 'PRD drafting',
    defaultPlacement: 'Central',
    override: '',
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
    stage: 'Define & Design',
    capability: 'Architecture & design reviews',
    defaultPlacement: 'Hybrid',
    override: 'Hybrid',
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
    stage: 'Build & Validate',
    capability: 'AI-assisted coding',
    defaultPlacement: 'Team-Specific',
    override: '',
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
    stage: 'Operate, Support & Resilience',
    capability: 'Incident detection & management',
    defaultPlacement: 'Central',
    override: '',
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
    stage: 'Release & Customer Adoption',
    capability: 'Customer onboarding & configuration',
    defaultPlacement: 'Hybrid',
    override: 'Team-Specific',
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
    stage: 'Learn & Optimize',
    capability: 'Product & usage analytics',
    defaultPlacement: 'Central',
    override: '',
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
const trackerBody = document.getElementById('trackerBody');
const summaryGrid = document.getElementById('summaryGrid');
const stageFilter = document.getElementById('stageFilter');
const orgDomainInput = document.getElementById('orgDomain');
const resetDataBtn = document.getElementById('resetDataBtn');
const editorModal = document.getElementById('priorityEditor');
const editorBody = document.getElementById('editorBody');
const editorTitle = document.getElementById('editorTitle');
const closeEditorBtn = document.getElementById('closeEditorBtn');

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.warn('Failed to parse saved tracker data');
    }
  }
  return structuredClone(defaultState);
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
  const visible = getVisibleRows();
  const avgMaturity = visible.length
    ? (visible.reduce((sum, row) => sum + Number(row.currentMaturity), 0) / visible.length).toFixed(1)
    : '0.0';

  const highPriorityCount = visible.filter((row) => computePriority(row) >= 120).length;
  const centralCount = visible.filter((row) => getEffectivePlacement(row) === 'Central').length;
  const gapCount = visible.filter((row) => row.targetMaturity > row.currentMaturity).length;

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

function getVisibleRows() {
  const selected = stageFilter.value;
  if (selected === 'All') {
    return state;
  }
  return state.filter((row) => row.stage === selected);
}

function handleFieldChange(id, field, value) {
  const item = state.find((row) => row.id === id);
  if (!item) return;

  item[field] = field === 'currentMaturity' || field === 'targetMaturity' ? Number(value) : value;
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
      const status = gap <= 0 ? 'Scaled' : (priority >= 120 ? 'Piloting' : 'Not started');

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
            <button class="priority-button" data-action="edit-priority" data-id="${item.id}">
              <strong>${priority}</strong>
              <span>${tier}</span>
            </button>
          </td>
          <td><span class="muted">See inputs</span></td>
          <td><span class="status-pill ${getStatusClass(status)}">${status}</span></td>
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
  renderSummary();
  renderTable();
}

stageFilter.addEventListener('change', renderSummary);
orgDomainInput.addEventListener('input', () => {
  document.title = `${orgDomainInput.value || 'AI-Native PDLC'} Tracker`;
});

resetDataBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  state.splice(0, state.length, ...structuredClone(defaultState));
  saveState();
  render();
});

renderStageFilter();
render();
