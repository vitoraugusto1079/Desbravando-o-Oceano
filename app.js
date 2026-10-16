// Controlador Principal — Abismo do Tempo

let currentEraIndex = 0;
let currentDietFilter = 'all';
let autoDiveInterval = null;
let audioCtx = null;
let isSoundActive = false;
let soundGainNode = null;
let soundFilterNode = null;

// Elementos do DOM
const eraSelectorEl = document.getElementById('era-selector');
const zonesContainerEl = document.getElementById('zones-container');
const zoneNavListEl = document.getElementById('zone-nav-list');
const dietFilterEl = document.getElementById('diet-filter');

// Telemetria
const depthValEl = document.getElementById('current-depth');
const pressureValEl = document.getElementById('current-pressure');
const lightValEl = document.getElementById('current-light');
const waterTempValEl = document.getElementById('current-water-temp');
const depthProgressEl = document.getElementById('depth-progress');
const subMarkerEl = document.getElementById('sub-marker');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initEraSelector();
  initZoneSidebar();
  renderCurrentEra();
  updateDepthTelemetry();
  initOceanCanvas();
  initModalEvents();
  initControls();
});

window.addEventListener('scroll', () => {
  updateDepthTelemetry();
});

function initEraSelector() {
  eraSelectorEl.innerHTML = ERAS_DATA.map((era, idx) => `
    <button class="era-btn ${idx === currentEraIndex ? 'active' : ''}" data-era-idx="${idx}" title="${era.name} (${era.timeAgo})">
      <span class="era-btn-label">${era.shortLabel}</span>
      <span class="era-btn-time">${era.timeAgo.replace(' Milhões de Anos Atrás', ' Ma').replace(' (Hoje)', '')}</span>
    </button>
  `).join('');

  eraSelectorEl.querySelectorAll('.era-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-era-idx'), 10);
      selectEra(idx);
    });
  });
}

function selectEra(idx) {
  currentEraIndex = idx;
  eraSelectorEl.querySelectorAll('.era-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });
  renderCurrentEra();
  updateDepthTelemetry();
  playTimeJumpChime();
}

function initZoneSidebar() {
  zoneNavListEl.innerHTML = OCEAN_ZONES_META.map(z => `
    <li class="zone-nav-item">
      <a href="#zone-${z.id}" data-zone-id="${z.id}">
        <span class="z-nav-depth">${z.depthRange}</span>
        <span class="z-nav-name">${z.shortName}</span>
      </a>
    </li>
  `).join('');
}

function getDietClass(diet) {
  if (diet.includes('Ápice')) return 'diet-apex';
  if (diet.includes('Carnívoro')) return 'diet-carnivore';
  return 'diet-filter';
}

// Tenta carregar automaticamente imagem de imagens/<id>.jpg, .png, .webp ou creature.image
function attachCustomImageIfAvailable(containerEl, creature, imgClass) {
  const candidates = creature.image
    ? [creature.image]
    : [
        `imagens/${creature.id}.jpg`,
        `imagens/${creature.id}.png`,
        `imagens/${creature.id}.webp`,
        `imagens/${creature.id}.jpeg`
      ];

  let idx = 0;
  const probe = new Image();

  function tryNext() {
    if (idx >= candidates.length) return;
    const src = candidates[idx++];
    probe.onload = () => {
      const svgWrap = containerEl.querySelector('.creature-svg-wrap');
      if (svgWrap) svgWrap.style.display = 'none';
      const img = document.createElement('img');
      img.src = src;
      img.alt = creature.name;
      img.className = imgClass;
      containerEl.appendChild(img);
    };
    probe.onerror = tryNext;
    probe.src = src;
  }

  tryNext();
}

function renderCurrentEra() {
  const era = ERAS_DATA[currentEraIndex];

  // Contar total de espécies da época
  const totalEraSpecies = Object.values(era.zones).reduce((acc, arr) => acc + arr.length, 0);

  // Atualizar variáveis CSS de cor do céu/superfície da época
  document.documentElement.style.setProperty('--era-sky-hue', era.skyHue);

  // Atualizar Popover retrátil da época
  const popoverBadge = document.getElementById('popover-badge');
  const popoverSummary = document.getElementById('popover-summary');
  const popoverSea = document.getElementById('popover-sealevel');
  const popoverTemp = document.getElementById('popover-temp');
  const popoverO2 = document.getElementById('popover-o2');
  if (popoverBadge) popoverBadge.textContent = `${era.name} (${era.timeAgo})`;
  if (popoverSummary) popoverSummary.textContent = era.summary;
  if (popoverSea) popoverSea.textContent = era.seaLevel;
  if (popoverTemp) popoverTemp.textContent = era.surfaceTemp;
  if (popoverO2) popoverO2.textContent = era.oxygen;

  // Atualizar estatísticas de época no Surface Hero
  const heroSea = document.getElementById('hero-sealevel');
  const heroTemp = document.getElementById('hero-temp');
  const heroO2 = document.getElementById('hero-o2');
  if (heroSea) heroSea.textContent = era.seaLevel;
  if (heroTemp) heroTemp.textContent = era.surfaceTemp;
  if (heroO2) heroO2.textContent = era.oxygen;

  // Atualizar Hero
  document.getElementById('hero-kicker').textContent = `ÉPOCA SELECIONADA: ${era.name.toUpperCase()} • ${totalEraSpecies} ANIMAIS CATALOGADOS`;
  document.getElementById('hero-title').textContent = era.heroTitle;
  document.getElementById('hero-desc').textContent = era.summary;

  // Renderizar as 5 Zonas Oceânicas
  zonesContainerEl.innerHTML = OCEAN_ZONES_META.map(zoneMeta => {
    const allCreatures = era.zones[zoneMeta.id] || [];
    const filteredCreatures = currentDietFilter === 'all'
      ? allCreatures
      : allCreatures.filter(c => c.diet.toLowerCase().includes(currentDietFilter.toLowerCase()));

    const cardsHTML = filteredCreatures.length > 0
      ? filteredCreatures.map(creature => `
          <article class="creature-card" data-creature-id="${creature.id}" data-zone-id="${zoneMeta.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${creature.name}">
            <div class="creature-visual">
              <span class="creature-depth-tag">⬇ ${creature.depth}</span>
              <span class="creature-diet-tag ${getDietClass(creature.diet)}">${creature.diet}</span>
              <div class="creature-svg-wrap">
                ${renderCreatureSVG(creature.shape, creature.colors[0], creature.colors[1], creature.colors[2])}
              </div>
            </div>
            <div class="creature-body">
              <h4 class="creature-name">${creature.name}</h4>
              <p class="creature-sci">${creature.scientific}</p>
              <p class="creature-summary">${creature.summary}</p>
              <div class="creature-footer">
                <span class="creature-size">📏 ${creature.sizeLabel}</span>
                <span class="creature-inspect-btn">Inspecionar →</span>
              </div>
            </div>
          </article>
        `).join('')
      : `<div style="grid-column: 1/-1; padding: 2rem; text-align:center; background: rgba(15,23,42,0.5); border-radius: 12px; color: #94a3b8;">
           Nenhuma espécie nesta zona corresponde ao filtro "${currentDietFilter}" nesta época. Experimente mudar o filtro para "Todas as Espécies".
         </div>`;

    return `
      <section class="ocean-zone zone-${zoneMeta.id}" id="zone-${zoneMeta.id}" data-min-depth="${zoneMeta.minDepth}" data-max-depth="${zoneMeta.maxDepth}">
        <div class="zone-inner">
          <div class="zone-header">
            <div>
              <div class="zone-badge-row">
                <span class="zone-depth-pill">${zoneMeta.depthRange}</span>
                <span class="zone-light-pill">☀ ${zoneMeta.light}</span>
                <span class="species-count-pill">🐟 ${filteredCreatures.length} espécies nesta zona</span>
              </div>
              <h3 class="zone-title">${zoneMeta.name}</h3>
            </div>
            <p class="zone-desc">${zoneMeta.baseDesc}</p>
          </div>
          <div class="creatures-grid">
            ${cardsHTML}
          </div>
        </div>
      </section>
    `;
  }).join('');

  // Adicionar eventos de clique e verificar imagens personalizadas em imagens/
  zonesContainerEl.querySelectorAll('.creature-card').forEach(card => {
    const cId = card.getAttribute('data-creature-id');
    const zId = card.getAttribute('data-zone-id');
    const creature = (era.zones[zId] || []).find(c => c.id === cId);
    const visualEl = card.querySelector('.creature-visual');
    if (creature && visualEl) {
      attachCustomImageIfAvailable(visualEl, creature, 'creature-custom-img');
    }

    card.addEventListener('click', () => openSpeciesModal(zId, cId));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSpeciesModal(zId, cId);
      }
    });
  });
}

// Cálculo batimétrico realista baseado no scroll
function updateDepthTelemetry() {
  const scrollTop = window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

  // Escala não-linear realista: 0 a 200m no começo, depois até 11.000m no fundo
  let depthMeters = 0;
  if (progress < 0.12) {
    depthMeters = Math.round((progress / 0.12) * 50);
  } else if (progress < 0.30) {
    depthMeters = Math.round(50 + ((progress - 0.12) / 0.18) * 150);
  } else if (progress < 0.50) {
    depthMeters = Math.round(200 + ((progress - 0.30) / 0.20) * 800);
  } else if (progress < 0.70) {
    depthMeters = Math.round(1000 + ((progress - 0.50) / 0.20) * 3000);
  } else if (progress < 0.86) {
    depthMeters = Math.round(4000 + ((progress - 0.70) / 0.16) * 2000);
  } else {
    depthMeters = Math.round(6000 + ((progress - 0.86) / 0.14) * 5000);
  }

  // Pressão: +1 atm a cada 10 metros
  const pressureAtm = Math.max(1, Math.round(1 + depthMeters / 10));

  // Luz Solar
  let lightPercent = 0;
  if (depthMeters <= 200) {
    lightPercent = Math.max(1, Math.round(100 * Math.pow(1 - depthMeters / 220, 2)));
  } else if (depthMeters < 1000) {
    lightPercent = Number((1 * (1 - (depthMeters - 200) / 800)).toFixed(2));
  } else {
    lightPercent = 0;
  }

  // Temperatura da água conforme época e profundidade
  const era = ERAS_DATA[currentEraIndex];
  const baseSurfTemp = parseFloat(era.surfaceTemp) || 20;
  const deepFloorTemp = currentEraIndex === 2 ? 7.5 : 1.8; // Cretáceo tinha fundo mais quente
  const waterTemp = (deepFloorTemp + (baseSurfTemp - deepFloorTemp) * Math.exp(-depthMeters / 650)).toFixed(1);

  depthValEl.textContent = `${depthMeters.toLocaleString('pt-BR')}m`;
  pressureValEl.textContent = `${pressureAtm.toLocaleString('pt-BR')} atm`;
  lightValEl.textContent = `${lightPercent}%`;
  waterTempValEl.textContent = `${waterTemp} °C`;

  const pct = (progress * 100).toFixed(1);
  depthProgressEl.style.height = `${pct}%`;
  subMarkerEl.style.top = `${pct}%`;

  // Destacar zona ativa na barra lateral
  const navLinks = zoneNavListEl.querySelectorAll('a');
  OCEAN_ZONES_META.forEach((z, idx) => {
    const isCurrent = depthMeters >= z.minDepth && depthMeters <= z.maxDepth;
    if (navLinks[idx]) {
      navLinks[idx].classList.toggle('active', isCurrent);
    }
  });

  // Ajustar som se sintetizador estiver ativo
  if (isSoundActive && soundFilterNode && audioCtx) {
    const cutoff = Math.max(65, 420 - progress * 340);
    soundFilterNode.frequency.setTargetAtTime(cutoff, audioCtx.currentTime, 0.1);
  }

  window.currentOceanProgress = progress;
}

// Modal de Detalhes da Criatura
function initModalEvents() {
  const modal = document.getElementById('species-modal');
  const closeBtn = document.getElementById('modal-close');

  closeBtn.addEventListener('click', closeSpeciesModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSpeciesModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpeciesModal();
  });
}

function openSpeciesModal(zoneId, creatureId) {
  const era = ERAS_DATA[currentEraIndex];
  const list = era.zones[zoneId] || [];
  const creature = list.find(c => c.id === creatureId);
  if (!creature) return;

  const zoneMeta = OCEAN_ZONES_META.find(z => z.id === zoneId);

  const modalVisualEl = document.getElementById('modal-visual');
  modalVisualEl.innerHTML = `<div class="creature-svg-wrap" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${renderCreatureSVG(
    creature.shape,
    creature.colors[0],
    creature.colors[1],
    creature.colors[2]
  )}</div>`;
  attachCustomImageIfAvailable(modalVisualEl, creature, 'modal-custom-img');

  document.getElementById('modal-tags').innerHTML = `
    <span class="zone-depth-pill">${era.name} (${era.timeAgo})</span>
    <span class="zone-light-pill">${zoneMeta ? zoneMeta.shortName : ''} • ${creature.depth}</span>
  `;

  document.getElementById('modal-title').textContent = creature.name;
  document.getElementById('modal-scientific').textContent = creature.scientific;
  document.getElementById('modal-description').textContent = creature.description;

  document.getElementById('modal-metrics').innerHTML = `
    <div class="metric-box">
      <span>Tamanho</span>
      <strong>${creature.sizeLabel}</strong>
    </div>
    <div class="metric-box">
      <span>Faixa de Profundidade</span>
      <strong>${creature.depth}</strong>
    </div>
    <div class="metric-box">
      <span>Hábito Alimentar</span>
      <strong>${creature.diet}</strong>
    </div>
  `;

  // Escala comparativa com mergulhador humano (1,80m)
  const humanSize = 1.8;
  const cSize = creature.sizeMeters || 1.0;
  const maxRef = Math.max(humanSize, cSize);
  const humanPct = Math.max(4, Math.round((humanSize / maxRef) * 100));
  const creaturePct = Math.max(4, Math.round((cSize / maxRef) * 100));

  document.getElementById('scale-human').style.width = `${humanPct}%`;
  document.getElementById('scale-creature').style.width = `${creaturePct}%`;
  document.getElementById('scale-creature-name').textContent = `${creature.name} (${cSize}m)`;

  const ratio = (cSize / humanSize).toFixed(1);
  document.getElementById('modal-size-ratio').textContent = cSize >= humanSize
    ? `${ratio}x o tamanho de um humano`
    : `${Math.round(cSize * 100)} cm vs. 1,80m`;

  document.getElementById('modal-funfact').innerHTML = `<strong>💡 Curiosidade Paleontológica / Biológica:</strong> ${creature.funFact}`;

  const modal = document.getElementById('species-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeSpeciesModal() {
  const modal = document.getElementById('species-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

// Controles Extras (Filtro, Mergulho Automático, Som Abissal, Botões do Fundo)
function initControls() {
  dietFilterEl.addEventListener('change', (e) => {
    currentDietFilter = e.target.value;
    renderCurrentEra();
  });

  const btnDiveAuto = document.getElementById('btn-dive-auto');
  btnDiveAuto.addEventListener('click', () => {
    if (autoDiveInterval) {
      stopAutoDive();
    } else {
      startAutoDive();
    }
  });

  // Toggle do Popover de Informações da Época
  const btnEraInfo = document.getElementById('btn-era-info');
  const eraPopover = document.getElementById('era-popover');
  const popoverClose = document.getElementById('popover-close');

  if (btnEraInfo && eraPopover) {
    btnEraInfo.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = eraPopover.classList.toggle('open');
      btnEraInfo.classList.toggle('active', isOpen);
      btnEraInfo.setAttribute('aria-expanded', String(isOpen));
      eraPopover.setAttribute('aria-hidden', String(!isOpen));
    });

    if (popoverClose) {
      popoverClose.addEventListener('click', () => {
        eraPopover.classList.remove('open');
        btnEraInfo.classList.remove('active');
        btnEraInfo.setAttribute('aria-expanded', 'false');
        eraPopover.setAttribute('aria-hidden', 'true');
      });
    }

    document.addEventListener('click', (e) => {
      if (!eraPopover.contains(e.target) && e.target !== btnEraInfo && !btnEraInfo.contains(e.target)) {
        eraPopover.classList.remove('open');
        btnEraInfo.classList.remove('active');
        btnEraInfo.setAttribute('aria-expanded', 'false');
        eraPopover.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Parar mergulho automático se o usuário usar a roda do mouse
  window.addEventListener('wheel', () => {
    if (autoDiveInterval) stopAutoDive();
  }, { passive: true });

  document.getElementById('btn-back-surface').addEventListener('click', () => {
    stopAutoDive();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('btn-next-era').addEventListener('click', () => {
    stopAutoDive();
    const nextIdx = (currentEraIndex + 1) % ERAS_DATA.length;
    selectEra(nextIdx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('btn-sound').addEventListener('click', toggleOceanSound);
}

function startAutoDive() {
  const btn = document.getElementById('btn-dive-auto');
  btn.classList.add('active');
  btn.innerHTML = `<span class="btn-icon">⏸</span> Pausar Mergulho`;
  autoDiveInterval = setInterval(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 4) {
      stopAutoDive();
      return;
    }
    window.scrollBy(0, 2.5);
  }, 16);
}

function stopAutoDive() {
  if (autoDiveInterval) {
    clearInterval(autoDiveInterval);
    autoDiveInterval = null;
  }
  const btn = document.getElementById('btn-dive-auto');
  btn.classList.remove('active');
  btn.innerHTML = `<span class="btn-icon">▼</span> Mergulho Guiado`;
}

// Web Audio API — Sintetizador de Ambiência Submarina e Sonar
function toggleOceanSound() {
  const btn = document.getElementById('btn-sound');
  const icon = document.getElementById('sound-icon');

  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Gerador de ruído marinho profundo filtrado
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 2.5;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    soundFilterNode = audioCtx.createBiquadFilter();
    soundFilterNode.type = 'lowpass';
    soundFilterNode.frequency.value = 260;

    soundGainNode = audioCtx.createGain();
    soundGainNode.gain.value = 0.12;

    whiteNoise.connect(soundFilterNode);
    soundFilterNode.connect(soundGainNode);
    soundGainNode.connect(audioCtx.destination);
    whiteNoise.start(0);
    isSoundActive = true;
  } else {
    isSoundActive = !isSoundActive;
    soundGainNode.gain.setTargetAtTime(isSoundActive ? 0.12 : 0.0, audioCtx.currentTime, 0.15);
  }

  btn.classList.toggle('active', isSoundActive);
  btn.setAttribute('aria-pressed', String(isSoundActive));
  icon.textContent = isSoundActive ? '🔊' : '🔇';
}

function playTimeJumpChime() {
  if (!isSoundActive || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(190, audioCtx.currentTime + 0.45);
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.46);
}

// Canvas de Partículas Submarinas (Bolhas nas águas rasas -> Bioluminescência no abismo)
function initOceanCanvas() {
  const canvas = document.getElementById('ocean-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 75 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.6 + 0.8,
    speedY: -(Math.random() * 0.65 + 0.15),
    speedX: (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2
  }));

  function animate(time) {
    ctx.clearRect(0, 0, width, height);
    const progress = window.currentOceanProgress || 0;
    const isDeep = progress > 0.35;

    for (const p of particles) {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(time * 0.001 + p.phase) * 0.2;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const pulse = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.002 + p.phase));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      if (isDeep) {
        // Bioluminescência ciano/verde nas zonas batipelágica, abissal e hadal
        ctx.fillStyle = `rgba(45, 212, 191, ${pulse * 0.65})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#2dd4bf';
      } else {
        // Bolhas e plâncton iluminado pelo sol nas águas rasas
        ctx.fillStyle = `rgba(224, 242, 254, ${pulse * 0.45})`;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
