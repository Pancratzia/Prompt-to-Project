# Prompt-to-Project â€” Day 01 Landing Page

## Project description

Day 01 is the main landing page for Prompt-to-Project, a daily challenge where one AI-assisted project is built, documented, iterated, and shipped every day. The page acts as the future hub for project entries, prompting notes, rules, and lessons learned.

## Tech stack

- HTML
- CSS
- Vanilla JavaScript
- No frameworks
- No backend
- No external assets or APIs

## Features

- Modern light-theme landing page for a creative development lab
- Responsive layout with header, hero, about, projects, prompting philosophy, rules, and footer
- Dynamic projects section powered by a JavaScript array
- Full UI translation support for English, Spanish, Italian, French, and Portuguese
- Language selector with `localStorage` persistence
- CSS-native visual system with soft gradients, compact cards, and micro-interactions
- IntersectionObserver reveal animations
- `prefers-reduced-motion` support
- Performance-minded implementation using system fonts, deferred JavaScript, and no large images

## How to run

Open `index.html` directly in a browser.

## ðŸ§  Prompts Used

- Prompt v1: initial project generation prompt
- Prompt v2: README prompt-history correction prompt
- Prompt v3: visual refinement, translations, attribution, and links prompt

### Prompt v1 (Original)

```text
You are an expert frontend engineer, UI designer, and prompt engineer.

You are building Day 01 of a project called â€œPrompt-to-Projectâ€.

---

## ðŸ“ CRITICAL: Folder Structure (MANDATORY)

You MUST create a folder named:

/day-01-landing-page

ALL files MUST be inside this folder.

DO NOT create files in the root.

Inside that folder, create:

- index.html
- style.css
- script.js
- projects.md
- README.md

---

## ðŸ§  Context

Prompt-to-Project is a daily challenge where I build one project per day using AI.

The goal is NOT only the final code, but also:
- The prompts used
- Iterations
- Improvements
- Lessons learned

This project is the main landing page that will showcase all future projects.

---

## ðŸŽ¯ Goal

Build a high-performance, modern, visually distinctive landing page.

It must feel like a serious creative dev lab, not a generic template.

---

## âš™ï¸ Tech Requirements

- HTML
- CSS
- Vanilla JavaScript only
- No frameworks
- No backend
- Must run by opening index.html

---

## ðŸš€ Performance Requirements

Optimize for Lighthouse:
- 95â€“100 in all categories

Rules:
- No large images
- No blocking scripts
- Use system fonts
- Avoid layout shift
- Respect prefers-reduced-motion
- Minimal JS

---

## ðŸŽ¨ Design

- Light theme
- Modern, elegant, slightly experimental
- Soft gradients, cards, micro-interactions
- Subtle animations (CSS + IntersectionObserver)

---

## ðŸŒ Internationalization

Languages:
- English (default)
- Spanish
- Italian
- French
- Portuguese

Requirements:
- Language selector
- localStorage persistence
- JS translations object
- ALL text must be translatable
- No external APIs

---

## ðŸ§© Sections

- Header
- Hero
- About
- Projects (dynamic via JS array)
- Prompting Philosophy
- Rules
- Footer

---

## ðŸ“„ README.md (INSIDE day-01-landing-page)

This is VERY important.

Include:

### Project description
### Tech stack
### Features
### How to run

### ðŸ§  Prompts Used

#### Prompt v1 (Original)
Include the FULL original prompt

#### Prompt v2 (Improved)
Improve the prompt:
- clearer
- more structured
- better constraints

#### Key Improvements
Explain what changed and why

#### Learnings
Bullet points:
- what worked
- what didnâ€™t
- what to improve

---

## ðŸ“„ projects.md

Inside the same folder:

# Projects

## Day 01 â€” Landing Page
Main hub for the Prompt-to-Project challenge.

Add placeholders for future days.

---

## ðŸ§  Code Quality

- Clean
- Modular
- Scalable
- Easy to extend

---

## âš ï¸ Important

Do NOT generate explanations outside the files.

Only generate the project files inside /day-01-landing-page.
```

### Prompt v2 — Visual refinement, translations, attribution, and links

```text
## README update — real prompts only

Update the README.md inside /day-01-landing-page.

Important:
The “Prompts Used” section must include the REAL prompts given by the user, not invented or summarized prompts.

This is Prompt v2.

Keep Prompt v1 exactly as it already appears in the README if it exists.

Add this full current prompt as:

### Prompt v2 — Visual refinement, translations, attribution, and links

Do not rewrite it as if it were the original prompt.
Do not create fake prompts.
Do not summarize the prompts.
Do not remove previous prompts.

The README should clearly show:
- Prompt v1: initial project generation prompt
- Prompt v2: this improvement prompt

Also add:

## Iteration Notes

Include:
- What was improved visually
- What was improved in translations
- What was fixed in typography
- What was improved for attribution/linking
- What was preserved for performance Add this full current prompt as Prompt v2. These must be the real prompts used, not generated examples.
```

### Prompt v3 — Visual refinement, translations, attribution, and links

```text
You are an expert frontend engineer, UI designer, UX writer, accessibility specialist, and prompt engineer.

Improve the existing Day 01 landing page inside:

/day-01-landing-page

Do NOT recreate the project from scratch unless necessary. Refactor and improve the current files.

Repository:
https://github.com/Pancratzia/Prompt-to-Project

Creator attribution:
Built by Pancratzia.
GitHub profile:
https://github.com/pancratzia

Add clear links to:
- Main repo: https://github.com/Pancratzia/Prompt-to-Project
- Creator profile: https://github.com/pancratzia

---

## Main goal

Make the landing page feel significantly more modern, distinctive, polished, and memorable.

Right now it is good, but too generic.

Push the design further.

The final result should feel like:
- a futuristic creative coding lab
- a high-end personal dev project
- an editorial tech portfolio
- modern, elegant, experimental, but still usable

Do NOT make it look like a generic SaaS template.

---

## Visual direction

Use a light background, but make it more visually interesting.

Add:
- stronger art direction
- better spacing rhythm
- more intentional typography
- modern gradients
- glass-like cards
- subtle geometric elements
- elegant hover states
- animated details
- better section separation
- more personality

Avoid:
- generic cards
- boring centered layouts everywhere
- oversized text that breaks badly
- words being cut off
- awkward line breaks
- excessive animations
- heavy assets

---

## Typography fixes

The hero title is too long and some words are being cut.

Fix this.

Requirements:
- No clipped text
- No broken words
- Better responsive font sizing using clamp()
- Better max-width for headings
- Better line-height
- Use text-wrap: balance where appropriate
- Ensure the title looks good on mobile, tablet, and desktop

If needed:
- shorten the hero title
- split the headline into two visual lines
- use a smaller max font size
- use a highlighted phrase instead of one huge sentence

---

## Translation improvements

The current translations are not good enough.

Improve all translations for:
- English
- Spanish
- Italian
- French
- Portuguese

Requirements:
- Make translations natural, not literal
- Keep tone consistent across languages
- Avoid long translated text that breaks the layout
- Use shorter phrases for headings and buttons
- Make sure every visible UI string is translated
- Language selector labels should be clear

Important:
Do not use external translation APIs.

---

## Content improvements

Improve the landing page copy so it feels sharper and less generic.

Clarify that:
- This is one AI-assisted project per day
- The projects do not always include AI as a feature
- The real focus is prompting, iteration, and shipping
- Each day includes prompts, lessons, and code

Use concise, punchy copy.

---

## Project links

In the Projects section, Day 01 should link to this repo:

https://github.com/Pancratzia/Prompt-to-Project

Add a GitHub CTA in the hero or footer.

Footer should include:
Built by Pancratzia
Link to GitHub profile
Link to repository

---

## Performance requirements

Keep Lighthouse excellent:
- Performance: 95–100
- Accessibility: 95–100
- Best Practices: 95–100
- SEO: 95–100

Do not add:
- heavy images
- external fonts
- animation libraries
- unnecessary dependencies
- third-party scripts

Use:
- semantic HTML
- accessible buttons and links
- visible focus states
- good contrast
- prefers-reduced-motion
- optimized CSS animations
- minimal JavaScript

---

## Files to update

Update only files inside:

/day-01-landing-page

Likely files:
- index.html
- style.css
- script.js
- README.md
- projects.md

---

## README update

Update the README.md inside /day-01-landing-page.

Add a new section:

## Iteration Notes

Include:
- What was improved visually
- What was improved in translations
- What was fixed in typography
- What was improved for attribution/linking
- What was preserved for performance

Also update:

## Prompts Used

Add this current prompt as the next iteration prompt.

---

## Final quality checklist

Before finishing, verify:
- No text is clipped
- Hero looks good on mobile
- All languages work
- All links work
- GitHub attribution is visible
- The design feels less generic
- No Lighthouse-hostile changes were added
- The project still runs without a backend
```

## Iteration Notes

- Visual improvements: the landing page now has a stronger futuristic creative-lab identity with a CSS grid background, glass-like panels, geometric signal artwork, sharper section separation, richer hover states, and a more editorial layout rhythm.
- Translation improvements: all UI copy was rewritten across English, Spanish, Italian, French, and Portuguese to sound more natural, shorter, and more consistent; dynamic project cards and accessibility labels remain translated.
- Typography fixes: the hero headline was shortened into two visual lines, uses safer `clamp()` sizing, improved line-height, better heading widths, and `text-wrap: balance` so words are not clipped or awkwardly broken on mobile, tablet, or desktop.
- Attribution and linking improvements: the page now visibly credits Pancratzia and links to both the creator profile and the main Prompt-to-Project repository in the hero, navigation, projects section, footer, and `projects.md`.
- Performance preserved: the redesign stays framework-free, image-free, external-font-free, backend-free, dependency-free, and uses only lightweight CSS motion plus minimal deferred JavaScript.

### Learnings

- What worked: clear file constraints made the project structure easy to validate.
- What worked: using a translations object kept internationalization simple and extensible.
- What worked: CSS-native visuals created a distinctive identity without image weight.
- What didn't: requiring all text to be translatable increases diligence, especially for dynamic content and accessibility labels.
- What didn't: a broad visual phrase like "creative dev lab" needs concrete design decisions to avoid becoming generic.
- What to improve: add more project metadata as the challenge grows, such as tags, links, screenshots, and prompt versions.
- What to improve: add automated checks for missing translation keys once the site has more content.
- What to improve: run a Lighthouse audit in a browser after future visual additions.
