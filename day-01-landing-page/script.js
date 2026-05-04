const repoUrl = "https://github.com/Pancratzia/Prompt-to-Project";
const dayOneFolderUrl = "./index.html";
const taskFlowLandingUrl = "../dia-2-taskflow-local/landing/index.html";
const debuggerMentalUrl = "../dia-3-debugger-mental/index.html";
const focusTubeLandingUrl = "../dia-4-focustube-pomodoro/landing/index.html";
const weatherRoutineUrl = "../dia-5-weather-routine-dashboard/index.html";

const translations = {
  en: {
    skip: "Skip to content",
    primaryNavigation: "Primary navigation",
    homeLabel: "Prompt-to-Project home",
    languageSelector: "Choose language",
    signalBoard: "Project signal board",
    brand: "Prompt-to-Project",
    navProjects: "Projects",
    navPhilosophy: "Method",
    navRepo: "Repo",
    languageLabel: "Language",
    heroEyebrow: "Day 05 / Current shipped build",
    heroTitleLineOne: "Prompts in.",
    heroTitleLineTwo: "Projects out.",
    heroText:
      "One AI-assisted project per day. The feature is not always AI; the practice is prompting, iterating, and shipping with receipts.",
    heroPrimary: "Open Day 05",
    heroRepo: "View GitHub repo",
    panelLabel: "Current build",
    signalPrompt: "Prompt trail",
    signalPromptValue: "Weather + Routine",
    signalBuild: "Build mode",
    signalShip: "Ship state",
    signalToday: "Day 05 live",
    aboutEyebrow: "Why it exists",
    aboutTitle: "A daily archive of shipped practice.",
    aboutText:
      "Each day pairs code with the prompts, revisions, constraints, and lessons behind it. The output matters, but the working trail is the point.",
    projectsEyebrow: "Build archive",
    projectsTitle: "Daily projects",
    projectsRepo: "Open repository",
    projectOpen: "Open project",
    projectScreenshotAlt: "Project screenshot",
    previewEyebrow: "Day 05 preview",
    previewTitle: "Weather + Routine Dashboard is now in the archive.",
    previewLink: "Open Weather + Routine",
    previewCaption: "A bilingual weather dashboard with local tasks, Open-Meteo data, and weather-based visual themes.",
    previewMockLabel: "Weather dashboard preview",
    previewMockLocation: "Madrid, Spain",
    previewMockCondition: "Clear sky",
    previewMockSuggestion: "Today is a good day to take a walk and handle one outdoor errand.",
    philosophyEyebrow: "Prompting philosophy",
    philosophyTitle: "Prompting is the craft. Shipping is the proof.",
    principleOneTitle: "Set the frame",
    principleOneText: "Strong prompts define audience, constraints, quality bar, and what not to build.",
    principleTwoTitle: "Iterate in public",
    principleTwoText: "The useful knowledge lives in the revisions, misses, and choices between versions.",
    principleThreeTitle: "Ship the artifact",
    principleThreeText: "A small finished project beats an endless concept. Code, notes, lesson, next day.",
    rulesEyebrow: "Operating rules",
    rulesTitle: "Lightweight, visible, finished.",
    ruleOne: "Build one focused project every day.",
    ruleTwo: "Keep prompts, lessons, and code together.",
    ruleThree: "Use AI as a collaborator, not a gimmick.",
    ruleFour: "Refine the prompt after seeing the result.",
    footerBuilt: "Built by Pancratzia.",
    footerText: "Day 01 of Prompt-to-Project.",
    footerFolder: "Day 01 folder",
    footerProfile: "Creator profile",
    footerRepo: "Main repository",
    backToTop: "Back to top",
    projects: [
      {
        day: "Day 01",
        title: "Landing Page",
        description: "Main hub for the challenge: prompts, code, lessons, and shipped practice.",
        status: "Live",
        url: dayOneFolderUrl,
        screenshot: "assets/day-01-landing-screenshot.png",
        screenshotAlt: "Prompt-to-Project landing page screenshot"
      },
      {
        day: "Day 02",
        title: "TaskFlow Local",
        description: "A local desktop work log for clients, projects, natural-language entries, reports, and offline SQLite storage.",
        status: "Live",
        url: taskFlowLandingUrl,
        screenshot: "assets/taskflow-local-screenshot.png"
      },
      {
        day: "Day 03",
        title: "Debugger Mental",
        description: "A bilingual browser puzzle for stabilizing abstract mental systems through cards, connections, actions, events, and saved runs.",
        status: "Live",
        url: debuggerMentalUrl,
        screenshot: "assets/debugger-mental-screenshot.png",
        screenshotAlt: "Debugger Mental browser game screenshot"
      },
      {
        day: "Day 04",
        title: "FocusTube Pomodoro",
        description: "A static bilingual Pomodoro app that plays YouTube during breaks and saves video timestamps locally.",
        status: "Live",
        url: focusTubeLandingUrl,
        screenshot: "assets/focustube-pomodoro-screenshot.png",
        screenshotAlt: "FocusTube Pomodoro app screenshot"
      },
      {
        day: "Day 05",
        title: "Weather + Routine Dashboard",
        description: "A bilingual weather dashboard with Open-Meteo, dynamic weather themes, daily suggestions, and local tasks.",
        status: "Live",
        url: weatherRoutineUrl,
        screenshotAlt: "Weather and routine dashboard preview"
      }
    ]
  },
  es: {
    skip: "Saltar al contenido",
    primaryNavigation: "Navegación principal",
    homeLabel: "Inicio de Prompt-to-Project",
    languageSelector: "Elegir idioma",
    signalBoard: "Panel de señales del proyecto",
    brand: "Prompt-to-Project",
    navProjects: "Proyectos",
    navPhilosophy: "Método",
    navRepo: "Repo",
    languageLabel: "Idioma",
    heroEyebrow: "Dia 05 / Build publicado actual",
    heroTitleLineOne: "Prompts entran.",
    heroTitleLineTwo: "Proyectos salen.",
    heroText:
      "Un proyecto asistido por IA cada día. La función no siempre es IA; la práctica es promptar, iterar y publicar con evidencia.",
    heroPrimary: "Abrir Dia 05",
    heroRepo: "Ver repo en GitHub",
    panelLabel: "Build actual",
    signalPrompt: "Rastro de prompts",
    signalPromptValue: "Clima + Rutina",
    signalBuild: "Modo de build",
    signalShip: "Estado",
    signalToday: "Dia 05 activo",
    aboutEyebrow: "Por qué existe",
    aboutTitle: "Un archivo diario de práctica publicada.",
    aboutText:
      "Cada día une código con los prompts, revisiones, límites y aprendizajes que lo hicieron posible. El resultado importa, pero el proceso visible es el centro.",
    projectsEyebrow: "Archivo de builds",
    projectsTitle: "Proyectos diarios",
    projectsRepo: "Abrir repositorio",
    projectOpen: "Abrir proyecto",
    projectScreenshotAlt: "Captura del proyecto",
    previewEyebrow: "Vista del Dia 05",
    previewTitle: "Clima + Rutina ya esta en el archivo.",
    previewLink: "Abrir Clima + Rutina",
    previewCaption: "Dashboard bilingue de clima con tareas locales, datos de Open-Meteo y temas visuales segun el tiempo.",
    previewMockLabel: "Vista previa del dashboard de clima",
    previewMockLocation: "Madrid, Espana",
    previewMockCondition: "Cielo despejado",
    previewMockSuggestion: "Hoy es un buen dia para caminar y resolver un pendiente afuera.",
    philosophyEyebrow: "Filosofía de prompts",
    philosophyTitle: "Promptar es el oficio. Publicar es la prueba.",
    principleOneTitle: "Definir el marco",
    principleOneText: "Un buen prompt fija audiencia, límites, calidad esperada y qué no construir.",
    principleTwoTitle: "Iterar en público",
    principleTwoText: "El conocimiento útil vive en revisiones, errores y decisiones entre versiones.",
    principleThreeTitle: "Publicar el artefacto",
    principleThreeText: "Un proyecto pequeño y terminado gana a una idea infinita. Código, notas, lección y siguiente día.",
    rulesEyebrow: "Reglas de trabajo",
    rulesTitle: "Ligero, visible, terminado.",
    ruleOne: "Construir un proyecto enfocado cada día.",
    ruleTwo: "Mantener prompts, lecciones y código juntos.",
    ruleThree: "Usar la IA como colaboradora, no como truco.",
    ruleFour: "Refinar el prompt después de ver el resultado.",
    footerBuilt: "Creado por Pancratzia.",
    footerText: "Día 01 de Prompt-to-Project.",
    footerFolder: "Carpeta Día 01",
    footerProfile: "Perfil del creador",
    footerRepo: "Repositorio principal",
    backToTop: "Volver arriba",
    projects: [
      {
        day: "Día 01",
        title: "Landing Page",
        description: "Hub del reto: prompts, código, lecciones y práctica publicada.",
        status: "Activo",
        url: dayOneFolderUrl,
        screenshot: "assets/day-01-landing-screenshot.png",
        screenshotAlt: "Captura de la landing Prompt-to-Project"
      },
      {
        day: "Dia 02",
        title: "TaskFlow Local",
        description: "Bitacora local de escritorio para clientes, proyectos, entradas en lenguaje natural, reportes y SQLite offline.",
        status: "Activo",
        url: taskFlowLandingUrl,
        screenshot: "assets/taskflow-local-screenshot.png"
      },
      {
        day: "Dia 03",
        title: "Debugger Mental",
        description: "Puzzle bilingue de navegador para estabilizar sistemas mentales abstractos con tarjetas, conexiones, acciones, eventos y partidas guardadas.",
        status: "Activo",
        url: debuggerMentalUrl,
        screenshot: "assets/debugger-mental-screenshot.png",
        screenshotAlt: "Captura del juego Debugger Mental"
      },
      {
        day: "Dia 04",
        title: "FocusTube Pomodoro",
        description: "Pomodoro bilingue estatico que reproduce YouTube en descansos y guarda timestamps localmente.",
        status: "Activo",
        url: focusTubeLandingUrl,
        screenshot: "assets/focustube-pomodoro-screenshot.png",
        screenshotAlt: "Captura de FocusTube Pomodoro"
      },
      {
        day: "Dia 05",
        title: "Clima + Rutina",
        description: "Dashboard bilingue de clima con Open-Meteo, temas dinamicos, sugerencias diarias y tareas locales.",
        status: "Activo",
        url: weatherRoutineUrl,
        screenshotAlt: "Vista previa del dashboard Clima + Rutina"
      }
    ]
  },
  it: {
    skip: "Vai al contenuto",
    primaryNavigation: "Navigazione principale",
    homeLabel: "Home di Prompt-to-Project",
    languageSelector: "Scegli lingua",
    signalBoard: "Pannello segnali del progetto",
    brand: "Prompt-to-Project",
    navProjects: "Progetti",
    navPhilosophy: "Metodo",
    navRepo: "Repo",
    languageLabel: "Lingua",
    heroEyebrow: "Giorno 05 / Build pubblicata attuale",
    heroTitleLineOne: "Prompt dentro.",
    heroTitleLineTwo: "Progetti fuori.",
    heroText:
      "Un progetto assistito dall'IA ogni giorno. La funzione non è sempre IA; la pratica è prompt, iterazione e pubblicazione con tracce.",
    heroPrimary: "Apri Giorno 05",
    heroRepo: "Vedi repo GitHub",
    panelLabel: "Build attuale",
    signalPrompt: "Traccia prompt",
    signalPromptValue: "Meteo + Routine",
    signalBuild: "Modalità build",
    signalShip: "Stato",
    signalToday: "Giorno 05 online",
    aboutEyebrow: "Perché esiste",
    aboutTitle: "Un archivio quotidiano di pratica pubblicata.",
    aboutText:
      "Ogni giorno unisce codice, prompt, revisioni, vincoli e lezioni. Il risultato conta, ma la traccia del lavoro è il punto.",
    projectsEyebrow: "Archivio build",
    projectsTitle: "Progetti quotidiani",
    projectsRepo: "Apri repository",
    projectOpen: "Apri progetto",
    projectScreenshotAlt: "Screenshot del progetto",
    previewEyebrow: "Anteprima Giorno 05",
    previewTitle: "Meteo + Routine e ora nell archivio.",
    previewLink: "Apri Meteo + Routine",
    previewCaption: "Dashboard meteo bilingue con task locali, dati Open-Meteo e temi visivi dinamici.",
    previewMockLabel: "Anteprima dashboard meteo",
    previewMockLocation: "Madrid, Spagna",
    previewMockCondition: "Cielo sereno",
    previewMockSuggestion: "Oggi e una buona giornata per camminare e fare una commissione all'aperto.",
    philosophyEyebrow: "Filosofia dei prompt",
    philosophyTitle: "Il prompt è il mestiere. La pubblicazione è la prova.",
    principleOneTitle: "Imposta il frame",
    principleOneText: "Un prompt forte chiarisce pubblico, vincoli, qualità attesa e cosa evitare.",
    principleTwoTitle: "Itera in pubblico",
    principleTwoText: "La conoscenza utile sta in revisioni, errori e scelte tra versioni.",
    principleThreeTitle: "Pubblica l'artefatto",
    principleThreeText: "Un piccolo progetto finito batte un'idea infinita. Codice, note, lezione, giorno dopo.",
    rulesEyebrow: "Regole operative",
    rulesTitle: "Leggero, visibile, finito.",
    ruleOne: "Costruire ogni giorno un progetto mirato.",
    ruleTwo: "Tenere insieme prompt, lezioni e codice.",
    ruleThree: "Usare l'IA come collaboratrice, non come trucco.",
    ruleFour: "Rifinire il prompt dopo il risultato.",
    footerBuilt: "Creato da Pancratzia.",
    footerText: "Giorno 01 di Prompt-to-Project.",
    footerFolder: "Cartella Giorno 01",
    footerProfile: "Profilo creator",
    footerRepo: "Repository principale",
    backToTop: "Torna su",
    projects: [
      {
        day: "Giorno 01",
        title: "Landing Page",
        description: "Hub della sfida: prompt, codice, lezioni e pratica pubblicata.",
        status: "Online",
        url: dayOneFolderUrl,
        screenshot: "assets/day-01-landing-screenshot.png",
        screenshotAlt: "Screenshot della landing Prompt-to-Project"
      },
      {
        day: "Giorno 02",
        title: "TaskFlow Local",
        description: "Diario desktop locale per clienti, progetti, voci in linguaggio naturale, report e SQLite offline.",
        status: "Online",
        url: taskFlowLandingUrl,
        screenshot: "assets/taskflow-local-screenshot.png"
      },
      {
        day: "Giorno 03",
        title: "Debugger Mental",
        description: "Puzzle browser bilingue per stabilizzare sistemi mentali astratti con carte, connessioni, azioni, eventi e partite salvate.",
        status: "Online",
        url: debuggerMentalUrl,
        screenshot: "assets/debugger-mental-screenshot.png",
        screenshotAlt: "Screenshot del gioco Debugger Mental"
      },
      {
        day: "Giorno 04",
        title: "FocusTube Pomodoro",
        description: "Pomodoro statico bilingue che riproduce YouTube durante le pause e salva timestamp localmente.",
        status: "Online",
        url: focusTubeLandingUrl,
        screenshot: "assets/focustube-pomodoro-screenshot.png",
        screenshotAlt: "Screenshot di FocusTube Pomodoro"
      },
      {
        day: "Giorno 05",
        title: "Meteo + Routine",
        description: "Dashboard meteo bilingue con Open-Meteo, temi dinamici, suggerimenti quotidiani e task locali.",
        status: "Online",
        url: weatherRoutineUrl,
        screenshotAlt: "Anteprima dashboard Meteo + Routine"
      }
    ]
  },
  fr: {
    skip: "Aller au contenu",
    primaryNavigation: "Navigation principale",
    homeLabel: "Accueil de Prompt-to-Project",
    languageSelector: "Choisir la langue",
    signalBoard: "Tableau de signaux du projet",
    brand: "Prompt-to-Project",
    navProjects: "Projets",
    navPhilosophy: "Méthode",
    navRepo: "Repo",
    languageLabel: "Langue",
    heroEyebrow: "Jour 05 / Build actuelle livree",
    heroTitleLineOne: "Prompts entrés.",
    heroTitleLineTwo: "Projets livrés.",
    heroText:
      "Un projet assisté par IA chaque jour. La fonction n'est pas toujours IA; la pratique, c'est prompter, itérer et livrer avec des traces.",
    heroPrimary: "Ouvrir Jour 05",
    heroRepo: "Voir le repo GitHub",
    panelLabel: "Build actuel",
    signalPrompt: "Trace des prompts",
    signalPromptValue: "Meteo + Routine",
    signalBuild: "Mode build",
    signalShip: "État",
    signalToday: "Jour 05 en ligne",
    aboutEyebrow: "Pourquoi ça existe",
    aboutTitle: "Une archive quotidienne de pratique livrée.",
    aboutText:
      "Chaque jour relie le code aux prompts, révisions, contraintes et leçons. Le résultat compte, mais la trace du travail est centrale.",
    projectsEyebrow: "Archive des builds",
    projectsTitle: "Projets quotidiens",
    projectsRepo: "Ouvrir le dépôt",
    projectOpen: "Ouvrir le projet",
    projectScreenshotAlt: "Capture du projet",
    previewEyebrow: "Apercu Jour 05",
    previewTitle: "Meteo + Routine est maintenant dans l archive.",
    previewLink: "Ouvrir Meteo + Routine",
    previewCaption: "Dashboard meteo bilingue avec taches locales, donnees Open-Meteo et themes visuels dynamiques.",
    previewMockLabel: "Apercu du dashboard meteo",
    previewMockLocation: "Madrid, Espagne",
    previewMockCondition: "Ciel degage",
    previewMockSuggestion: "Aujourd'hui est un bon jour pour marcher et faire une course dehors.",
    philosophyEyebrow: "Philosophie du prompt",
    philosophyTitle: "Le prompt est le métier. La livraison est la preuve.",
    principleOneTitle: "Poser le cadre",
    principleOneText: "Un prompt fort définit public, contraintes, niveau de qualité et ce qu'il faut éviter.",
    principleTwoTitle: "Itérer en public",
    principleTwoText: "Le savoir utile vit dans les révisions, les ratés et les choix entre versions.",
    principleThreeTitle: "Livrer l'objet",
    principleThreeText: "Un petit projet fini vaut mieux qu'une idée infinie. Code, notes, leçon, lendemain.",
    rulesEyebrow: "Règles de travail",
    rulesTitle: "Léger, visible, terminé.",
    ruleOne: "Construire un projet ciblé chaque jour.",
    ruleTwo: "Garder prompts, leçons et code ensemble.",
    ruleThree: "Utiliser l'IA comme partenaire, pas comme gadget.",
    ruleFour: "Affiner le prompt après le résultat.",
    footerBuilt: "Créé par Pancratzia.",
    footerText: "Jour 01 de Prompt-to-Project.",
    footerFolder: "Dossier Jour 01",
    footerProfile: "Profil du créateur",
    footerRepo: "Dépôt principal",
    backToTop: "Retour en haut",
    projects: [
      {
        day: "Jour 01",
        title: "Landing Page",
        description: "Hub du défi: prompts, code, leçons et pratique livrée.",
        status: "En ligne",
        url: dayOneFolderUrl,
        screenshot: "assets/day-01-landing-screenshot.png",
        screenshotAlt: "Capture de la landing Prompt-to-Project"
      },
      {
        day: "Jour 02",
        title: "TaskFlow Local",
        description: "Journal de travail local pour clients, projets, saisie naturelle, rapports et stockage SQLite hors ligne.",
        status: "En ligne",
        url: taskFlowLandingUrl,
        screenshot: "assets/taskflow-local-screenshot.png"
      },
      {
        day: "Jour 03",
        title: "Debugger Mental",
        description: "Puzzle navigateur bilingue pour stabiliser des systemes mentaux abstraits avec cartes, connexions, actions, evenements et parties sauvegardees.",
        status: "En ligne",
        url: debuggerMentalUrl,
        screenshot: "assets/debugger-mental-screenshot.png",
        screenshotAlt: "Capture du jeu Debugger Mental"
      },
      {
        day: "Jour 04",
        title: "FocusTube Pomodoro",
        description: "Pomodoro statique bilingue qui lit YouTube pendant les pauses et sauvegarde les timestamps localement.",
        status: "En ligne",
        url: focusTubeLandingUrl,
        screenshot: "assets/focustube-pomodoro-screenshot.png",
        screenshotAlt: "Capture de FocusTube Pomodoro"
      },
      {
        day: "Jour 05",
        title: "Meteo + Routine",
        description: "Dashboard meteo bilingue avec Open-Meteo, themes dynamiques, suggestions quotidiennes et taches locales.",
        status: "En ligne",
        url: weatherRoutineUrl,
        screenshotAlt: "Apercu du dashboard Meteo + Routine"
      }
    ]
  },
  pt: {
    skip: "Pular para o conteúdo",
    primaryNavigation: "Navegação principal",
    homeLabel: "Início do Prompt-to-Project",
    languageSelector: "Escolher idioma",
    signalBoard: "Painel de sinais do projeto",
    brand: "Prompt-to-Project",
    navProjects: "Projetos",
    navPhilosophy: "Método",
    navRepo: "Repo",
    languageLabel: "Idioma",
    heroEyebrow: "Dia 05 / Build publicado atual",
    heroTitleLineOne: "Prompts entram.",
    heroTitleLineTwo: "Projetos saem.",
    heroText:
      "Um projeto assistido por IA por dia. O recurso nem sempre é IA; a prática é criar prompts, iterar e publicar com registro.",
    heroPrimary: "Abrir Dia 05",
    heroRepo: "Ver repo no GitHub",
    panelLabel: "Build atual",
    signalPrompt: "Trilha de prompts",
    signalPromptValue: "Clima + Rotina",
    signalBuild: "Modo build",
    signalShip: "Estado",
    signalToday: "Dia 05 no ar",
    aboutEyebrow: "Por que existe",
    aboutTitle: "Um arquivo diário de prática publicada.",
    aboutText:
      "Cada dia une código aos prompts, revisões, limites e aprendizados por trás dele. O resultado importa, mas a trilha do trabalho é o foco.",
    projectsEyebrow: "Arquivo de builds",
    projectsTitle: "Projetos diários",
    projectsRepo: "Abrir repositório",
    projectOpen: "Abrir projeto",
    projectScreenshotAlt: "Captura do projeto",
    previewEyebrow: "Preview do Dia 05",
    previewTitle: "Clima + Rotina ja esta no arquivo.",
    previewLink: "Abrir Clima + Rotina",
    previewCaption: "Dashboard bilingue de clima com tarefas locais, dados Open-Meteo e temas visuais dinamicos.",
    previewMockLabel: "Preview do dashboard de clima",
    previewMockLocation: "Madrid, Espanha",
    previewMockCondition: "Ceu limpo",
    previewMockSuggestion: "Hoje e um bom dia para caminhar e resolver uma tarefa fora de casa.",
    philosophyEyebrow: "Filosofia de prompt",
    philosophyTitle: "Promptar é o ofício. Publicar é a prova.",
    principleOneTitle: "Definir o quadro",
    principleOneText: "Um bom prompt define público, limites, padrão de qualidade e o que evitar.",
    principleTwoTitle: "Iterar em público",
    principleTwoText: "O conhecimento útil vive nas revisões, erros e escolhas entre versões.",
    principleThreeTitle: "Publicar o artefato",
    principleThreeText: "Um projeto pequeno e pronto vence uma ideia infinita. Código, notas, lição, próximo dia.",
    rulesEyebrow: "Regras de operação",
    rulesTitle: "Leve, visível, finalizado.",
    ruleOne: "Construir um projeto focado todos os dias.",
    ruleTwo: "Manter prompts, lições e código juntos.",
    ruleThree: "Usar IA como colaboradora, não como truque.",
    ruleFour: "Refinar o prompt depois do resultado.",
    footerBuilt: "Criado por Pancratzia.",
    footerText: "Dia 01 de Prompt-to-Project.",
    footerFolder: "Pasta Dia 01",
    footerProfile: "Perfil da criadora",
    footerRepo: "Repositório principal",
    backToTop: "Voltar ao topo",
    projects: [
      {
        day: "Dia 01",
        title: "Landing Page",
        description: "Hub do desafio: prompts, código, lições e prática publicada.",
        status: "No ar",
        url: dayOneFolderUrl,
        screenshot: "assets/day-01-landing-screenshot.png",
        screenshotAlt: "Captura da landing Prompt-to-Project"
      },
      {
        day: "Dia 02",
        title: "TaskFlow Local",
        description: "Diario local de desktop para clientes, projetos, entradas em linguagem natural, relatorios e SQLite offline.",
        status: "No ar",
        url: taskFlowLandingUrl,
        screenshot: "assets/taskflow-local-screenshot.png"
      },
      {
        day: "Dia 03",
        title: "Debugger Mental",
        description: "Puzzle bilingue de navegador para estabilizar sistemas mentais abstratos com cartas, conexoes, acoes, eventos e partidas salvas.",
        status: "No ar",
        url: debuggerMentalUrl,
        screenshot: "assets/debugger-mental-screenshot.png",
        screenshotAlt: "Captura do jogo Debugger Mental"
      },
      {
        day: "Dia 04",
        title: "FocusTube Pomodoro",
        description: "Pomodoro estatico bilingue que reproduz YouTube nas pausas e salva timestamps localmente.",
        status: "No ar",
        url: focusTubeLandingUrl,
        screenshot: "assets/focustube-pomodoro-screenshot.png",
        screenshotAlt: "Captura do FocusTube Pomodoro"
      },
      {
        day: "Dia 05",
        title: "Clima + Rotina",
        description: "Dashboard bilingue de clima com Open-Meteo, temas dinamicos, sugestoes diarias e tarefas locais.",
        status: "No ar",
        url: weatherRoutineUrl,
        screenshotAlt: "Preview do dashboard Clima + Rotina"
      }
    ]
  }
};

const languageSelect = document.querySelector("#language");
const projectGrid = document.querySelector("#project-grid");
const savedLanguage = localStorage.getItem("p2p-language");
const initialLanguage = translations[savedLanguage] ? savedLanguage : "en";

function renderProjects(language) {
  const labels = translations[language];
  projectGrid.innerHTML = labels.projects
    .map((project) => {
      const link = project.url
        ? `<a class="project-link" href="${project.url}">${labels.projectOpen}</a>`
        : `<span class="project-link muted-link">${project.status}</span>`;
      const screenshot = project.screenshot
        ? `<img class="project-screenshot" src="${project.screenshot}" alt="${project.screenshotAlt || labels.projectScreenshotAlt || project.title}" loading="lazy" />`
        : "";

      return `
        <article class="project-card${project.screenshot ? " has-screenshot" : ""}" data-animate>
          ${screenshot}
          <div class="project-meta">
            <span>${project.day}</span>
            <span class="status">${project.status}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${link}
        </article>
      `;
    })
    .join("");
}

function setLanguage(language) {
  const labels = translations[language] || translations.en;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (typeof labels[key] === "string") {
      element.textContent = labels[key];
    }
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (typeof labels[key] === "string") {
      element.setAttribute("aria-label", labels[key]);
    }
  });
  renderProjects(language);
  languageSelect.value = language;
  localStorage.setItem("p2p-language", language);
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
    if (!element.classList.contains("is-visible")) {
      observer.observe(element);
    }
  });
}

languageSelect.addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

setLanguage(initialLanguage);
