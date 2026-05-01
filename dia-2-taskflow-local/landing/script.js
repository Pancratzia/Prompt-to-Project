const translations = {
  es: {
    skip: "Saltar al contenido",
    navFeatures: "Funciones",
    navPrivacy: "Privacidad",
    navPreview: "Vista",
    navDownload: "Descarga",
    eyebrow: "Dia 02 / Prompt-to-Project",
    heroOne: "Bitacora local.",
    heroTwo: "Trabajo claro.",
    heroText: "TaskFlow Local registra lo que ya hiciste o lo que un cliente pidio, organizado por Usuario -> Cliente -> Proyecto -> Entradas.",
    download: "Descargar app",
    homeButton: "Volver al home",
    readDocs: "Ver documentacion",
    signalClient: "Cliente",
    signalProject: "Proyecto",
    signalEntry: "Entrada",
    whatEyebrow: "Que es",
    whatTitle: "No es otro gestor de tareas.",
    whatText: "Es una bitacora de escritorio para capturar solicitudes, reuniones, seguimientos y trabajo realizado sin convertirlo en deadlines, recordatorios o tableros complejos.",
    privacyEyebrow: "Privacidad",
    privacyTitle: "Tus datos se quedan en tu maquina.",
    privacyOne: "Clientes, proyectos y entradas se guardan en una base local.",
    privacyTwo: "La app funciona sin LLM y sin conexion obligatoria.",
    privacyThree: "Cada usuario ve solo sus propios registros.",
    featuresEyebrow: "Funciones",
    featuresTitle: "Hecha para resumir trabajo.",
    featureOneTitle: "Clientes y proyectos",
    featureOneText: "CRUD completo y relacion clara: un cliente puede tener varios proyectos.",
    featureTwoTitle: "Entradas de bitacora",
    featureTwoText: "Titulo, descripcion, fecha, rango, horas, tipo y estado simple.",
    featureThreeTitle: "Reportes",
    featureThreeText: "Resumen semanal, mensual, por proyecto y exportacion CSV/PDF.",
    previewEyebrow: "Vista de la app",
    previewTitle: "Una bitacora clara para el trabajo diario.",
    previewCaption: "Preview de la experiencia de escritorio: resumen, clientes, proyectos, bitacora y asistente local.",
    langEyebrow: "Espanol / Ingles",
    langTitle: "Interfaz bilingue, parser bilingue.",
    langText: "Cambia manualmente el idioma de la interfaz y procesa frases simples en espanol o ingles desde el asistente.",
    voiceEyebrow: "Voz + texto",
    voiceTitle: "Dicta si puedes. Escribe siempre.",
    voiceText: "Usa Web Speech API cuando el WebView lo soporte. Si no esta disponible, el campo manual sigue funcionando como flujo principal.",
    downloadEyebrow: "Distribucion",
    downloadTitle: "Descargas desde GitHub Releases.",
    releaseButton: "Abrir Releases",
    installOne: "Instala Rust, Node.js y dependencias de Tauri.",
    installTwo: "Ejecuta npm install dentro de app/.",
    installThree: "Usa npm run tauri:build para generar instaladores.",
    installFour: "Sube los artefactos a GitHub Releases y apunta este boton al release final.",
    footerText: "Dia 02 de Prompt-to-Project.",
    backToTop: "Volver arriba"
  },
  en: {
    skip: "Skip to content",
    navFeatures: "Features",
    navPrivacy: "Privacy",
    navPreview: "Preview",
    navDownload: "Download",
    eyebrow: "Day 02 / Prompt-to-Project",
    heroOne: "Local logbook.",
    heroTwo: "Clear work.",
    heroText: "TaskFlow Local records what you already did or what a client requested, organized by User -> Client -> Project -> Entries.",
    download: "Download app",
    homeButton: "Back to home",
    readDocs: "Read docs",
    signalClient: "Client",
    signalProject: "Project",
    signalEntry: "Entry",
    whatEyebrow: "What it is",
    whatTitle: "Not another task manager.",
    whatText: "It is a desktop logbook for client requests, meetings, follow-ups, and completed work without turning them into deadlines, reminders, or complex boards.",
    privacyEyebrow: "Privacy",
    privacyTitle: "Your data stays on your machine.",
    privacyOne: "Clients, projects, and entries are saved in a local database.",
    privacyTwo: "The app works without an LLM and without required connectivity.",
    privacyThree: "Each user sees only their own records.",
    featuresEyebrow: "Features",
    featuresTitle: "Built for work summaries.",
    featureOneTitle: "Clients and projects",
    featureOneText: "Full CRUD and a clear relationship: one client can have many projects.",
    featureTwoTitle: "Logbook entries",
    featureTwoText: "Title, description, date, range, hours, type, and simple status.",
    featureThreeTitle: "Reports",
    featureThreeText: "Weekly, monthly, project-based summaries and CSV/PDF export.",
    previewEyebrow: "App preview",
    previewTitle: "A clear logbook for daily work.",
    previewCaption: "Preview of the desktop experience: summary, clients, projects, logbook, and local assistant.",
    langEyebrow: "Spanish / English",
    langTitle: "Bilingual UI, bilingual parser.",
    langText: "Manually switch the interface language and process simple Spanish or English phrases from the assistant.",
    voiceEyebrow: "Voice + text",
    voiceTitle: "Dictate when possible. Type always.",
    voiceText: "Uses Web Speech API when the WebView supports it. If unavailable, manual text remains the main flow.",
    downloadEyebrow: "Distribution",
    downloadTitle: "Downloads from GitHub Releases.",
    releaseButton: "Open Releases",
    installOne: "Install Rust, Node.js, and Tauri prerequisites.",
    installTwo: "Run npm install inside app/.",
    installThree: "Use npm run tauri:build to generate installers.",
    installFour: "Upload artifacts to GitHub Releases and point this button to the final release.",
    footerText: "Day 02 of Prompt-to-Project.",
    backToTop: "Back to top"
  }
};

const selector = document.querySelector("#language");

function setLanguage(language) {
  const labels = translations[language] || translations.es;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (labels[key]) element.textContent = labels[key];
  });
  selector.value = language;
}

function observeAnimatedElements() {
  const animatedElements = document.querySelectorAll("[data-animate]");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animatedElements.forEach((element) => observer.observe(element));
}

selector.addEventListener("change", (event) => setLanguage(event.target.value));
setLanguage("es");
observeAnimatedElements();
