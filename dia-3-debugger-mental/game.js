"use strict";

const SAVE_KEY = "debuggerMental.save.v1";
const LANG_KEY = "debuggerMental.lang";
const UNLOCK_KEY = "debuggerMental.unlocks.v1";

const i18n = {
  es: {
    skip: "Saltar al contenido",
    navFeatures: "Caracteristicas",
    navHow: "Como funciona",
    heroEyebrow: "Puzzle de sistemas / navegador",
    heroSubtitle: "Repara sistemas mentales, conecta ideas y estabiliza el caos.",
    playNow: "Jugar ahora",
    howItWorks: "Como funciona",
    stability: "Estabilidad",
    featuresEyebrow: "Sistema jugable",
    featuresTitle: "Un puzzle distinto cada partida.",
    featureRandom: "Sistemas generados aleatoriamente",
    featureDiagrams: "Diagramas interactivos",
    featureStrategy: "Decisiones estrategicas",
    featureSaves: "Partidas guardadas en navegador",
    featureLang: "Espanol e ingles",
    howEyebrow: "Como funciona",
    howTitle: "Observa, interviene, simula, sobrevive.",
    howText: "Cada nodo representa una variable. Las conexiones transmiten efectos. Tus recursos son limitados: ajusta nodos, corta distracciones, reestructura conexiones y busca tres turnos estables antes de que el sistema colapse.",
    disclaimer: "Debugger Mental es un juego de estrategia y simulacion. No ofrece consejo medico ni psicologico.",
    backToTop: "Volver arriba",
    chooseLanguage: "Elige idioma",
    mainMenu: "Menu principal",
    newGame: "Nueva partida",
    newGameText: "Genera un nuevo sistema mental.",
    continueGame: "Continuar partida",
    noSave: "No hay partida guardada.",
    saveFound: "Guardado: turno {turn}, {date}",
    tutorial: "Tutorial interactivo",
    tutorialText: "Aprende nodos, conexiones y turnos.",
    deleteSave: "Borrar guardado",
    deleteSaveText: "Reinicia el almacenamiento local.",
    backLanding: "Volver a landing",
    selectDifficulty: "Selecciona dificultad",
    cancel: "Cancelar",
    previous: "Anterior",
    next: "Siguiente",
    selectedNode: "Nodo seleccionado",
    objectives: "Objetivos",
    connections: "Conexiones",
    actions: "Acciones",
    systemLog: "Log del sistema",
    nextTurn: "Pasar turno",
    help: "Ayuda",
    cards: "Tarjetas",
    quickGuideTitle: "Que hacer ahora",
    quickGuide: [
      "1. Mira Objetivos: las tarjetas con OK ya estan bien.",
      "2. Elige una tarjeta critica o un objetivo sin cumplir.",
      "3. Usa 1 o 2 acciones. Las acciones dicen que suben o bajan.",
      "4. Pulsa Pasar turno para simular conexiones y eventos.",
      "Ganas cuando todos los objetivos se cumplen durante 3 turnos seguidos."
    ],
    winProgress: "Progreso para ganar: {current}/{target} turnos estables",
    desiredHigh: "Conviene subirla.",
    desiredLow: "Conviene bajarla.",
    desiredMiddle: "Mantenerla lejos de los extremos.",
    currentValue: "Valor actual",
    objectiveDone: "Listo",
    objectivePending: "Pendiente",
    playAgain: "Jugar otra vez",
    saved: "Partida guardada.",
    saveDeleted: "Guardado borrado.",
    noNode: "Selecciona un nodo del tablero.",
    actionsLeft: "{n} acciones disponibles",
    turn: "Turno",
    difficulty: "Dificultad",
    phase: "Fase",
    easy: "Facil",
    normal: "Normal",
    hard: "Dificil",
    chaos: "Caos",
    lockedChaos: "Gana una partida para desbloquear Caos.",
    easyText: "Menos nodos, mas recursos y mas margen.",
    normalText: "Una simulacion balanceada de 30 turnos.",
    hardText: "Mas conexiones problematicas y menos recursos.",
    chaosText: "Nodos inestables, eventos agresivos y pocos recursos.",
    mentalEnergy: "Energia mental",
    time: "Tiempo",
    clarity: "Claridad",
    intervention: "Intervencion",
    stable: "Estable",
    risk: "En riesgo",
    critical: "Critico",
    overloaded: "Sobrecargado",
    locked: "Bloqueado",
    improving: "Mejorando",
    worsening: "Empeorando",
    positive: "Positivo",
    negative: "Negativo",
    neutral: "Neutral",
    unstable: "Inestable",
    blocked: "Bloqueado",
    catalyst: "Catalizador",
    incoming: "Entrantes",
    outgoing: "Salientes",
    noConnections: "Sin conexiones visibles.",
    victoryKicker: "Sistema estabilizado",
    victoryTitle: "Debug completado.",
    victoryBody: "El sistema mantuvo sus objetivos durante varios turnos. Has convertido ruido en estructura.",
    defeatKicker: "Sistema colapsado",
    defeatTitle: "La simulacion fallo.",
    defeatBody: "El sistema llego a un estado critico. Ajusta prioridades y vuelve a intentarlo.",
    unlocks: "Desbloqueado: {item}",
    unlockNode: "Nodo inicial extra",
    unlockClarity: "Mas claridad inicial",
    unlockFree: "Una intervencion gratuita",
    unlockChaos: "Modo caos",
    phases: ["Diagnostico", "Estabilizacion", "Optimizacion", "Crisis", "Resolucion"],
    action_breathe: "Respirar",
    action_plan: "Planificar",
    action_rest: "Descansar",
    action_focus: "Enfocar",
    action_cut: "Cortar distraccion",
    action_rewire: "Reestructurar conexion",
    action_lock: "Bloquear nodo",
    action_analyze: "Analizar",
    actionHelp: {
      breathe: "Baja estres y ansiedad.",
      plan: "Sube organizacion y claridad.",
      rest: "Sube energia y sueno; baja un poco productividad.",
      focus: "Sube enfoque y productividad.",
      cut: "Baja procrastinacion y ruido mental.",
      rewire: "Debilita o convierte una conexion negativa de la tarjeta elegida.",
      lock: "Protege la tarjeta elegida por un turno.",
      analyze: "Muestra que influencia recibira la tarjeta elegida."
    },
    cost: "Coste",
    node_energy: "Energia",
    node_stress: "Estres",
    node_motivation: "Motivacion",
    node_focus: "Enfoque",
    node_sleep: "Sueno",
    node_discipline: "Disciplina",
    node_anxiety: "Ansiedad",
    node_creativity: "Creatividad",
    node_productivity: "Productividad",
    node_clarity: "Claridad",
    node_procrastination: "Procrastinacion",
    node_confidence: "Confianza",
    node_noise: "Ruido mental",
    node_organization: "Organizacion",
    node_time: "Tiempo disponible",
    desc_energy: "Reserva general para sostener acciones y recuperarse.",
    desc_stress: "Presion acumulada que interfiere con nodos utiles.",
    desc_motivation: "Impulso para iniciar y mantener tareas.",
    desc_focus: "Capacidad de sostener atencion sin fragmentarse.",
    desc_sleep: "Calidad de descanso que alimenta energia y estabilidad.",
    desc_discipline: "Estructura interna para repetir acciones utiles.",
    desc_anxiety: "Alarma interna que puede desbordar el sistema.",
    desc_creativity: "Capacidad de generar opciones y rutas nuevas.",
    desc_productivity: "Salida efectiva del sistema en cada turno.",
    desc_clarity: "Orden perceptivo para decidir con menos friccion.",
    desc_procrastination: "Tendencia a posponer y desplazar energia.",
    desc_confidence: "Sensacion de agencia ante el sistema.",
    desc_noise: "Interferencia mental que oculta prioridades.",
    desc_organization: "Estructura externa que reduce perdida de tiempo.",
    desc_time: "Espacio disponible para actuar sin saturacion.",
    event_badSleep: "Mala noche de sueno",
    event_productiveDay: "Dia productivo inesperado",
    event_distraction: "Distraccion fuerte",
    event_talk: "Conversacion motivadora",
    event_deadline: "Deadline urgente",
    event_noise: "Ruido mental",
    event_block: "Bloqueo creativo",
    event_repairRest: "Descanso reparador",
    event_overload: "Sobrecarga de tareas",
    event_inspiration: "Inspiracion repentina",
    tutorialTitles: ["Objetivo", "Tarjetas", "Conexiones", "Acciones", "Turnos", "Victoria y guardado"],
    tutorialBodies: [
      "Tu meta no es arreglarlo todo: cumple la lista de objetivos y mantenla 3 turnos seguidos.",
      "Cada tarjeta es una variable del sistema. Algunas conviene subirlas, otras bajarlas.",
      "Los cables positivos amplifican; los negativos interfieren. El origen transmite influencia al destino.",
      "Selecciona un nodo y usa acciones. Cada accion consume recursos y acciones del turno.",
      "Al pasar turno, las conexiones se simulan, aparecen eventos y se revisa el estado.",
      "Ganas manteniendo objetivos durante tres turnos. La partida se guarda automaticamente en este navegador."
    ]
  },
  en: {
    skip: "Skip to content",
    navFeatures: "Features",
    navHow: "How it works",
    heroEyebrow: "Systems puzzle / browser",
    heroSubtitle: "Repair mental systems, connect ideas, and stabilize chaos.",
    playNow: "Play now",
    howItWorks: "How it works",
    stability: "Stability",
    featuresEyebrow: "Playable system",
    featuresTitle: "A different puzzle every run.",
    featureRandom: "Randomly generated systems",
    featureDiagrams: "Interactive diagrams",
    featureStrategy: "Strategic decisions",
    featureSaves: "Browser saved games",
    featureLang: "Spanish and English",
    howEyebrow: "How it works",
    howTitle: "Observe, intervene, simulate, survive.",
    howText: "Each node represents a variable. Connections transmit effects. Your resources are limited: adjust nodes, cut distractions, rewire links, and hold stability for three turns before the system collapses.",
    disclaimer: "Debugger Mental is a strategy and simulation game. It does not offer medical or psychological advice.",
    backToTop: "Back to top",
    chooseLanguage: "Choose language",
    mainMenu: "Main menu",
    newGame: "New game",
    newGameText: "Generate a new mental system.",
    continueGame: "Continue game",
    noSave: "No saved game found.",
    saveFound: "Saved: turn {turn}, {date}",
    tutorial: "Interactive tutorial",
    tutorialText: "Learn nodes, connections, and turns.",
    deleteSave: "Delete save",
    deleteSaveText: "Reset local storage.",
    backLanding: "Back to landing",
    selectDifficulty: "Select difficulty",
    cancel: "Cancel",
    previous: "Previous",
    next: "Next",
    selectedNode: "Selected node",
    objectives: "Objectives",
    connections: "Connections",
    actions: "Actions",
    systemLog: "System log",
    nextTurn: "Next turn",
    help: "Help",
    cards: "Cards",
    quickGuideTitle: "What to do now",
    quickGuide: [
      "1. Check Objectives: cards marked OK are already good.",
      "2. Pick a critical card or an unmet objective.",
      "3. Use 1 or 2 actions. Actions say what they raise or lower.",
      "4. Press Next turn to simulate links and events.",
      "You win when every objective is met for 3 turns in a row."
    ],
    winProgress: "Win progress: {current}/{target} stable turns",
    desiredHigh: "Try to raise it.",
    desiredLow: "Try to lower it.",
    desiredMiddle: "Keep it away from the extremes.",
    currentValue: "Current value",
    objectiveDone: "Done",
    objectivePending: "Pending",
    playAgain: "Play again",
    saved: "Game saved.",
    saveDeleted: "Save deleted.",
    noNode: "Select a node on the board.",
    actionsLeft: "{n} actions available",
    turn: "Turn",
    difficulty: "Difficulty",
    phase: "Phase",
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    chaos: "Chaos",
    lockedChaos: "Win a run to unlock Chaos.",
    easyText: "Fewer nodes, more resources, more room.",
    normalText: "A balanced 30-turn simulation.",
    hardText: "More problematic links and fewer resources.",
    chaosText: "Unstable nodes, aggressive events, scarce resources.",
    mentalEnergy: "Mental energy",
    time: "Time",
    clarity: "Clarity",
    intervention: "Intervention",
    stable: "Stable",
    risk: "At risk",
    critical: "Critical",
    overloaded: "Overloaded",
    locked: "Locked",
    improving: "Improving",
    worsening: "Worsening",
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
    unstable: "Unstable",
    blocked: "Blocked",
    catalyst: "Catalyst",
    incoming: "Incoming",
    outgoing: "Outgoing",
    noConnections: "No visible connections.",
    victoryKicker: "System stabilized",
    victoryTitle: "Debug complete.",
    victoryBody: "The system held its goals for several turns. You turned noise into structure.",
    defeatKicker: "System collapsed",
    defeatTitle: "The simulation failed.",
    defeatBody: "The system reached a critical state. Adjust priorities and try again.",
    unlocks: "Unlocked: {item}",
    unlockNode: "Extra starting node",
    unlockClarity: "More starting clarity",
    unlockFree: "One free intervention",
    unlockChaos: "Chaos mode",
    phases: ["Diagnosis", "Stabilization", "Optimization", "Crisis", "Resolution"],
    action_breathe: "Breathe",
    action_plan: "Plan",
    action_rest: "Rest",
    action_focus: "Focus",
    action_cut: "Cut distraction",
    action_rewire: "Rewire",
    action_lock: "Lock node",
    action_analyze: "Analyze",
    actionHelp: {
      breathe: "Lowers stress and anxiety.",
      plan: "Raises organization and clarity.",
      rest: "Raises energy and sleep; lowers productivity slightly.",
      focus: "Raises focus and productivity.",
      cut: "Lowers procrastination and mental noise.",
      rewire: "Weakens or flips a negative link on the selected card.",
      lock: "Protects the selected card for one turn.",
      analyze: "Shows the influence the selected card will receive."
    },
    cost: "Cost",
    node_energy: "Energy",
    node_stress: "Stress",
    node_motivation: "Motivation",
    node_focus: "Focus",
    node_sleep: "Sleep",
    node_discipline: "Discipline",
    node_anxiety: "Anxiety",
    node_creativity: "Creativity",
    node_productivity: "Productivity",
    node_clarity: "Clarity",
    node_procrastination: "Procrastination",
    node_confidence: "Confidence",
    node_noise: "Mental noise",
    node_organization: "Organization",
    node_time: "Available time",
    desc_energy: "General reserve for sustaining actions and recovery.",
    desc_stress: "Accumulated pressure that interferes with useful nodes.",
    desc_motivation: "Drive to start and keep tasks moving.",
    desc_focus: "Ability to sustain attention without fragmentation.",
    desc_sleep: "Rest quality that feeds energy and stability.",
    desc_discipline: "Internal structure for repeating useful actions.",
    desc_anxiety: "Internal alarm that can overflow the system.",
    desc_creativity: "Capacity to generate options and new routes.",
    desc_productivity: "Effective output of the system each turn.",
    desc_clarity: "Perceptual order for lower-friction decisions.",
    desc_procrastination: "Tendency to postpone and displace energy.",
    desc_confidence: "Sense of agency inside the system.",
    desc_noise: "Mental interference hiding priorities.",
    desc_organization: "External structure that reduces time loss.",
    desc_time: "Available room to act without saturation.",
    event_badSleep: "Bad night of sleep",
    event_productiveDay: "Unexpected productive day",
    event_distraction: "Strong distraction",
    event_talk: "Motivating conversation",
    event_deadline: "Urgent deadline",
    event_noise: "Mental noise",
    event_block: "Creative block",
    event_repairRest: "Restorative break",
    event_overload: "Task overload",
    event_inspiration: "Sudden inspiration",
    tutorialTitles: ["Goal", "Cards", "Connections", "Actions", "Turns", "Victory and saving"],
    tutorialBodies: [
      "Your goal is not to fix everything: meet the objective list and hold it for 3 turns in a row.",
      "Each card is a system variable. Some should go up, others should go down.",
      "Positive wires amplify; negative wires interfere. The source influences the target.",
      "Select a node and use actions. Every action consumes resources and turn actions.",
      "When you pass the turn, links simulate, events appear, and the state is checked.",
      "You win by holding goals for three turns. The run autosaves in this browser."
    ]
  }
};

const nodeCatalog = [
  { key: "energy", type: "positive", vital: "high" },
  { key: "stress", type: "negative", vital: "low" },
  { key: "motivation", type: "positive", vital: "high" },
  { key: "focus", type: "positive", vital: "high" },
  { key: "sleep", type: "positive", vital: "high" },
  { key: "discipline", type: "positive", vital: "high" },
  { key: "anxiety", type: "negative", vital: "low" },
  { key: "creativity", type: "neutral", vital: "middle" },
  { key: "productivity", type: "positive", vital: "high" },
  { key: "clarity", type: "positive", vital: "high" },
  { key: "procrastination", type: "negative", vital: "low" },
  { key: "confidence", type: "positive", vital: "high" },
  { key: "noise", type: "negative", vital: "low" },
  { key: "organization", type: "catalyst", vital: "high" },
  { key: "time", type: "blocked", vital: "high" }
];

const difficultyConfig = {
  easy: { nodes: 8, turns: 40, resources: [14, 18, 12, 8], eventChance: .26, negRatio: .34, unstable: 0 },
  normal: { nodes: 10, turns: 32, resources: [11, 14, 10, 6], eventChance: .34, negRatio: .46, unstable: 1 },
  hard: { nodes: 12, turns: 28, resources: [9, 12, 8, 5], eventChance: .45, negRatio: .55, unstable: 2 },
  chaos: { nodes: 13, turns: 24, resources: [7, 10, 6, 4], eventChance: .62, negRatio: .65, unstable: 4 }
};

const actions = [
  { id: "breathe", cost: { mentalEnergy: 1, time: 1 }, targets: ["stress", "anxiety"], delta: -12 },
  { id: "plan", cost: { time: 1, clarity: 1 }, targets: ["organization", "clarity"], delta: 10 },
  { id: "rest", cost: { time: 2 }, targets: ["energy", "sleep"], delta: 14, side: { productivity: -5 } },
  { id: "focus", cost: { mentalEnergy: 2, clarity: 1 }, targets: ["focus", "productivity"], delta: 12 },
  { id: "cut", cost: { mentalEnergy: 1, intervention: 1 }, targets: ["procrastination", "noise"], delta: -14 },
  { id: "rewire", cost: { clarity: 2, intervention: 1 }, special: "rewire" },
  { id: "lock", cost: { intervention: 1 }, special: "lock" },
  { id: "analyze", cost: { clarity: 1 }, special: "analyze" }
];

const eventCatalog = [
  { key: "badSleep", effects: { sleep: -15, energy: -10, stress: 6 } },
  { key: "productiveDay", effects: { productivity: 12, motivation: 8, stress: -4 } },
  { key: "distraction", effects: { focus: -12, procrastination: 10, noise: 8 } },
  { key: "talk", effects: { motivation: 12, confidence: 8, anxiety: -6 } },
  { key: "deadline", effects: { stress: 14, focus: 7, anxiety: 8 } },
  { key: "noise", effects: { noise: 14, clarity: -8 } },
  { key: "block", effects: { creativity: -14, confidence: -7 } },
  { key: "repairRest", effects: { energy: 14, sleep: 9, stress: -8 } },
  { key: "overload", effects: { stress: 14, energy: -9, productivity: -6 } },
  { key: "inspiration", effects: { creativity: 16, clarity: 7, motivation: 8 } }
];

let lang = localStorage.getItem(LANG_KEY) || "es";
let gameState = null;
let selectedNodeId = null;
let tutorialIndex = 0;
let helpOpen = true;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const shuffle = (items) => [...items].sort(() => Math.random() - .5);

function t(key, vars = {}) {
  const value = i18n[lang][key] ?? i18n.es[key] ?? key;
  if (Array.isArray(value)) return value;
  return String(value).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}

function nodeName(key) { return t(`node_${key}`); }
function nodeDesc(key) { return t(`desc_${key}`); }
function actionHelp(id) { return (i18n[lang].actionHelp || i18n.es.actionHelp)[id] || ""; }

function setLanguage(nextLang) {
  lang = nextLang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  ["landing-language", "menu-language", "game-language"].forEach((id) => {
    const select = document.getElementById(id);
    if (select) select.value = lang;
  });
  applyTranslations();
  renderMenu();
  renderDifficulty();
  renderTutorial();
  if (gameState) renderGame();
}

function applyTranslations() {
  $$("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}

function showScreen(id) {
  $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id));
  if (id === "menu") renderMenu();
  if (id === "setup") renderDifficulty();
  if (id === "tutorial-screen") renderTutorial();
  if (id === "game") requestAnimationFrame(renderGame);
}

function saveGame() {
  if (!gameState) return;
  gameState.savedAt = new Date().toISOString();
  localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
  renderMenu(t("saveDeleted"));
}

function getUnlocks() {
  try {
    return JSON.parse(localStorage.getItem(UNLOCK_KEY)) || {};
  } catch {
    return {};
  }
}

function setUnlocks(next) {
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(next));
}

function generateGame(difficulty) {
  const unlocks = getUnlocks();
  const cfg = difficultyConfig[difficulty];
  const bonusNode = unlocks.extraNode ? 1 : 0;
  const selected = shuffle(nodeCatalog).slice(0, cfg.nodes + bonusNode);
  const nodes = selected.map((template, index) => {
    let type = template.type;
    if (cfg.unstable > 0 && index < cfg.unstable && type !== "blocked") type = "unstable";
    return {
      id: `n${index}`,
      key: template.key,
      type,
      vital: template.vital,
      value: initialValue(template.type),
      previousValue: 50,
      lockedTurns: 0,
      x: 8 + (index % 4) * 22 + rand(-2, 4),
      y: 8 + Math.floor(index / 4) * 26 + rand(-3, 4)
    };
  });

  const connections = [];
  const wanted = Math.max(nodes.length + 2, Math.floor(nodes.length * 1.55));
  while (connections.length < wanted) {
    const from = pick(nodes);
    const to = pick(nodes);
    if (from.id === to.id || connections.some((c) => c.from === from.id && c.to === to.id)) continue;
    const negative = Math.random() < cfg.negRatio;
    connections.push({
      id: `c${connections.length}`,
      from: from.id,
      to: to.id,
      polarity: negative ? "negative" : "positive",
      weight: rand(5, 14)
    });
  }

  const resources = {
    mentalEnergy: cfg.resources[0],
    time: cfg.resources[1],
    clarity: cfg.resources[2] + (unlocks.clarity ? 3 : 0),
    intervention: cfg.resources[3] + (unlocks.freeIntervention ? 1 : 0)
  };

  return {
    version: 1,
    lang,
    difficulty,
    turn: 1,
    maxTurns: cfg.turns,
    stableTurns: 0,
    stableTarget: 3,
    actionsLeft: 2,
    resources,
    nodes,
    connections,
    objectives: makeObjectives(nodes),
    log: [],
    events: [],
    status: "playing",
    savedAt: null
  };
}

function initialValue(type) {
  if (type === "negative") return rand(38, 68);
  if (type === "positive" || type === "catalyst") return rand(34, 66);
  return rand(28, 72);
}

function makeObjectives(nodes) {
  const objectives = [];
  const byKey = (key) => nodes.find((n) => n.key === key);
  [
    ["productivity", "above", 70],
    ["stress", "below", 45],
    ["energy", "above", 50],
    ["anxiety", "below", 55],
    ["procrastination", "below", 35],
    ["clarity", "above", 62],
    ["organization", "above", 60]
  ].forEach(([key, mode, target]) => {
    const node = byKey(key);
    if (node && objectives.length < 4) objectives.push({ nodeId: node.id, key, mode, target });
  });
  objectives.push({ type: "stablePercent", target: 70 });
  return objectives.slice(0, 5);
}

function getPhaseIndex() {
  if (!gameState) return 0;
  const ratio = gameState.turn / gameState.maxTurns;
  if (ratio < .22) return 0;
  if (ratio < .45) return 1;
  if (ratio < .66) return 2;
  if (ratio < .84) return 3;
  return 4;
}

function renderMenu(message = "") {
  const save = loadGame();
  const status = $("#save-status");
  if (!status) return;
  if (save) {
    const date = save.savedAt ? new Date(save.savedAt).toLocaleString() : "";
    status.textContent = t("saveFound", { turn: save.turn, date });
  } else {
    status.textContent = message || t("noSave");
  }
}

function renderDifficulty() {
  const grid = $("#difficulty-grid");
  if (!grid) return;
  const unlocks = getUnlocks();
  grid.innerHTML = ["easy", "normal", "hard", "chaos"].map((id, index) => {
    const locked = id === "chaos" && !unlocks.chaos;
    return `
      <button type="button" class="difficulty-card" data-difficulty="${id}" ${locked ? "disabled" : ""}>
        <span>0${index + 1}</span>
        <strong>${t(id)}</strong>
        <small>${locked ? t("lockedChaos") : t(`${id}Text`)}</small>
      </button>
    `;
  }).join("");
}

function renderGame() {
  if (!gameState) return;
  $("#phase-label").textContent = `${t("turn")} ${gameState.turn}/${gameState.maxTurns} - ${t("difficulty")}: ${t(gameState.difficulty)} - ${t("phase")}: ${t("phases")[getPhaseIndex()]}`;
  renderQuickHelp();
  renderResources();
  renderBoard();
  renderInspector();
  renderActions();
  renderLog();
}

function renderQuickHelp() {
  const panel = $("#quick-help");
  if (!panel) return;
  panel.classList.toggle("is-hidden", !helpOpen);
  panel.innerHTML = `
    <div>
      <strong>${t("quickGuideTitle")}</strong>
      <ol>${t("quickGuide").map((item) => `<li>${item}</li>`).join("")}</ol>
    </div>
    <div class="win-chip">${t("winProgress", { current: gameState.stableTurns, target: gameState.stableTarget })}</div>
  `;
}

function renderResources() {
  const labels = ["mentalEnergy", "time", "clarity", "intervention"];
  $("#resource-strip").innerHTML = labels.map((key) => `
    <span class="resource-pill">${t(key)} <strong>${gameState.resources[key]}</strong></span>
  `).join("");
}

function getNodeState(node) {
  if (node.lockedTurns > 0 || node.type === "blocked") return "locked";
  const value = node.value;
  if (node.type === "negative") {
    if (value >= 85) return "overloaded";
    if (value >= 72) return "critical";
    if (value >= 58) return "risk";
  } else {
    if (value <= 10) return "critical";
    if (value <= 28) return "risk";
    if (value >= 92 && node.type === "unstable") return "overloaded";
  }
  if (value > node.previousValue + 3) return node.type === "negative" ? "worsening" : "improving";
  if (value < node.previousValue - 3) return node.type === "negative" ? "improving" : "worsening";
  return "stable";
}

function renderBoard() {
  const layer = $("#node-layer");
  const svg = $("#connection-layer");
  layer.innerHTML = gameState.nodes.map((node) => {
    const state = getNodeState(node);
    return `
      <button type="button" class="node ${state} ${node.id === selectedNodeId ? "selected" : ""}" data-node-id="${node.id}" style="left:${node.x}%; top:${node.y}%">
        <h4>${nodeName(node.key)}</h4>
        <div class="node-value"><span>${t(node.type)}</span><strong>${node.value}</strong></div>
        <div class="meter"><span style="width:${node.value}%"></span></div>
      </button>
    `;
  }).join("");

  const board = $(".board-wrap");
  const rect = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  svg.innerHTML = gameState.connections.map((connection) => {
    const from = gameState.nodes.find((n) => n.id === connection.from);
    const to = gameState.nodes.find((n) => n.id === connection.to);
    if (!from || !to) return "";
    const x1 = rect.width * (from.x / 100) + 75;
    const y1 = rect.height * (from.y / 100) + 48;
    const x2 = rect.width * (to.x / 100) + 75;
    const y2 = rect.height * (to.y / 100) + 48;
    const mx = (x1 + x2) / 2;
    const selected = from.id === selectedNodeId || to.id === selectedNodeId;
    return `<path class="connection-path ${connection.polarity} ${selected ? "highlight" : ""}" d="M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" />`;
  }).join("");
}

function renderInspector() {
  const node = gameState.nodes.find((n) => n.id === selectedNodeId) || gameState.nodes[0];
  if (!selectedNodeId && node) selectedNodeId = node.id;
  const state = getNodeState(node);
  $("#node-details").innerHTML = node ? `
    <div class="detail-title"><h3>${nodeName(node.key)}</h3><span class="tag">${t(state)}</span></div>
    <p>${nodeDesc(node.key)}</p>
    <p><span class="tag">${t(node.type)}</span> <span class="tag">${t("currentValue")}: ${node.value}/100</span></p>
    <p class="node-advice">${desiredText(node)}</p>
  ` : `<p>${t("noNode")}</p>`;

  $("#node-list").innerHTML = gameState.nodes.map((item) => {
    const itemState = getNodeState(item);
    return `
      <button type="button" class="node-list-item ${item.id === selectedNodeId ? "selected" : ""}" data-node-id="${item.id}">
        <span><strong>${nodeName(item.key)}</strong><small>${t(itemState)}</small></span>
        <span class="node-score">${item.value}</span>
      </button>
    `;
  }).join("");

  $("#objective-list").innerHTML = gameState.objectives.map((objective) => {
    const done = isObjectiveMet(objective);
    return `<div class="objective ${done ? "done" : ""}"><strong>${done ? "OK" : "!"} ${objectiveText(objective)}</strong><span>${t(done ? "objectiveDone" : "objectivePending")}</span></div>`;
  }).join("");

  const related = gameState.connections.filter((c) => c.from === selectedNodeId || c.to === selectedNodeId);
  $("#connection-list").innerHTML = related.length ? related.map((connection) => {
    const from = gameState.nodes.find((n) => n.id === connection.from);
    const to = gameState.nodes.find((n) => n.id === connection.to);
    return `<div class="connection-item"><strong>${nodeName(from.key)} -> ${nodeName(to.key)}</strong><span>${t(connection.polarity)} / ${connection.weight}</span></div>`;
  }).join("") : `<p>${t("noConnections")}</p>`;
}

function desiredText(node) {
  if (node.type === "negative") return t("desiredLow");
  if (node.type === "positive" || node.type === "catalyst") return t("desiredHigh");
  return t("desiredMiddle");
}

function objectiveText(objective) {
  if (objective.type === "stablePercent") return `${t("stable")}: ${objective.target}%`;
  const node = gameState.nodes.find((n) => n.id === objective.nodeId);
  const word = objective.mode === "above" ? ">" : "<";
  return `${nodeName(node.key)} ${word} ${objective.target}`;
}

function isObjectiveMet(objective) {
  if (objective.type === "stablePercent") {
    return stablePercent() >= objective.target;
  }
  const node = gameState.nodes.find((n) => n.id === objective.nodeId);
  return objective.mode === "above" ? node.value >= objective.target : node.value <= objective.target;
}

function stablePercent() {
  const stableCount = gameState.nodes.filter((node) => ["stable", "improving", "locked"].includes(getNodeState(node))).length;
  return Math.round((stableCount / gameState.nodes.length) * 100);
}

function renderActions() {
  $("#actions-left").textContent = t("actionsLeft", { n: gameState.actionsLeft });
  $("#action-buttons").innerHTML = actions.map((action) => {
    const disabled = !canPay(action.cost) || gameState.actionsLeft <= 0;
    const cost = Object.entries(action.cost).map(([key, value]) => `${t(key)} ${value}`).join(", ");
    return `
      <button type="button" class="action-button" data-action-id="${action.id}" ${disabled ? "disabled" : ""}>
        <strong>${t(`action_${action.id}`)}</strong>
        <small>${actionHelp(action.id)}</small>
        <small>${t("cost")}: ${cost || "0"}</small>
      </button>
    `;
  }).join("");
}

function renderLog() {
  $("#system-log").innerHTML = gameState.log.slice(0, 12).map((entry) => `<li>${entry}</li>`).join("");
}

function canPay(cost = {}) {
  return Object.entries(cost).every(([key, value]) => gameState.resources[key] >= value);
}

function pay(cost = {}) {
  Object.entries(cost).forEach(([key, value]) => {
    gameState.resources[key] = Math.max(0, gameState.resources[key] - value);
  });
}

function applyAction(actionId) {
  const action = actions.find((item) => item.id === actionId);
  if (!gameState || !action || !canPay(action.cost) || gameState.actionsLeft <= 0) return;
  pay(action.cost);
  gameState.actionsLeft -= 1;

  if (action.special === "rewire") rewireSelected();
  else if (action.special === "lock") lockSelected();
  else if (action.special === "analyze") analyzeSelected();
  else {
    action.targets.forEach((key) => changeNodeByKey(key, action.delta));
    if (action.side) Object.entries(action.side).forEach(([key, value]) => changeNodeByKey(key, value));
    addLog(`${t(`action_${action.id}`)}: ${action.targets.map(nodeName).join(", ")}.`);
  }
  saveGame();
  renderGame();
}

function changeNodeByKey(key, delta) {
  const node = gameState.nodes.find((n) => n.key === key);
  if (node && node.lockedTurns <= 0 && node.type !== "blocked") {
    node.value = clamp(node.value + delta);
  }
}

function changeNode(node, delta) {
  if (node.lockedTurns <= 0 && node.type !== "blocked") node.value = clamp(node.value + delta);
}

function rewireSelected() {
  const related = gameState.connections
    .filter((c) => c.from === selectedNodeId || c.to === selectedNodeId)
    .sort((a, b) => b.weight - a.weight);
  const target = related.find((c) => c.polarity === "negative") || related[0];
  if (!target) return addLog(t("noConnections"));
  if (target.polarity === "negative" && target.weight <= 7) target.polarity = "positive";
  else target.weight = Math.max(3, target.weight - 5);
  addLog(`${t("action_rewire")}: ${target.polarity} ${target.weight}.`);
}

function lockSelected() {
  const node = gameState.nodes.find((n) => n.id === selectedNodeId);
  if (!node) return;
  node.lockedTurns = 1;
  addLog(`${t("action_lock")}: ${nodeName(node.key)}.`);
}

function analyzeSelected() {
  const node = gameState.nodes.find((n) => n.id === selectedNodeId);
  if (!node) return;
  const influence = gameState.connections
    .filter((c) => c.to === node.id)
    .reduce((sum, c) => {
      const from = gameState.nodes.find((n) => n.id === c.from);
      return sum + connectionDelta(from, c);
    }, 0);
  const trend = influence >= 0 ? "+" : "";
  addLog(`${t("action_analyze")}: ${nodeName(node.key)} ${trend}${Math.round(influence)} next turn.`);
}

function simulateTurn() {
  if (!gameState || gameState.status !== "playing") return;
  gameState.nodes.forEach((node) => { node.previousValue = node.value; });

  const deltas = Object.fromEntries(gameState.nodes.map((node) => [node.id, 0]));
  gameState.connections.forEach((connection) => {
    const from = gameState.nodes.find((n) => n.id === connection.from);
    deltas[connection.to] += connectionDelta(from, connection);
  });
  gameState.nodes.forEach((node) => {
    if (node.type === "unstable") deltas[node.id] += rand(-8, 8);
    changeNode(node, deltas[node.id]);
    if (node.lockedTurns > 0) node.lockedTurns -= 1;
  });

  const phase = getPhaseIndex();
  const cfg = difficultyConfig[gameState.difficulty];
  const crisisBoost = phase === 3 ? .18 : 0;
  let eventText = "";
  if (Math.random() < cfg.eventChance + crisisBoost) {
    const event = pick(eventCatalog);
    applyEvent(event, phase === 3 ? 1.35 : 1);
    gameState.events.push(event.key);
    eventText = `${t(`event_${event.key}`)}.`;
  }

  gameState.resources.time = Math.max(0, gameState.resources.time - 1);
  if (stablePercent() > 72) gameState.resources.clarity += 1;
  gameState.actionsLeft = 2;
  gameState.turn += 1;

  const danger = gameState.nodes.filter((node) => ["critical", "overloaded"].includes(getNodeState(node))).map((node) => nodeName(node.key));
  addLog(`${t("turn")} ${gameState.turn - 1}: ${eventText || "Sin evento mayor."} ${danger.length ? `${danger.join(", ")} ${t("critical").toLowerCase()}.` : `${t("stable")}: ${stablePercent()}%.`}`);

  if (checkWin()) finishGame("victory");
  else if (checkLose()) finishGame("defeat");
  else saveGame();
  renderGame();
}

function connectionDelta(from, connection) {
  const base = ((from.value - 50) / 50) * connection.weight;
  const signed = connection.polarity === "positive" ? base : -base;
  return from.type === "catalyst" ? signed * 1.25 : signed;
}

function applyEvent(event, multiplier) {
  Object.entries(event.effects).forEach(([key, delta]) => {
    changeNodeByKey(key, Math.round(delta * multiplier));
  });
}

function checkWin() {
  const objectivesMet = gameState.objectives.every(isObjectiveMet);
  const healthy = stablePercent() >= 70;
  gameState.stableTurns = objectivesMet && healthy ? gameState.stableTurns + 1 : 0;
  return gameState.stableTurns >= gameState.stableTarget;
}

function checkLose() {
  const critical = gameState.nodes.filter((node) => ["critical", "overloaded"].includes(getNodeState(node))).length;
  const vitalCrash = gameState.nodes.some((node) => (
    (node.vital === "high" && node.value <= 0) ||
    (node.vital === "low" && node.value >= 100)
  ));
  const noResources = Object.values(gameState.resources).every((value) => value <= 0);
  return critical >= 3 || vitalCrash || noResources || gameState.turn > gameState.maxTurns;
}

function finishGame(status) {
  gameState.status = status;
  saveGame();
  if (status === "victory") applyWinUnlocks();
  renderResult(status);
  showScreen("result");
}

function applyWinUnlocks() {
  const unlocks = getUnlocks();
  const order = ["extraNode", "clarity", "freeIntervention", "chaos"];
  const next = order.find((key) => !unlocks[key]);
  if (next) {
    unlocks[next] = true;
    unlocks.last = next;
    setUnlocks(unlocks);
  }
}

function renderResult(status) {
  const victory = status === "victory";
  $("#result-kicker").textContent = t(victory ? "victoryKicker" : "defeatKicker");
  $("#result-title").textContent = t(victory ? "victoryTitle" : "defeatTitle");
  $("#result-body").textContent = t(victory ? "victoryBody" : "defeatBody");
  const unlocks = getUnlocks();
  const labels = { extraNode: "unlockNode", clarity: "unlockClarity", freeIntervention: "unlockFree", chaos: "unlockChaos" };
  $("#unlock-list").innerHTML = victory && unlocks.last
    ? `<div>${t("unlocks", { item: t(labels[unlocks.last]) })}</div>`
    : "";
}

function addLog(message) {
  gameState.log.unshift(message);
}

function renderTutorial() {
  const title = $("#tutorial-title");
  if (!title) return;
  title.textContent = t("tutorialTitles")[tutorialIndex];
  $("#tutorial-body").textContent = t("tutorialBodies")[tutorialIndex];
  $("#tutorial-demo").innerHTML = tutorialMarkup(tutorialIndex);
}

function tutorialMarkup(index) {
  const blocks = [
    `<div class="objective done"><strong>OK ${nodeName("stress")} &lt; 45</strong><span>${t("objectiveDone")}</span></div><div class="objective"><strong>! ${t("stable")} 70%</strong><span>${t("objectivePending")}</span></div><div class="win-chip">${t("winProgress", { current: 1, target: 3 })}</div>`,
    `<div class="node stable" style="position:relative; left:auto; top:auto;"><h4>${nodeName("energy")}</h4><div class="node-value"><span>${t("positive")}</span><strong>68</strong></div><div class="meter"><span style="width:68%"></span></div></div>`,
    `<svg viewBox="0 0 420 120" width="100%" height="120"><path class="connection-path positive" d="M60 60 C150 10 260 110 360 60"/><path class="connection-path negative" d="M70 92 C160 145 250 10 350 34"/></svg>`,
    `<div class="action-buttons"><button class="action-button"><strong>${t("action_breathe")}</strong><small>${t("mentalEnergy")} 1</small></button><button class="action-button"><strong>${t("action_rewire")}</strong><small>${t("clarity")} 2</small></button></div>`,
    `<ol class="system-log"><li>${t("turn")} 1: ${t("event_distraction")}.</li><li>${t("turn")} 2: ${t("stable")} 72%.</li></ol>`,
    `<div class="objective done">${nodeName("stress")} &lt; 45</div><div class="objective done">${t("stable")} 70%</div>`
  ];
  return blocks[index] || blocks[0];
}

function initEvents() {
  document.addEventListener("click", (event) => {
    const route = event.target.closest("[data-route]");
    if (route) showScreen(route.dataset.route);

    const openLanguage = event.target.closest("[data-action='open-language']");
    if (openLanguage) showScreen("language-screen");

    const langButton = event.target.closest("[data-set-lang]");
    if (langButton) {
      setLanguage(langButton.dataset.setLang);
      showScreen("menu");
    }

    const menuAction = event.target.closest("[data-action]");
    if (menuAction) {
      const action = menuAction.dataset.action;
      if (action === "new-game") showScreen("setup");
      if (action === "continue-game") {
        const save = loadGame();
        if (save) {
          gameState = save;
          selectedNodeId = gameState.nodes[0]?.id || null;
          showScreen("game");
        }
      }
      if (action === "delete-save") deleteSave();
      if (action === "tutorial") { tutorialIndex = 0; showScreen("tutorial-screen"); }
      if (action === "tutorial-prev") { tutorialIndex = Math.max(0, tutorialIndex - 1); renderTutorial(); }
      if (action === "tutorial-next") {
        if (tutorialIndex >= t("tutorialTitles").length - 1) showScreen("menu");
        else { tutorialIndex += 1; renderTutorial(); }
      }
      if (action === "toggle-help") { helpOpen = !helpOpen; renderQuickHelp(); }
      if (action === "save-game") { saveGame(); addLog(t("saved")); renderGame(); }
      if (action === "next-turn") simulateTurn();
    }

    const diff = event.target.closest("[data-difficulty]");
    if (diff && !diff.disabled) {
      gameState = generateGame(diff.dataset.difficulty);
      selectedNodeId = gameState.nodes[0].id;
      addLog(`${t("newGame")}: ${t(diff.dataset.difficulty)}.`);
      saveGame();
      showScreen("game");
    }

    const nodeButton = event.target.closest("[data-node-id]");
    if (nodeButton) {
      selectedNodeId = nodeButton.dataset.nodeId;
      renderGame();
    }

    const actionButton = event.target.closest("[data-action-id]");
    if (actionButton) applyAction(actionButton.dataset.actionId);
  });

  ["landing-language", "menu-language", "game-language"].forEach((id) => {
    const select = document.getElementById(id);
    if (select) select.addEventListener("change", () => setLanguage(select.value));
  });

  window.addEventListener("resize", () => {
    if (gameState && $("#game").classList.contains("active")) renderBoard();
  });
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: .15 });
  $$("[data-animate]").forEach((el) => observer.observe(el));
}

function boot() {
  initEvents();
  initAnimations();
  setLanguage(lang);
}

boot();
