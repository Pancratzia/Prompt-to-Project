# Bilingual Weather + Daily Routine Dashboard

Dia 05 de Prompt-to-Project.

Una app web estatica y bilingue para consultar el clima actual, recibir una sugerencia diaria segun el estado del tiempo y organizar tareas simples del dia con `localStorage`.

## Funciones

- Clima actual con Open-Meteo, sin API key.
- Busqueda de ciudad usando Open-Meteo Geocoding.
- Opcion para usar ubicacion del navegador.
- Temperatura, condicion, viento, fecha y hora.
- Sugerencia diaria dinamica segun clima soleado, lluvioso, nublado o nevado.
- Lista de tareas con agregar, completar, eliminar y persistencia local.
- Toggle de idioma entre ingles y espanol.
- Tema visual que cambia segun el clima.

## Estructura

```text
dia-5-weather-routine-dashboard/
  index.html
  style.css
  script.js
  README.md
```

## Uso

Abrir directamente en el navegador:

```text
index.html
```

No requiere build, servidor, cuenta ni claves de API.

## Persistencia local

La app guarda en `localStorage`:

- idioma seleccionado,
- ultima ubicacion consultada,
- tareas del dia.

Claves principales:

```text
day5-weather-language
day5-weather-location
day5-weather-tasks
```

## APIs

- `https://api.open-meteo.com/v1/forecast`
- `https://geocoding-api.open-meteo.com/v1/search`

## Rutas limpias

En Netlify:

```text
/day-5
/day-05
/weather-routine
```
