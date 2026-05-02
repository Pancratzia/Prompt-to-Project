const copy = {
  es: {
    skip: "Saltar al contenido",
    primaryNavigation: "Navegacion principal",
    languageSelector: "Selector de idioma",
    languageLabel: "Idioma",
    navFeatures: "Funciones",
    navLocal: "Local",
    navApp: "Abrir app",
    eyebrow: "Dia 04 / Pomodoro + YouTube",
    heroText: "Planea tus Pomodoros, pega videos de YouTube y deja que la app guarde exactamente donde quedaste entre descansos.",
    openApp: "Abrir app local",
    readNotes: "Leer notas",
    panelLabel: "Build actual",
    signalStorage: "Persistencia",
    signalVideo: "Video",
    signalDeploy: "Deploy",
    featuresEyebrow: "Que hace",
    featuresTitle: "Descansos con video, sin perder el hilo.",
    featureOneTitle: "Ciclos configurables",
    featureOneText: "Configura enfoque, descanso y cantidad de Pomodoros para el dia.",
    featureTwoTitle: "Video solo en descanso",
    featureTwoText: "El video se reproduce en descanso, se pausa al terminar y retoma desde el timestamp guardado.",
    featureThreeTitle: "Historial local",
    featureThreeText: "Guarda energia, enfoque, tiempo consumido de video y sugerencias para el proximo ciclo.",
    previewEyebrow: "Captura",
    previewTitle: "La app corre como build estatica.",
    previewCaption: "El temporizador, el historial y el progreso de YouTube viven en el navegador. No hay backend, cuenta ni nube.",
    localEyebrow: "Netlify ready",
    localTitle: "Sin servidor. Sin cuenta. Sin nube.",
    localText: "La app usa localStorage para guardar plan diario, ciclos, ajustes y progreso de videos. Es una build estatica que puede publicarse en Netlify.",
    footer: "Dia 04 de Prompt-to-Project.",
    footerFolder: "Carpeta Dia 04",
    backToTop: "Volver arriba"
  },
  en: {
    skip: "Skip to content",
    primaryNavigation: "Primary navigation",
    languageSelector: "Language selector",
    languageLabel: "Language",
    navFeatures: "Features",
    navLocal: "Local",
    navApp: "Open app",
    eyebrow: "Day 04 / Pomodoro + YouTube",
    heroText: "Plan your Pomodoros, paste YouTube videos, and let the app save the exact spot where each break ended.",
    openApp: "Open local app",
    readNotes: "Read notes",
    panelLabel: "Current build",
    signalStorage: "Persistence",
    signalVideo: "Video",
    signalDeploy: "Deploy",
    featuresEyebrow: "What it does",
    featuresTitle: "Video breaks without losing your place.",
    featureOneTitle: "Configurable cycles",
    featureOneText: "Configure focus, break, and the number of Pomodoros for the day.",
    featureTwoTitle: "Video only on break",
    featureTwoText: "Video plays during breaks, pauses when time is up, and resumes from the saved timestamp.",
    featureThreeTitle: "Local history",
    featureThreeText: "Save energy, focus, consumed video time, and suggestions for the next cycle.",
    previewEyebrow: "Screenshot",
    previewTitle: "The app runs as a static build.",
    previewCaption: "The timer, history, and YouTube progress live in the browser. No backend, account, or cloud.",
    localEyebrow: "Netlify ready",
    localTitle: "No server. No account. No cloud.",
    localText: "The app uses localStorage for the daily plan, cycles, settings, and video progress. It is a static build ready for Netlify.",
    footer: "Day 04 of Prompt-to-Project.",
    footerFolder: "Day 04 folder",
    backToTop: "Back to top"
  }
};

const languageSelect = document.querySelector("#language");
const saved = localStorage.getItem("focustube-landing-language") || "es";

function setLanguage(language) {
  const labels = copy[language] || copy.es;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = labels[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const value = labels[element.dataset.i18nAriaLabel];
    if (value) element.setAttribute("aria-label", value);
  });
  languageSelect.value = language;
  localStorage.setItem("focustube-landing-language", language);
  observeAnimatedElements();
}

function observeAnimatedElements() {
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedElements.forEach((element) => {
    if (!element.classList.contains("is-visible")) observer.observe(element);
  });
}

languageSelect.addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

setLanguage(copy[saved] ? saved : "es");
