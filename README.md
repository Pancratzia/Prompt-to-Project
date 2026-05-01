# Prompt-to-Project

Building one project per day using AI.

This repo documents the shipped projects and the prompts, iterations, fixes, and lessons behind AI-assisted development.

## Structure

Each project lives in its own folder:

```text
day-01-landing-page/
dia-2-taskflow-local/
```

## Projects

### Day 01 - Landing Page

Main hub for the Prompt-to-Project challenge.

- Folder: [day-01-landing-page/](./day-01-landing-page/)
- Entry point: [day-01-landing-page/index.html](./day-01-landing-page/index.html)
- Clean route for deploys: `/day-01`

### Day 02 - TaskFlow Local

TaskFlow Local is a desktop work log, not a ClickUp/Asana-style task manager. It records what was already done or what a client requested, organized as User -> Client -> Project -> Log Entries.

- Folder: [dia-2-taskflow-local/](./dia-2-taskflow-local/)
- Landing: [dia-2-taskflow-local/landing/index.html](./dia-2-taskflow-local/landing/index.html)
- Desktop app: [dia-2-taskflow-local/app/](./dia-2-taskflow-local/app/)
- Clean routes for deploys: `/taskflow`, `/taskflow-local`, `/day-2`

## Deployment

The repository is ready for a static deploy from the repo root. The `_redirects` file sends the root route to Day 01 and exposes clean routes for TaskFlow.

```text
/              -> /day-01-landing-page/index.html
/day-01        -> /day-01-landing-page/index.html
/taskflow      -> /dia-2-taskflow-local/landing/index.html
/taskflow-local -> /dia-2-taskflow-local/landing/index.html
/day-2         -> /dia-2-taskflow-local/landing/index.html
```

## TaskFlow Local Releases

To publish free installers:

1. Build the desktop app:

   ```bash
   cd dia-2-taskflow-local/app
   npm install
   npm run tauri:build
   ```

2. Find the generated Windows installers:

   ```text
   app/src-tauri/target/release/bundle/msi/
   app/src-tauri/target/release/bundle/nsis/
   ```

3. In GitHub, open the repository, go to Releases, and create a new release with a tag like:

   ```text
   taskflow-local-v0.1.0
   ```

4. Upload both artifacts:

   ```text
   TaskFlow Local_0.1.0_x64_en-US.msi
   TaskFlow Local_0.1.0_x64-setup.exe
   ```

5. Publish the release.

6. Point the landing buttons to the release assets. The expected URL shape is:

   ```text
   https://github.com/Pancratzia/Prompt-to-Project/releases/download/taskflow-local-v0.1.0/TaskFlow%20Local_0.1.0_x64-setup.exe
   https://github.com/Pancratzia/Prompt-to-Project/releases/download/taskflow-local-v0.1.0/TaskFlow%20Local_0.1.0_x64_en-US.msi
   ```

The TaskFlow landing points to the published release:

```text
https://github.com/Pancratzia/Prompt-to-Project/releases/tag/taskflow-local-v0.1.0
```

It also includes direct EXE and MSI buttons for the matching release assets.

## What This Is Really About

This is a prompt engineering lab. Each day focuses on:

- Writing better prompts
- Iterating with AI
- Understanding what works and what does not
- Shipping fast
- Keeping the build history visible

## Rules

- Ship one focused project per day.
- Keep prompts, lessons, and code together.
- Use AI as a collaborator, not a gimmick.
- Refine the prompt after seeing the result.
