# Debugger Mental

Juego de navegador sobre sistemas mentales abstractos, nodos conectados y puzzles de estabilidad.

## Como abrirlo

Abre `index.html` directamente en el navegador. No necesita backend, servidor local ni dependencias.

## Incluye

- Landing page bilingue.
- Selector de idioma Espanol / English.
- Menu principal, nueva partida, continuar, tutorial y borrado de guardado.
- Guia rapida dentro de la partida con la condicion de victoria visible.
- Lista lateral de tarjetas para seleccionarlas sin depender del scroll del tablero.
- Generacion aleatoria por dificultad.
- Sistema de nodos, conexiones, turnos, recursos, eventos y objetivos dinamicos.
- Guardado completo en `localStorage` con auto-save despues de cada turno.
- Progresion local con desbloqueos despues de ganar.

## Como se gana

Cumple todos los objetivos que aparecen en el panel lateral y mantenlos durante 3 turnos seguidos. Las tarjetas marcadas como `OK` ya cumplen su objetivo; las marcadas con `!` todavia necesitan atencion.

## Archivos

- `index.html`: estructura de pantallas.
- `styles.css`: landing, menu, tutorial y tablero responsive.
- `game.js`: i18n, generacion, simulacion, acciones, guardado y renderizado.
