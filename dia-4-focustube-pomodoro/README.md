# FocusTube Pomodoro

Dia 04 de Prompt-to-Project.

FocusTube Pomodoro es una app local bilingue para trabajar en ciclos Pomodoro y ver YouTube solo durante los descansos. Guarda el progreso exacto del video entre descansos usando el YouTube IFrame Player API y persiste todo en `localStorage`, lista para publicarse como sitio estatico en Netlify.

## Arquitectura

- `landing/`: landing estatica del Dia 04.
- `app/`: React + Vite + TypeScript.
- `app/src/lib/api.ts`: capa local de persistencia en `localStorage`.
- `app/src/i18n/en.json` y `app/src/i18n/es.json`: textos de UI bilingues.
- `app/src/components/YouTubeBreakPlayer.tsx`: reproductor de descanso con IFrame Player API.
- `app/src/components/YouTubeDurationProbe.tsx`: lectura de duracion de videos sin OAuth ni API key.

No hay servidor, autenticacion, nube, SQLite ni OAuth.

## Estructura

```text
dia-4-focustube-pomodoro/
  README.md
  landing/
    index.html
    style.css
    script.js
  app/
    index.html
    package.json
    tsconfig.json
    vite.config.ts
    src/
      main.tsx
      styles.css
      components/
        YouTubeBreakPlayer.tsx
        YouTubeDurationProbe.tsx
      i18n/
        en.json
        es.json
      lib/
        api.ts
        i18n.ts
        youtube.ts
      types/
        index.ts
```

## Desarrollo

```bash
cd dia-4-focustube-pomodoro/app
npm install
npm run dev
```

Abrir:

```text
http://127.0.0.1:5174
```

## Build estatico

```bash
cd dia-4-focustube-pomodoro/app
npm run build
```

La app compilada queda en:

```text
app/dist/index.html
```

La landing apunta a:

```text
../app/dist/index.html
```

## Netlify

El repo puede publicarse desde la raiz. Las rutas limpias estan en `_redirects`:

```text
/day-4        -> /dia-4-focustube-pomodoro/landing/index.html
/focustube    -> /dia-4-focustube-pomodoro/landing/index.html
/focustube-app -> /dia-4-focustube-pomodoro/app/dist/index.html
```

Antes de desplegar, ejecutar `npm run build` dentro de `dia-4-focustube-pomodoro/app`.

## Persistencia local

La app guarda en `localStorage`:

- idioma,
- duraciones por defecto,
- plan diario,
- videos seleccionados,
- duracion detectada,
- posicion guardada del video,
- ciclos de enfoque y descanso,
- metricas derivadas.

Clave principal:

```text
focustube-pomodoro-state-v2
```

## YouTube

Se usa solo el embed con YouTube IFrame Player API:

- `playVideo()`
- `pauseVideo()`
- `seekTo()`
- `getCurrentTime()`
- `getDuration()`

La app intenta leer automaticamente la duracion del video. Si YouTube no entrega metadata, el video bloquea embed o la duracion no esta disponible, aparece fallback manual para ese video especifico.

## Flujo corregido

1. El foco termina.
2. Se guarda el ciclo de foco.
3. Empieza el descanso.
4. El reproductor intenta iniciar el video.
5. Si el navegador bloquea autoplay, el usuario presiona `Activar video`.
6. Al terminar el descanso, la app pausa YouTube.
7. Guarda `getCurrentTime()` en `localStorage`.
8. Registra el ciclo de descanso.
9. Inicia el siguiente foco sin refrescar la pagina.

## Verificacion

```bash
npm run build
```

Resultado: build OK.
