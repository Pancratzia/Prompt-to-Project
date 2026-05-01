# TaskFlow Local

Dia 2 de Prompt-to-Project.

TaskFlow Local es una app de escritorio para registrar trabajo realizado y solicitudes de clientes en una bitacora local. No es un clon de ClickUp, Asana ni un gestor de tareas pendientes. La unidad principal del producto es:

```text
Usuario -> Cliente -> Proyecto -> Entradas de bitacora
```

Un cliente puede tener varios proyectos. Cada proyecto puede tener muchas entradas. La app esta pensada para reconstruir que paso, que se hizo, que pidio un cliente y como resumirlo por semana, mes, cliente o proyecto.

## Por que es Dia 2

El Dia 1 fue la landing principal del reto Prompt-to-Project. El Dia 2 toma ese formato de proyecto documentado y lo lleva a una app de escritorio real:

- datos locales,
- autenticacion,
- SQLite,
- app instalable,
- landing de distribucion,
- parser local,
- voz con fallback,
- reportes,
- iteraciones guiadas por uso real.

## Stack

- Tauri 2
- React
- TypeScript
- Rust
- SQLite local con `rusqlite`
- Argon2 para hash de contrasenas
- i18n local espanol/ingles
- Parser local sin LLM
- Web Speech API si esta disponible en WebView2
- Exportacion CSV y PDF sin servicio externo

## Estructura

```text
dia-2-taskflow-local/
  app/
    src/
      App.tsx
      styles.css
      lib/
        api.ts
        date.ts
        export.ts
        i18n.ts
        parser.ts
        parser.test.ts
    src-tauri/
      src/
        lib.rs
        main.rs
      icons/
      Cargo.toml
      tauri.conf.json
    package.json
  landing/
    index.html
    style.css
    script.js
  README.md
  projects.md
```

## Arquitectura

La app tiene dos capas:

- Frontend React: pantallas, formularios, filtros, i18n, asistente, parser local, voz, exportacion CSV/PDF.
- Backend Tauri/Rust: SQLite, autenticacion, hash de contrasenas y CRUD local.

El frontend llama comandos Tauri como:

```text
register_user
login_user
update_user
list_clients
save_client
list_projects
save_project
list_log_entries
save_log_entry
```

No se usa `localStorage` como almacenamiento principal.

## Modelo de datos

```text
users
- id
- email
- password_hash
- created_at

clients
- id
- user_id
- name
- email
- notes
- created_at
- updated_at

projects
- id
- user_id
- client_id
- name
- description
- status
- created_at
- updated_at

log_entries
- id
- user_id
- client_id
- project_id
- title
- description
- entry_type
- status
- entry_date
- start_date
- end_date
- hours
- source_text
- created_at
- updated_at
```

## Bitacora, no task manager

TaskFlow Local registra hechos:

- "Diego me pidio cambiar el diseno del home."
- "Jen pidio revisar el dashboard."
- "Trabaje 3 horas en la landing de Gen."
- "Para Maria avance el calendario semanal del lunes al viernes."

No incluye recordatorios, notificaciones, deadlines complejos, subtareas, dependencias ni tableros Kanban. El foco es documentar trabajo y solicitudes, no administrar pendientes.

## Funcionalidades actuales

- Registro y login con correo y contrasena.
- Multiples usuarios.
- Cada usuario ve solo sus propios datos.
- Edicion de perfil de usuario.
- CRUD de clientes.
- CRUD de proyectos.
- Boton para abrir la bitacora filtrada por proyecto.
- CRUD de entradas de bitacora.
- Formulario de nueva entrada plegable.
- Dashboard con metricas y resumen por cliente.
- Bitacora con filtros por cliente, proyecto y estado.
- Boton para limpiar filtros.
- Vista semanal y vista mensual.
- Reportes por rango, cliente, proyecto y estado.
- Exportacion CSV.
- Exportacion PDF basica.
- Asistente flotante.
- Dictado por voz si Web Speech API esta disponible.
- Seccion de permisos para probar microfono y soporte de voz.
- i18n espanol/ingles.
- Parser local con pruebas.
- Landing de distribucion.

## Parser local

El parser vive en:

```text
app/src/lib/parser.ts
```

Interpreta texto natural sin LLM. Detecta:

- idioma basico,
- cliente,
- proyecto,
- titulo/accion,
- fecha,
- rango de fechas,
- horas,
- tipo de entrada,
- multiples entradas simples.

Ejemplos soportados:

```text
Para Gen trabaje tres horas en el dashboard el lunes.
Diego me pidio cambiar la seccion de precios.
For Gen I worked three hours on the dashboard on Monday.
For Maria I made changes to the landing page from Tuesday to Thursday.
```

Durante la iteracion tambien se corrigio un caso mas largo:

```text
Para la landing Page de Diego. El lunes. De esta semana, es decir, el lunes antes del 30 de abril del 2026. Tuve que hacer una seccion de Cultura en la landing Page.
```

Resultado esperado:

```text
Cliente: Diego
Proyecto: Landing Page
Fecha: 2026-04-27
Tipo: trabajo realizado
Titulo: Hacer una seccion de Cultura en la Landing Page
```

## Voz

El asistente tiene flujo de voz con fallback:

1. El usuario presiona `Hablar`.
2. La app solicita permiso de microfono.
3. Si Web Speech API esta disponible, transcribe al cuadro de texto.
4. La app no guarda ni procesa automaticamente.
5. El usuario revisa el texto.
6. El usuario presiona `Procesar texto`.
7. El asistente propone entradas estructuradas.
8. El usuario confirma y guarda.

Limitaciones reales:

- Web Speech API puede no estar disponible en algunos entornos Tauri/WebView2.
- El microfono puede estar permitido, pero el reconocimiento de voz no estar expuesto.
- Windows puede requerir habilitar microfono para apps de escritorio.
- El fallback manual de texto sigue siendo el flujo confiable.

## LLM opcional

TaskFlow Local funciona con parser local por defecto. La app deja preparado el camino conceptual para una LLM local opcional con Ollama.

Modelos pequenos sugeridos:

- Llama 3.2 1B/3B
- Phi-3 Mini
- Gemma 2B

La app debe seguir funcionando offline sin LLM.

## Landing

La landing esta en:

```text
landing/index.html
```

Incluye:

- hero,
- que es TaskFlow Local,
- privacidad,
- SQLite local,
- funcionalidades,
- espanol/ingles,
- voz/texto,
- boton de descarga,
- placeholder para GitHub Releases,
- instrucciones basicas.

## Como correr en desarrollo

Requisitos:

- Node.js 20 o superior.
- Rust estable.
- Tauri prerequisites.
- Windows: Microsoft C++ Build Tools con la carga `Desktop development with C++`.

Instalacion:

```bash
cd dia-2-taskflow-local/app
npm install
npm run tauri:dev
```

Solo frontend:

```bash
npm run dev
```

Nota: el frontend aislado no persiste en SQLite porque la persistencia vive en Tauri/Rust.

## Pruebas

```bash
cd dia-2-taskflow-local/app
npm test
```

Las pruebas actuales cubren el parser local.

## Build e instaladores

```bash
cd dia-2-taskflow-local/app
npm run tauri:build
```

Artefactos en Windows:

```text
app/src-tauri/target/release/bundle/msi/
app/src-tauri/target/release/bundle/nsis/
```

## Distribucion gratuita

1. Ejecutar `npm run tauri:build`.
2. Crear un tag, por ejemplo `taskflow-local-v0.1.0`.
3. Abrir GitHub Releases.
4. Subir `.msi` y `.exe`.
5. Publicar el release.
6. Cambiar el boton de la landing para apuntar al release final.

## Verificacion realizada

Durante el desarrollo se ejecutaron:

```bash
npm run build
npm run tauri:build
npm test
npm audit --omit=dev
```

Resultados de la ultima ronda:

- build frontend OK,
- build Tauri OK,
- instaladores generados OK,
- parser tests OK,
- audit sin vulnerabilidades.

## Iteraciones reales

### Iteracion 1 - Generacion completa

Se pidio crear el proyecto `dia-2-taskflow-local` siguiendo estructura y estilo del Dia 1, sin modificar Dia 1. El pedido incluia una app Tauri + React + TypeScript, SQLite local, autenticacion, CRUD, dashboard, bitacora, reportes, landing, README, i18n, parser local, voz y LLM opcional.

Resultado: se creo la estructura completa con `app/`, `landing/`, backend Rust, parser, i18n, reportes y README inicial.

### Iteracion 2 - Build real en Windows

Al correr Tauri aparecieron errores reales:

- faltaba Rust/Cargo,
- luego faltaba `icons/icon.ico`,
- luego Argon2 necesitaba `getrandom`.

Correcciones:

- se agregaron iconos Tauri,
- se configuro `bundle.icon`,
- se agrego `rand_core` con `getrandom`,
- se verifico `npm run tauri:build`.

### Iteracion 3 - Optimizacion y UX

Feedback real:

- el arranque se sentia lento,
- el texto del brand estaba en una sola linea,
- voz no parecia captar,
- faltaba seccion de permisos,
- faltaba editar datos del usuario,
- las fechas de bitacora no tenian etiquetas,
- estados necesitaban color.

Correcciones:

- se removio `tauri-plugin-shell`,
- se ajusto Argon2 para uso local,
- se agrego perfil,
- se agrego permisos,
- se mejoro dictado,
- se etiquetaron fechas,
- se colorearon entradas abiertas/cerradas.

### Iteracion 4 - Flujo del asistente

Feedback real:

- el asistente procesaba demasiado pronto al dictar,
- aparecian tarjetas innecesarias,
- se necesitaba animacion de voz,
- se necesitaban filtros con limpiar,
- proyectos debian abrir su bitacora,
- el formulario de nueva entrada ocupaba demasiado.

Correcciones:

- dictar ahora solo transcribe,
- procesar texto es manual,
- se agregaron ondas de voz,
- se agrego limpiar filtros,
- proyectos abren bitacora filtrada,
- nueva entrada es plegable,
- calendario tiene semana y mes.

### Iteracion 5 - Parser para texto largo

Feedback real:

El parser no interpretaba bien:

```text
Para la landing Page de Diego. El lunes. De esta semana, es decir, el lunes antes del 30 de abril del 2026. Tuve que hacer una seccion de Cultura en la landing Page.
```

Correcciones:

- no separar texto largo por cualquier punto,
- detectar proyecto en formato "landing Page de Diego",
- detectar cliente en ese formato,
- entender "lunes antes del 30 de abril del 2026",
- limpiar mejor el titulo,
- agregar prueba automatica para ese caso.

## Prompt real inicial

Este es un resumen fiel del prompt inicial, no una reconstruccion inventada:

```text
Crea el proyecto del Dia 2 siguiendo el formato, estructura y estilo del proyecto del Dia 1 existente en el repositorio.
No modifiques el Dia 1.

Carpeta: dia-2-taskflow-local
Nombre: TaskFlow Local

Concepto:
No es una app tipo ClickUp, Asana o gestor de pendientes.
Es una aplicacion de escritorio tipo bitacora de trabajo para registrar lo que ya se hizo o lo que un cliente pidio.

Unidad principal:
Usuario -> Cliente -> Proyecto -> Entradas de bitacora

Stack recomendado:
Tauri + React + TypeScript, SQLite local, backend local, i18n espanol/ingles, parser local, voz real con Web Speech API y fallback manual.

Debe incluir:
app de escritorio, landing page, README interno, instalacion, build y distribucion.

Funcionalidades:
autenticacion, dashboard, CRUD de clientes, CRUD de proyectos, entradas de bitacora, vista semanal/calendario, reportes CSV/PDF, asistente local, parser local, LLM opcional con Ollama, voz, i18n, SQLite.
```

## Prompts optimizados para reproducir esta app

Estos prompts son versiones mejoradas que podrian usarse para pedir una app similar desde cero. No son los prompts reales exactos de la conversacion; son prompts optimizados a partir de lo aprendido.

### Prompt optimizado 1 - Generacion base

```text
Construye una app de escritorio llamada TaskFlow Local dentro de la carpeta dia-2-taskflow-local.

No modifiques otros proyectos del repositorio.

Objetivo:
Crear una bitacora local de trabajo, no un task manager. La jerarquia debe ser:
Usuario -> Cliente -> Proyecto -> Entradas de bitacora.

Stack:
- Tauri 2
- React
- TypeScript
- Rust
- SQLite local
- Argon2 para contrasenas
- i18n espanol/ingles
- Parser local sin LLM
- Web Speech API con fallback a texto

Estructura:
- app/
- landing/
- README.md

Funcionalidades obligatorias:
- registro/login multiusuario,
- perfil de usuario,
- CRUD clientes,
- CRUD proyectos,
- CRUD entradas,
- dashboard,
- bitacora filtrable,
- calendario semanal y mensual,
- reportes por rango, cliente, proyecto y estado,
- exportar CSV/PDF,
- asistente flotante con texto natural,
- seccion de permisos de voz,
- landing de distribucion.

Restricciones:
- no usar localStorage como base principal,
- no incluir recordatorios ni deadlines complejos,
- la LLM debe ser opcional,
- la app debe funcionar offline.

Verifica:
- npm run build
- npm test
- npm run tauri:build
```

### Prompt optimizado 2 - Parser local

```text
Mejora el parser local de TaskFlow Local.

Debe interpretar frases en espanol e ingles sin LLM:
- "Para Gen trabaje tres horas en el dashboard el lunes."
- "Diego me pidio cambiar la seccion de precios."
- "For Gen I worked three hours on the dashboard on Monday."
- "Para la landing Page de Diego. El lunes. De esta semana, es decir, el lunes antes del 30 de abril del 2026. Tuve que hacer una seccion de Cultura en la landing Page."

Debe detectar:
- cliente,
- proyecto,
- titulo limpio,
- descripcion original,
- fecha,
- rango,
- horas,
- tipo de entrada,
- multiples entradas simples.

No dividas texto largo solo porque hay puntos. Divide solo cuando comience otra instruccion clara como "Para Cliente..." o "For Client...".

Agrega pruebas unitarias para cada caso.
```

### Prompt optimizado 3 - UX del asistente

```text
Optimiza el asistente de TaskFlow Local.

Flujo deseado:
- Hablar solo transcribe.
- No procesar automaticamente despues del dictado.
- El usuario debe poder editar el texto.
- El usuario presiona "Procesar texto".
- La app muestra sugerencias estructuradas.
- El usuario confirma antes de guardar.

Agrega:
- estado de voz,
- animacion de ondas mientras escucha,
- boton detener,
- ejemplos rapidos,
- limpiar texto,
- mensajes claros cuando Web Speech API no esta disponible,
- seccion de permisos para probar microfono.
```

### Prompt optimizado 4 - Bitacora y reportes

```text
Mejora la bitacora de TaskFlow Local.

Requisitos:
- filtros por cliente, proyecto y estado,
- boton limpiar filtros,
- formulario de nueva entrada plegable,
- editar entrada abre el formulario,
- proyectos tienen boton "Ver bitacora",
- entradas abiertas en verde,
- entradas cerradas en rojo,
- fechas con etiquetas claras:
  - fecha de la entrada,
  - inicio,
  - fin,
- calendario con vista semanal y mensual,
- reportes con rango mensual por defecto.
```

## Observaciones

- Tauri en Windows exige iconos reales para generar instaladores.
- Rust/Cargo debe estar instalado y disponible en PATH.
- En Windows se necesitan C++ Build Tools, no basta con VS Code.
- Web Speech API no es garantizada dentro de WebView2.
- Para una app local, Argon2 puede configurarse con parametros razonables para no hacer lento el login.
- El parser local mejora mucho con pruebas basadas en frases reales del usuario.
- La app se sintio mejor cuando el asistente dejo de auto-procesar despues de dictar.

## Mejoras futuras

- Vista foco de una entrada con panel lateral.
- Importar/exportar backup SQLite o JSON.
- Busqueda full-text en bitacora.
- Mas pruebas de parser con frases reales.
- Adaptador opcional para Ollama.
- Mejor PDF con tablas y paginacion.
- Firma o versionado para releases publicos.

## Limitaciones conocidas

- El parser local no entiende lenguaje arbitrario.
- Voz depende del sistema y WebView.
- No hay sincronizacion entre dispositivos.
- No hay recuperacion de contrasena porque no hay servidor.
- PDF es funcional pero simple.
- No hay facturacion ni cobros; los reportes son resumen de trabajo.
