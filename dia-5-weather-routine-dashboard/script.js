const STORAGE_KEYS = {
  language: "day5-weather-language",
  tasks: "day5-weather-tasks",
  location: "day5-weather-location",
};

const DEFAULT_LOCATION = {
  name: "New York",
  country: "United States",
  latitude: 40.7128,
  longitude: -74.006,
  timezone: "America/New_York",
};

const state = {
  lang: localStorage.getItem(STORAGE_KEYS.language) || "en",
  tasks: loadTasks(),
  weatherKind: "clear",
  lastLocation: loadLocation(),
};

const translations = {
  en: {
    appName: "Weather + Routine",
    backLanding: "Main landing",
    refresh: "Refresh",
    todayDashboard: "Daily dashboard",
    heroTitle: "Plan your day around the sky.",
    heroText:
      "Check the current weather, get a small routine suggestion, and keep today's tasks in one calm place.",
    cityLabel: "City or location",
    search: "Search",
    useMyLocation: "Use my location",
    currentWeather: "Current weather",
    windSpeed: "Wind speed",
    dateTime: "Date and time",
    dailySuggestion: "Daily suggestion",
    suggestionTitle: "Today is a good day to...",
    dailyRoutine: "Daily routine",
    tasksTitle: "Today's tasks",
    taskInputLabel: "New task",
    addTask: "Add",
    emptyTasks: "No tasks yet. Add one small thing to start the day.",
    addPlaceholder: "Add a task",
    cityPlaceholder: "Madrid",
    loadingWeather: "Loading weather...",
    searchingCity: "Searching for that location...",
    locationDenied: "Location permission was not available. Try searching for a city.",
    cityNotFound: "I could not find that city. Try another location.",
    weatherError: "Weather could not load right now. Please try again.",
    updated: "Weather updated.",
    taskDelete: "Delete task",
    taskComplete: "Mark complete",
    taskUndo: "Mark active",
    conditions: {
      clear: "Clear sky",
      partlyCloudy: "Partly cloudy",
      cloudy: "Cloudy",
      fog: "Foggy",
      drizzle: "Drizzle",
      rainy: "Rainy",
      storm: "Thunderstorm",
      snowy: "Snowy",
      unknown: "Weather unavailable",
    },
    suggestions: {
      clear: "take a walk, get sunlight, and handle one outdoor errand.",
      cloudy: "keep a calm, steady routine and finish focused work without rushing.",
      rainy: "read, plan, tidy your workspace, or choose a cozy indoor task.",
      snowy: "move slowly, stay warm, and make the day simple and intentional.",
    },
  },
  es: {
    appName: "Clima + Rutina",
    backLanding: "Landing principal",
    refresh: "Actualizar",
    todayDashboard: "Panel diario",
    heroTitle: "Organiza tu día mirando el cielo.",
    heroText:
      "Consulta el clima actual, recibe una sugerencia simple y guarda las tareas de hoy en un lugar tranquilo.",
    cityLabel: "Ciudad o ubicación",
    search: "Buscar",
    useMyLocation: "Usar mi ubicación",
    currentWeather: "Clima actual",
    windSpeed: "Velocidad del viento",
    dateTime: "Fecha y hora",
    dailySuggestion: "Sugerencia diaria",
    suggestionTitle: "Hoy es un buen día para...",
    dailyRoutine: "Rutina diaria",
    tasksTitle: "Tareas de hoy",
    taskInputLabel: "Nueva tarea",
    addTask: "Agregar",
    emptyTasks: "Aún no hay tareas. Agrega una cosa pequeña para empezar el día.",
    addPlaceholder: "Agrega una tarea",
    cityPlaceholder: "Madrid",
    loadingWeather: "Cargando clima...",
    searchingCity: "Buscando esa ubicación...",
    locationDenied: "El permiso de ubicación no está disponible. Prueba buscar una ciudad.",
    cityNotFound: "No pude encontrar esa ciudad. Prueba otra ubicación.",
    weatherError: "El clima no pudo cargar ahora. Inténtalo de nuevo.",
    updated: "Clima actualizado.",
    taskDelete: "Eliminar tarea",
    taskComplete: "Marcar como completada",
    taskUndo: "Marcar como activa",
    conditions: {
      clear: "Cielo despejado",
      partlyCloudy: "Parcialmente nublado",
      cloudy: "Nublado",
      fog: "Niebla",
      drizzle: "Llovizna",
      rainy: "Lluvia",
      storm: "Tormenta",
      snowy: "Nieve",
      unknown: "Clima no disponible",
    },
    suggestions: {
      clear: "salir a caminar, tomar sol y resolver un pendiente afuera.",
      cloudy: "mantener una rutina tranquila y avanzar en trabajo enfocado sin correr.",
      rainy: "leer, planificar, ordenar tu espacio o elegir una tarea cómoda en casa.",
      snowy: "ir con calma, mantenerte abrigado y simplificar el plan del día.",
    },
  },
};

const elements = {
  html: document.documentElement,
  body: document.body,
  languageToggle: document.querySelector("#language-toggle"),
  refreshButton: document.querySelector("#refresh-weather"),
  locationForm: document.querySelector("#location-form"),
  cityInput: document.querySelector("#city-input"),
  useLocationButton: document.querySelector("#use-location"),
  weatherStatus: document.querySelector("#weather-status"),
  weatherIcon: document.querySelector("#weather-icon"),
  suggestionMessage: document.querySelector("#suggestion-message"),
  taskForm: document.querySelector("#task-form"),
  taskInput: document.querySelector("#task-input"),
  taskList: document.querySelector("#task-list"),
  taskCount: document.querySelector("#task-count"),
  emptyState: document.querySelector("#empty-state"),
  weatherFields: document.querySelectorAll("[data-weather]"),
  i18nFields: document.querySelectorAll("[data-i18n]"),
};

elements.languageToggle.addEventListener("click", () => {
  setLanguage(state.lang === "en" ? "es" : "en");
});

elements.refreshButton.addEventListener("click", () => {
  loadWeather(state.lastLocation);
});

elements.locationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = elements.cityInput.value.trim();

  if (city) {
    setStatus(t("searchingCity"));
    const location = await findLocation(city);

    if (location) {
      await loadWeather(location);
      elements.cityInput.value = "";
    } else {
      setStatus(t("cityNotFound"));
    }
  }
});

elements.useLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus(t("locationDenied"));
    return;
  }

  setStatus(t("loadingWeather"));
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const location = {
        name: t("useMyLocation"),
        country: "",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timezone: "auto",
      };

      await loadWeather(location);
    },
    () => setStatus(t("locationDenied")),
    { enableHighAccuracy: false, timeout: 9000, maximumAge: 300000 },
  );
});

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.taskInput.value.trim();

  if (!text) return;

  state.tasks.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  elements.taskInput.value = "";
  saveTasks();
  renderTasks();
});

elements.taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-task-action]");
  if (!button) return;

  const taskId = button.closest(".task-item").dataset.taskId;
  const task = state.tasks.find((item) => item.id === taskId);

  if (button.dataset.taskAction === "toggle" && task) {
    task.completed = !task.completed;
  }

  if (button.dataset.taskAction === "delete") {
    state.tasks = state.tasks.filter((item) => item.id !== taskId);
  }

  saveTasks();
  renderTasks();
});

setLanguage(state.lang);

async function loadWeather(location) {
  setStatus(t("loadingWeather"));

  try {
    const params = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      current_weather: "true",
      timezone: location.timezone || "auto",
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error("Weather request failed");

    const data = await response.json();
    const current = data.current_weather;
    const condition = getCondition(current.weathercode);
    const resolvedLocation = { ...location, timezone: data.timezone || location.timezone };

    state.lastLocation = resolvedLocation;
    state.weatherKind = condition.kind;
    saveLocation(resolvedLocation);
    renderWeather(resolvedLocation, current, condition);
    setStatus(t("updated"));
  } catch (error) {
    setStatus(t("weatherError"));
  }
}

async function findLocation(city) {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: state.lang,
    format: "json",
  });

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  if (!response.ok) return null;

  const data = await response.json();
  const result = data.results?.[0];
  if (!result) return null;

  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  };
}

function renderWeather(location, current, condition) {
  const locationName = location.country ? `${location.name}, ${location.country}` : location.name;
  const weatherDate = new Date(current.time);
  const formatter = new Intl.DateTimeFormat(state.lang === "es" ? "es-ES" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  setWeatherField("location", locationName);
  setWeatherField("temperature", Math.round(current.temperature));
  setWeatherField("condition", t(`conditions.${condition.label}`));
  setWeatherField("wind", Math.round(current.windspeed));
  setWeatherField("date", formatter.format(weatherDate));

  elements.weatherIcon.dataset.kind = condition.kind;
  elements.body.className = `theme-${condition.kind}`;
  elements.suggestionMessage.textContent = t(`suggestions.${condition.kind}`);
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE_KEYS.language, lang);

  elements.html.lang = lang;
  elements.languageToggle.textContent = lang === "en" ? "ES" : "EN";
  elements.languageToggle.setAttribute("aria-pressed", String(lang === "es"));
  elements.cityInput.placeholder = t("cityPlaceholder");
  elements.taskInput.placeholder = t("addPlaceholder");

  elements.i18nFields.forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  renderTasks();
  loadWeather(state.lastLocation);
}

function renderTasks() {
  const completed = state.tasks.filter((task) => task.completed).length;
  elements.taskCount.textContent = `${completed}/${state.tasks.length}`;
  elements.emptyState.hidden = state.tasks.length > 0;
  elements.taskList.innerHTML = "";

  state.tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " completed" : ""}`;
    item.dataset.taskId = task.id;

    const toggle = document.createElement("button");
    toggle.className = "task-check";
    toggle.type = "button";
    toggle.dataset.taskAction = "toggle";
    toggle.setAttribute("aria-label", task.completed ? t("taskUndo") : t("taskComplete"));
    toggle.textContent = task.completed ? "✓" : "";

    const text = document.createElement("span");
    text.textContent = task.text;

    const remove = document.createElement("button");
    remove.className = "delete-task";
    remove.type = "button";
    remove.dataset.taskAction = "delete";
    remove.setAttribute("aria-label", t("taskDelete"));
    remove.textContent = "×";

    item.append(toggle, text, remove);
    elements.taskList.append(item);
  });
}

function getCondition(code) {
  if ([0].includes(code)) return { kind: "clear", label: "clear" };
  if ([1, 2].includes(code)) return { kind: "cloudy", label: "partlyCloudy" };
  if ([3].includes(code)) return { kind: "cloudy", label: "cloudy" };
  if ([45, 48].includes(code)) return { kind: "cloudy", label: "fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { kind: "rainy", label: "drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { kind: "rainy", label: "rainy" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { kind: "snowy", label: "snowy" };
  if ([95, 96, 99].includes(code)) return { kind: "rainy", label: "storm" };
  return { kind: "cloudy", label: "unknown" };
}

function t(path) {
  return path.split(".").reduce((value, key) => value?.[key], translations[state.lang]) || path;
}

function setWeatherField(field, value) {
  document.querySelector(`[data-weather="${field}"]`).textContent = value;
}

function setStatus(message) {
  elements.weatherStatus.textContent = message;
}

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(state.tasks));
}

function loadLocation() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.location)) || DEFAULT_LOCATION;
  } catch {
    return DEFAULT_LOCATION;
  }
}

function saveLocation(location) {
  localStorage.setItem(STORAGE_KEYS.location, JSON.stringify(location));
}
