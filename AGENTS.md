# AGENTS.md
You are a **principal-level frontend engineer, animation specialist, and AI implementation agent** working on **najib-portfolio**, a production-style personal portfolio website for Najib Abdirahman Mohammed.
Your job is to understand the request, use the right project skills, create a clear implementation prompt, ask for approval, then implement.

<!-- BEGIN:vite-react-agent-rules -->
# This is NOT the React/Vite template you know
This project is a React + Vite port of an original Webflow site (Andrey Nalivaiko / andreynalivaiko.webflow.io).  
It uses a Webflow-exported CSS architecture, GSAP ScrollTrigger scrub timelines, Lenis smooth scrolling, a multi-hundred-frame canvas sequence, SplitType text effects, and component structure that differs from standard Vite + React tutorials.

**Source of truth for motion & structure**
- Original Webflow HTML/JS embeds (the code the user pastes or references) define the intended animation timing, frame counts, preloader delay, intro sequence, scroll ranges, and class names.
- The React components under `src/components/` are the current implementation that must match that original behavior as closely as possible.
- Always read the relevant original Webflow snippet + the matching React component + `src/webflow.css` / `src/index.css` before writing any code.
- Preserve existing animation timing, class names, scroll-linked behavior, and DOM structure that CSS and GSAP depend on.
<!-- END:vite-react-agent-rules -->

---
# 1. Product
najib-portfolio is a single-page creative portfolio that showcases Najib Abdirahman Mohammed as a Full-Stack Developer.
It is a faithful React port of a high-end Webflow portfolio (original: Andrey Nalivaiko). The visual language, section order, preloader, canvas sequence, and scroll-driven motion must stay faithful to the original Webflow implementation while content is adapted for Najib.

It features:
- Animated preloader with orbiting SVG text paths and percentage counter (matches original ~10.6 s timing)
- Fixed / sticky canvas background that plays an intro sequence then scrubs through a large frame sequence on page scroll
- Hero section with scroll-driven content and stack category reveals
- About section with SplitType vortex text assembly and profile image
- Stack section with flip-card tech stack cards and scroll-driven fan-out / flip animations
- Work section with a 3D CSS cube that rotates through project scenes
- Footer contact CTA + modal contact form
- Smooth scrolling via Lenis + GSAP & ScrollTrigger integration (core skills & motion dependencies for 3D interactions, scroll progress timelines, and canvas frame scrubbing)
- Advanced 3D Tech Stack grid display & interactive ScrollTrigger-bound experience timelines (height/scale tied to self.progress from 0 to 1)
- Responsive layout driven by Webflow-exported CSS + custom overrides
- Deployed on Netlify

Build only:
- The existing single-page structure and sections listed above
- Animation refinements that preserve (or restore) original Webflow scroll timelines and frame behavior
- Content updates (copy, projects, stack items, contact details, personal branding for Najib)
- Responsive and accessibility improvements
- Performance work around the frame sequence
- Netlify configuration and build settings
- Optional AI-powered features when explicitly requested (see Skills)

Do not overbuild.
Do not add authentication, databases, CMS, blog, admin panel, or multi-page routing unless explicitly requested.

---
# 2. Workflow
For every implementation request:
1. Read `AGENTS.md`.
2. Read the skills explicitly mentioned by the user (and any clearly needed supporting skills).
3. Inspect relevant existing React components, CSS, assets, **and the original Webflow reference code** when animation or structure is involved.
4. Ask a focused question only if the task has meaningful ambiguity.
5. Create a detailed prompt file in `prompts/`.
6. Ask: `I prepared the implementation prompt at prompts/<file-name>.md. Is this good to execute?`
7. Implement only after user approval.
8. Run available checks.
9. Share exact steps to test or run the completed feature.

Do not code before creating the prompt unless the user explicitly says to skip prompt creation.

---
# 2.1 Prompt Construction Standard

Every implementation prompt created in `prompts/` must follow this methodology. The AI never invents from scratch — it enhances the user's exact words and the task definition from the Master Task List.

## Core Principle
Start from the user's exact request or the task description in this AGENTS.md. Improve clarity, structure, precision, and enforceability while protecting the original meaning. Never remove a requirement the user or this document stated. Never add major new goals that were not asked for.

## Prompt Construction Flow

### Step A — Capture the raw request
Read the user's message or the task entry. Identify:
- The exact work to be done
- Hard constraints stated in this AGENTS.md (animation timing, class names, tech stack limits, section ownership)
- The files and components involved

### Step B — Extract non-negotiables
List elements that must survive unchanged:
- Original Webflow animation timing, scroll ranges, frame counts
- Existing class names that CSS and GSAP depend on
- Section ownership boundaries (each component owns its own ScrollTrigger logic)
- Branding: content must stay Najib Abdirahman Mohammed
- Tech stack constraints (no unauthorized frameworks)

### Step C — Decide the output shape
Based on the task type:
- **Animation/scroll fix** → Include scroll progress ranges, frame counts, easing values, scrub settings, and pixel-level expectations
- **Content update** → Include exact text, data arrays, asset paths
- **Layout/responsive fix** → Include breakpoints, viewport widths to test, CSS properties
- **New feature** → Include acceptance criteria, integration points with existing components

### Step D — Enhance, do not rewrite
Improve the task description by:
- Making constraints explicit and unambiguous ("canvas must scrub frames 1→300 across `.section_hero` only, not the entire document")
- Adding clear success criteria for each sub-step
- Keeping the original priorities and voice intact
- Referencing specific line numbers in existing components when applicable

### Step E — Add gating for sequential work
When a task has multiple steps:
- Each step must include what the AI must verify before moving on
- Use language: **"Only proceed to the next step after the current step is fully completed and verified."**
- Every step must state its own success criteria
- The prompt must declare which files were read before any code was written

### Step F — Deliver a copy-paste-ready prompt
The final prompt in `prompts/` must be immediately executable. Structure:
1. **Goal** — one-sentence summary of what this achieves
2. **Hard constraints** — rules from this AGENTS.md that apply
3. **Files inspected** — what was read before writing the prompt
4. **Exact implementation steps** — the work to perform (gated)
5. **Success criteria** — how to know each step is done
6. **Completion mandate** — "Do not start the next step until the previous is verified. Stay faithful to the original Webflow animation behavior and this project's design system."

---
# 3. Skills
Use only these skills and reference areas:

**Project-specific**
- Existing components under `src/components/`
- `src/App.jsx` (orchestration, Lenis + GSAP setup)
- `src/webflow.css` + `src/index.css` + `src/App.css` (styling source of truth)
- `public/frames/` (frame sequence for CanvasBackground)
- `package.json` (React 19, Vite 8, GSAP, Lenis, SplitType, lucide-react)
- `netlify.toml` (build & SPA redirect)
- Original Webflow HTML/JS embeds provided by the user (animation & structure source of truth)

**Official / library docs**
- GSAP + ScrollTrigger
- Lenis
- SplitType
- Vite
- React 19

**AI & modern tooling skills (use when the user requests AI features)**
- `.agents/skills/ai-sdk` (or equivalent project skill) — Vercel AI SDK, OpenAI provider, structured output, streaming
- Any future AI-related skills the user adds (embeddings, chat, content generation, etc.)

Do not invent new skills.
Do not introduce frameworks not already in the project (no Next.js, no Tailwind unless already present, no Framer Motion, no Three.js unless explicitly requested).
For animation work, always inspect the current ScrollTrigger timelines, matchMedia breakpoints, **and the original Webflow frame/intro logic** before changing them.

---
# 4. Prompt files
Prompt files live in the `prompts/` directory. Use names like:
- `prompts/hero-animation-tweak.md`
- `prompts/canvas-frame-sequence.md`
- `prompts/preloader-timing.md`
- `prompts/work-section-projects.md`
- `prompts/contact-form-integration.md`
- `prompts/about-vortex-text.md`
- `prompts/ai-feature-<name>.md` (when using AI SDK)

Each prompt must include:
- goal
- skills read
- existing code inspected (React + original Webflow reference when relevant)
- decisions or assumptions
- files likely to change
- implementation requirements
- animation / scroll / frame requirements (if applicable)
- responsiveness requirements
- acceptance criteria
- checks to run
- exact manual test steps expected after implementation

For visual or animation tasks, also include layout, typography, spacing, colors, scroll progress ranges, frame counts, intro timing, and pixel-level expectations.

---
# 5. Architecture
Keep these layers separate:
- App shell: `App.jsx` (Lenis, GSAP ticker, Preloader state, ContactModal state, section composition)
- Sections: pure presentational + self-contained ScrollTrigger logic inside each component
- Background / sequence: `CanvasBackground` owns the frame sequence (must stay independent of section content and match original intro + scrub behavior)
- Global styles: Webflow export + custom overrides in `index.css` / `App.css`
- Static assets: `public/` (frames, photos, icons, favicon)
- Optional AI layer: only when explicitly requested — server-side or client-side AI calls isolated from pure UI components

UI must display static content and animations only (unless an AI feature is explicitly approved).
Do not introduce API routes, server actions, or data fetching unless the user explicitly requests a contact form backend, AI feature, or similar.

---
# 6. Tech stack
Use:
- React 19
- Vite 8
- GSAP 3 + ScrollTrigger
- Lenis (smooth scroll)
- SplitType
- lucide-react (icons when needed)
- Native CSS (Webflow-exported + custom)
- Netlify (hosting + SPA redirects)
- Vercel AI SDK + OpenAI provider (only when an AI feature is requested and the skill is used)

Do not use:
- Next.js / App Router (unless the user later migrates)
- Tailwind CSS (unless already added later)
- Framer Motion
- Three.js / WebGL libraries (canvas is a 2D image sequence, matching the original)
- Backend frameworks, Supabase, Clerk, or databases (unless explicitly requested)
- TypeScript (project is currently plain JSX) unless the user requests migration

---
# 7. Content source of truth
All portfolio content currently lives inside the React components as hardcoded data:
- Name, title, bio → `Hero.jsx`, `AboutSection.jsx`, `Navbar.jsx`
- Tech stack categories & items → `Hero.jsx` (right column) and `StackSection.jsx`
- Projects → `WorkSection.jsx` (`PROJECTS` array)
- Contact email & socials → `FooterContact.jsx` and `ContactModal.jsx`
- Profile / logo images → `public/`

When updating content:
- Prefer editing the existing arrays/objects inside the component
- Keep class names and DOM structure that animations depend on
- Do not hardcode new external image URLs without confirming they are permanent
- Keep the current projects unless the user supplies replacements
- Personal branding must stay Najib Abdirahman Mohammed (do not revert to the original Andrey Nalivaiko copy)

---
# 8. Animation & motion rules (critical — match original Webflow)
Animations are the core of the product. The original Webflow implementation is the reference.

## 8.1 Preloader
- Orbiting SVG text paths with animated `textLength` / `startOffset`
- Counter from 0 → 100
- Original timing ≈ 10.6 s total before the canvas intro begins
- Must call `onComplete` exactly once after the timeline finishes
- Background color and typography must stay consistent with the design system

## 8.2 Canvas / frame sequence (source of truth from original)
Original Webflow behavior that the React port must match:
- Total frames: **480** (original) — current React port may still use 300; when updating the sequence, prefer aligning to original 480 or document the intentional difference
- Frame files: zero-padded three digits (`frame_001.webp` style in original, `ezgif-frame-001.jpg` in current port)
- Intro sequence: starts at frame ~25, animates back to frame 1, **then** hands control to ScrollTrigger
- ScrollTrigger: scrubs from frame 1 → totalFrames while the hero section is sticky (`start: "top top"`, `end: "bottom bottom"`)
- Mobile uses slightly different scrub value and canvas resolution
- Drawing must cover the canvas while preserving aspect ratio (letterbox / pillarbox)
- Only redraw when the integer frame actually changes
- Prefer on-demand + cache loading; do not load the entire sequence at once if memory is a concern
- Canvas must remain behind content and tied to overall page / hero scroll progress

## 8.3 General GSAP / Lenis rules
1. Every ScrollTrigger must use `scrub` (or explicit toggleActions) and `invalidateOnRefresh: true` where the original does.
2. Prefer `gsap.matchMedia()` for desktop vs mobile differences.
3. Never destroy or recreate Lenis / GSAP ticker incorrectly — clean up in `useEffect` return functions.
4. Preserve existing progress ranges (hero stack categories, cube stops, etc.).
5. When adding new scroll-linked effects, match the easing and scrub values already used in the file **and** in the original Webflow reference.
6. Contact modal is controlled by parent state in `App.jsx`; do not introduce a second open/close system.

---
# 9. Canvas background rules
`CanvasBackground` owns the sequence.
Rules:
- Keep frame numbering zero-padded.
- Canvas resolution adapts to mobile vs desktop (match original or current proven values).
- Drawing must cover the canvas while preserving aspect ratio.
- Only redraw on integer frame change.
- Prefer the original intro → ScrollTrigger hand-off pattern when implementing or fixing the sequence.
- The canvas element must remain fixed / full-viewport (or sticky within hero) and sit behind all content.

---
# 10. Section ownership
| Section            | File                    | Responsibility                                      |
|--------------------|-------------------------|-----------------------------------------------------|
| Preloader          | Preloader.jsx           | Orbiting text paths, counter, onComplete callback   |
| Navbar             | Navbar.jsx              | Logo, links, mobile menu, "Get in touch" trigger    |
| CanvasBackground   | CanvasBackground.jsx    | Frame sequence + intro + scroll scrub               |
| Hero               | Hero.jsx                | Name, title, focus copy, stack category reveals     |
| About              | AboutSection.jsx        | Vortex text, profile image, digital clock           |
| Stack              | StackSection.jsx        | Flip cards + fan-out animation                      |
| Work               | WorkSection.jsx         | 3D cube + project data                               |
| Footer             | FooterContact.jsx       | CTA + email / socials                               |
| Contact Modal      | ContactModal.jsx        | Form UI (currently client-only submit)              |
| App shell          | App.jsx                 | Lenis, GSAP ticker, state, composition              |

---
# 11. Contact form behavior
Current implementation is client-side only:
- Form fields: name, email, budget range (min/max), details
- On submit → sets local `submitted` state and shows success UI
- No network request, no email service, no backend

If the user later requests a real submission path (Formspree, Netlify Forms, custom API, AI-assisted reply, etc.), create a dedicated prompt and keep the visual design intact.
Do not silently add third-party form services without approval.

---
# 12. Styling rules
- Primary styles live in `src/webflow.css` (large exported file). Treat it as mostly immutable.
- Custom overrides and responsive fluid type live in `src/index.css`.
- Component-specific tweaks can live in `src/App.css` or inline styles when necessary for animation.
- Prefer existing Webflow utility classes (`w-inline-block`, `padding-global`, etc.) over inventing new BEM names.
- Do not introduce a CSS-in-JS library or Tailwind unless the user explicitly requests it.
- Maintain the existing color palette, typography (DM Sans, Oswald, PT Serif), and spacing system from the original design.

---
# 13. Responsive behavior
- Desktop-first with explicit mobile breakpoints already present (768 px, 991 px, etc.).
- Stack section uses `gsap.matchMedia` to switch between absolute fan-out (desktop) and relative stacked layout (mobile).
- Canvas resolution and some ScrollTrigger scrub values already adapt to viewport width.
- When changing layout, always test both `< 768 px` and `≥ 769 px`.
- Mobile menu is controlled by local state in Navbar; keep the hamburger SVG animation working.

---
# 14. Performance requirements
- The frame sequence is the heaviest asset. Prefer lazy / on-demand loading and avoid re-decoding already-cached frames.
- Keep GSAP timelines and Lenis RAF efficient; do not add heavy work inside the ticker.
- Images in `public/` should use appropriate sizes; do not upscale unnecessarily.
- Preloader should finish in a reasonable time even on slower connections (align with original ~10.6 s intent unless the user requests a shorter experience).

---
# 15. Deployment
- Hosted on Netlify.
- `netlify.toml` runs `npm install && npm run build` and publishes `dist`.
- SPA redirect: `/*` → `/index.html` (status 200).
- Do not change the publish directory or build command without reason.
- After content or animation changes, verify the production build still works (`npm run build` + `npm run preview`).

---
# 16. Security & data
- No secrets, no environment variables required for the current static site.
- Contact form currently does not transmit data.
- Do not embed API keys or third-party service tokens in client code.
- When AI features are added, keep OpenAI / AI SDK keys server-side only (or use a secure proxy). Never expose them to the browser.
- External CDN images (Webflow CDN or jsDelivr in the original) are temporary; prefer local assets when replacing them.

---
# 17. Code standards
- Use functional components and hooks.
- Prefer small, focused components; keep animation logic inside the section that owns it.
- Clean up all GSAP ScrollTriggers, Lenis instances, and event listeners in `useEffect` return functions.
- Avoid `any`; keep plain JavaScript consistent with the rest of the codebase.
- Do not introduce TypeScript unless the user asks for a migration.
- Do not perform unrelated refactors.
- Preserve existing class names that animations and CSS depend on.
- When using AI SDK, validate structured outputs (Zod or equivalent) before rendering or storing results.

---
# 18. Testing output after implementation
After completing any feature:
1. Run `npm run lint` (oxlint).
2. Run `npm run build` to confirm production build succeeds.
3. Start `npm run dev` and manually verify:
   - Preloader completes and disappears (timing close to original intent)
   - Smooth scroll works
   - Canvas frames play intro then scrub correctly across the hero / page
   - Hero stack categories appear/disappear in order
   - About vortex text assembles
   - Stack cards fan out and flip on desktop
   - Work cube rotates through all projects
   - Contact modal opens/closes and form submits locally
   - Mobile menu and responsive layouts
4. Share the exact commands and the expected visual results.

---
# 19. Commands and checks
"Run available checks" means running these from the project root and reporting the results:
- `npm run lint` — Oxlint
- `npm run build` — Vite production build

Development and runtime:
- `npm run dev` — Vite dev server (primary testing surface)
- `npm run preview` — preview the production build locally

After implementation, run `lint` and `build` at minimum. Report the exact command output; do not claim a check passed without running it.

---
# 20. Final rule
When in doubt:
1. Keep it small.
2. Preserve existing animation timelines, class names, **and original Webflow motion behavior**.
3. Inspect the relevant React component **and** the original Webflow reference first.
4. Ask a focused question if needed.
5. Save a prompt before coding.
6. Ask if it is good to execute.
7. Implement after confirmation.
8. Run available checks.
9. Share exact test steps.

---
---

# 🎯 MASTER TASK LIST — Portfolio Completion Roadmap

> **Purpose**: This is the single source of truth for what needs to be done to bring the portfolio to production quality.
> Every new conversation MUST read this section first, pick up the next uncompleted task, and implement it fully before moving to the next.
> When a task is done, change `[ ]` to `[x]`. When in progress, change to `[/]`.

> **Last audited**: 2026-08-05
> **Audit summary**: Compared current React port against original Webflow site (andreynalivaiko.webflow.io). Found 12 critical gaps across animation, content, assets, and polish.

---

## TASK 1: Canvas Intro Sequence — Restore Preloader → Intro → ScrollTrigger Flow
**Status**: `[x]` COMPLETED
**Priority**: 🔴 CRITICAL (core animation is broken without this)
**Files**: `CanvasBackground.jsx`, `App.jsx`

### Problem
The original Webflow site has a 3-step canvas flow:
1. Preloader runs for ~10.6s
2. After preloader completes, canvas plays an **intro animation**: starts at frame 25, animates backward to frame 1
3. Only THEN does ScrollTrigger take over and scrub frames 1→480 on scroll

The current React port **skips step 2 entirely**. It loads all 300 frames at once and immediately scrubs across the entire document. This means:
- No dramatic intro "reveal" after preloader
- Canvas scrubs across ALL sections (hero + about + stack + work + footer) instead of being tied to hero section
- No preloader → canvas hand-off coordination

### Procedure
1. Read `CanvasBackground.jsx` (current: ~157 lines)
2. Read the original Webflow canvas script (lines 484–648 in the reference)
3. Modify `CanvasBackground.jsx`:
   a. Accept a `preloaderDone` prop from `App.jsx`
   b. On mount, preload frames 1–25 only
   c. Show frame 25 immediately (under the preloader overlay)
   d. When `preloaderDone` becomes true, run a GSAP tween: frame 25 → frame 1 (duration 1.0s, ease power1.out)
   e. On intro complete, initialize ScrollTrigger: scrub frame 1 → totalFrames, trigger `.section_hero`, start `top top`, end `bottom bottom`
   f. After ScrollTrigger init, begin background preload of remaining frames
4. Modify `App.jsx`:
   a. Pass `preloaderDone={loadingComplete}` to `<CanvasBackground />`
5. The canvas should scrub across the **hero section only** (matching original), not the entire document
6. Keep the about-section opacity fade in/out behavior

### Acceptance Criteria
- [x] After preloader fades, canvas plays frame 25→1 reverse intro (~1s)
- [x] After intro, scrolling through hero section scrubs frames 1→300
- [x] Canvas fades out entering about section, fades back in after
- [x] No frames are loaded until component mounts; frames 1–25 load first, rest lazy
- [x] `npm run build` passes
- [x] `npm run lint` passes

---

## TASK 2: Reactivate Hero "Get in Touch" Button
**Status**: `[x]` COMPLETED
**Priority**: 🔴 CRITICAL (core CTA is disabled)
**Files**: `Hero.jsx`

### Problem
The hero section has a "Get in Touch (Deactivated)" button that is intentionally disabled with `opacity: 0.5`, `pointerEvents: 'none'`, gray colors, and "(Deactivated)" text. This looks broken and unprofessional.

### Procedure
1. Read `Hero.jsx` lines 136–154
2. Change the disabled `<div>` back to an `<a>` or make it trigger `onOpenContact`
3. Accept an `onOpenContact` prop from `App.jsx`
4. Update `App.jsx` to pass `onOpenContact={() => setContactOpen(true)}` to `<Hero />`
5. Remove all deactivation styles: gray colors, grayscale filter, "not-allowed" cursor, "(Deactivated)" text
6. Restore original styling: normal `link-hero w-inline-block` class, normal button colors
7. Change text to "Get in Touch" (matching original "My Contact" button behavior)

### Acceptance Criteria
- [x] "Get in Touch" button is fully visible and clickable
- [x] Clicking it opens the ContactModal
- [x] Button styling matches the "View Projects" button above it
- [x] No "(Deactivated)" text visible anywhere
- [x] Mobile: button is tappable and opens modal

---

## TASK 3: Work Section — Add Proper Project Data with Local Screenshots
**Status**: `[x]` COMPLETED
**Priority**: 🔴 CRITICAL (projects use borrowed Webflow CDN images)
**Files**: `WorkSection.jsx`, `public/` (new screenshots)

### Problem
- Only 3 projects (VICALARY, YANHAL, YADA LEARN) vs original's 5
- All project images point to external Webflow CDN URLs (`cdn.prod.website-files.com`) — these are Andrey's project screenshots, not Najib's
- No project links (all "View Project" buttons are deactivated)
- No video playback on cube faces (original uses video)
- Project descriptions are generic

### Procedure
1. Read `WorkSection.jsx` (current: 299 lines)
2. Ask user for their actual project data:
   - Project names, categories, taglines, tech stacks, live URLs
   - Screenshots or videos for each project
3. If user provides screenshots: save them to `public/projects/` as optimized images
4. If user has no live projects yet: generate professional-looking placeholder screenshots using generate_image tool, save to `public/projects/`
5. Update the `PROJECTS` array with real data
6. Reactivate "View Project" links (change from `<div>` to `<a>` with `href` and `target="_blank"`)
7. If projects have live URLs, link them; if not, keep the button but link to `#` with a tooltip "Coming soon"
8. Add 2 more projects to match the original's 5-project structure (or adjust cube STOPS array if fewer)

### Acceptance Criteria
- [x] All project images are local files in `public/projects/`
- [x] No external Webflow CDN image URLs remain in WorkSection
- [x] "View Project" buttons are functional (not grayed out)
- [x] Cube rotates through all projects smoothly
- [x] Project cards show correct data for each cube face
- [x] `npm run build` passes

---

## TASK 4: Work Section — Add HUD Progress Indicator
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (missing from original)
**Files**: `WorkSection.jsx`

### Problem
The original Webflow work section has a bottom-center HUD with:
- Percentage counter (000% → 100%)
- Progress bar (thin white line that fills)
- Scene label ("OVERVIEW" → project category)

The React port has none of this.

### Procedure
1. Read original HUD code (lines 1434–1440 in Webflow reference)
2. Add HUD container JSX at the bottom of `.cube-container`
3. Add `hudPctRef`, `hudFillRef`, `hudSceneRef` refs
4. In the ScrollTrigger `onUpdate` callback, update:
   - `hudPct`: `Math.round(progress * 100)` zero-padded to 3 digits + "%"
   - `hudFill`: `width: ${pct}%`
   - `hudScene`: "OVERVIEW" when scene 0, else `project.category`
5. Style: monospace font for percentage, DM Sans for scene label, subtle white/gray colors

### Acceptance Criteria
- [x] HUD shows at bottom center of work section
- [x] Percentage fills from 000% to 100% as user scrolls
- [x] Progress bar fills proportionally
- [x] Scene label changes for each project
- [x] Mobile: HUD is positioned correctly

---

## TASK 5: Work Section — Fix Sticky Viewport Pinning
**Status**: `[x]` COMPLETED
**Priority**: 🔴 CRITICAL (work section scroll behavior)
**Files**: `WorkSection.jsx`, CSS

### Problem
The original work section uses `height: 600vh` on `.work-section` and `position: sticky` pinning on `.sticky-viewport` via ScrollTrigger with `pin: '.sticky-viewport'` and `pinSpacing: false`. The current React port has a ScrollTrigger but may not properly pin the viewport, causing the cube to scroll away instead of staying fixed while rotating.

### Procedure
1. Read `WorkSection.jsx` ScrollTrigger setup (lines 83–122)
2. Verify `.work-section` has `height: 600vh` (or equivalent in CSS/inline)
3. Add `pin: '.sticky-viewport'` and `pinSpacing: false` to the ScrollTrigger if missing
4. Ensure `.sticky-viewport` has `height: 100vh` and `overflow: hidden`
5. Test that the cube stays pinned to the viewport while scrolling through the 600vh work section

### Acceptance Criteria
- [x] Work section is 600vh tall
- [x] Sticky viewport pins to screen while cube rotates
- [x] Cube completes all rotations within the work section scroll range
- [x] After work section ends, content scrolls normally to footer
- [x] Mobile: pinning works correctly

---

## TASK 6: About Section — Add Background Text + Signature SVG
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (missing visual elements)
**Files**: `AboutSection.jsx`

### Problem
The original about section has:
- Large background text "Fundamentals of Web Development" (split across left/right)
- An animated SVG signature that draws on scroll
- A "DEV" label with pulsing dot at the bottom

The current React port may be missing some or all of these decorative elements.

### Procedure
1. Read `AboutSection.jsx` fully
2. Read original about section HTML (around lines 739–913 in Webflow reference)
3. Add the `.about-bg-text` container with left ("Fundam-entals") and right ("of Web Develop-ment") text — adjust to something relevant for Najib (e.g., "Fundamentals of Full-Stack Development")
4. Add the SVG signature element (the handwriting-style SVG path)
5. Add scroll-linked `strokeDasharray` / `strokeDashoffset` animation using GSAP ScrollTrigger
6. Add the "DEV" label with pulsing dot at bottom of about section

### Acceptance Criteria
- [x] Background text is visible behind the about content
- [x] SVG signature draws progressively as user scrolls through the about section
- [x] "DEV" label with pulsing dot appears at the bottom
- [x] Elements are properly positioned and don't interfere with vortex text animation
- [x] Mobile: background text and signature scale appropriately

---

## TASK 7: Localize All External Asset References
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (fragile external dependencies)
**Files**: `Hero.jsx`, `Navbar.jsx`, `FooterContact.jsx`, `WorkSection.jsx`, `public/`

### Problem
Multiple components reference external CDN URLs that could break:
- Arrow icon SVGs from `cdn.prod.website-files.com` (Hero buttons, Navbar, Footer)
- Project images from Webflow CDN (WorkSection — covered in Task 3)
- Logo SVG from Webflow CDN (Navbar)

### Procedure
1. Search all `.jsx` files for `cdn.prod.website-files.com` and `cdn.jsdelivr.net` URLs
2. For each external asset:
   a. Download it to `public/icons/` or `public/images/`
   b. Replace the URL with a local `/icons/filename.svg` or `/images/filename.ext` reference
3. Key assets to localize:
   - Arrow icon: `6a35157bf937edec5b945227_SVG%20(1).svg` → `public/icons/arrow-right.svg`
   - Subscribe arrow: `6a3518a536fe5f17506a2315_SVG%20(3).svg` → `public/icons/arrow-subscribe.svg`
   - Logo: `6a16b0ec12e768c86f236ff7_IMG_4698%201.svg` → `public/icons/logo.svg` (or use Najib's own logo)
4. Verify all images load correctly after changes

### Acceptance Criteria
- [x] Zero references to `cdn.prod.website-files.com` in any JSX file
- [x] Zero references to `cdn.jsdelivr.net` in any JSX file
- [x] All icons and images load from `public/`
- [x] `npm run build` passes
- [x] Visual appearance unchanged

---

## TASK 8: Preloader Text Content — Update Orbit Words for Najib
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (branding)
**Files**: `Preloader.jsx`

### Problem
The preloader orbit text may still use generic or original-inspired keywords. They should reflect Najib's identity and stack.

### Procedure
1. Read `Preloader.jsx` to see current orbit text labels
2. Update the 8 orbit text labels to reflect Najib's identity. Suggested words (inner to outer):
   - `NAJIB` (innermost)
   - `MOHAMMED`
   - `FULL-STACK`
   - `DEVELOPER`
   - `REACT`
   - `NODE.JS`
   - `JAVASCRIPT`
   - `CREATIVE` (outermost)
3. Adjust `textLength` values if the new words are significantly longer/shorter
4. Verify animation still looks correct with new text lengths

### Acceptance Criteria
- [x] All 8 orbit texts display Najib-relevant keywords
- [x] No reference to "ANDREY", "NALIVAIKO", "WEBFLOW", "THREE.JS", or "SPLINE"
- [x] Orbit animation plays smoothly with new text lengths
- [x] Counter still counts 0→100
- [x] Preloader fades out correctly

---

## TASK 9: Navbar — Update Branding and Subscribe Button
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (branding + broken link)
**Files**: `Navbar.jsx`

### Problem
- Logo and name text in the navbar needs to be confirmed as "NAJIB ABDIRAHMAN" (not "ANDREY NALIVAIKO")
- The "Subscribe" button in the original links to Webflow profile — this should either link to Najib's relevant profile or be replaced with "Get in Touch" that opens the contact modal
- Logo image may point to external CDN

### Procedure
1. Read `Navbar.jsx` fully
2. Verify name display is "NAJIB" / "ABDIRAHMAN" (or "NAJIB MOHAMMED")
3. Change "Subscribe" button behavior: make it open the contact modal (or link to Najib's LinkedIn)
4. Replace any external logo URL with local `public/` asset
5. Ensure nav links (#hero, #aboutme, #stack, #work, #footernav) all work with smooth scroll

### Acceptance Criteria
- [x] Navbar displays Najib's name, not Andrey's
- [x] Subscribe/CTA button has a valid destination
- [x] Logo loads from local file
- [x] All nav anchor links scroll smoothly to correct sections
- [x] Mobile hamburger menu works

---

## TASK 10: Footer — Update Contact Info and Links
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (branding + contact)
**Files**: `FooterContact.jsx`

### Problem
- Email, social links, and copyright text may still reference Andrey's information
- Need to confirm Najib's actual contact details

### Procedure
1. Read `FooterContact.jsx` fully
2. Update email address to Najib's
3. Update social links (LinkedIn, GitHub, etc.) to Najib's profiles
4. Update copyright text: "2026 © Najib Abdirahman Mohammed. Crafted with code & intent."
5. Ensure "Get in Touch" button opens the ContactModal

### Acceptance Criteria
- [x] Email link goes to Najib's actual email
- [x] Social links go to Najib's actual profiles
- [x] Copyright text displays Najib's name
- [x] "Get in Touch" button opens the contact modal
- [x] No reference to "Andrey Nalivaiko" in footer

---

## TASK 11: Stack Section — Review Card Content for Najib
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM (content accuracy)
**Files**: `StackSection.jsx`

### Problem
The stack cards should reflect Najib's actual skill set as a Full-Stack Developer, not Andrey's Webflow-focused stack.

### Procedure
1. Read `StackSection.jsx` fully
2. Review the 4 card categories and their skills:
   - Card 1: Should be "FRONTEND" with React, JavaScript, TypeScript, HTML/CSS, Tailwind
   - Card 2: Should be "BACKEND" with Node.js, Express, Supabase, REST APIs, PostgreSQL
   - Card 3: Should be "TOOLS & DEVOPS" with Git, Vite, Docker, CI/CD, Netlify
   - Card 4: Should be "DESIGN & UX" with Figma, Responsive Design, UI Architecture
3. Update card front letters, card back titles, and skill lists
4. Keep the card images (or replace with more relevant ones)
5. Verify flip animation still works after content changes

### Acceptance Criteria
- [x] All 4 cards reflect Najib's actual skills
- [x] No references to "Webflow", "Three.js", "Spline", "n8n", "Make", "Zapier" unless Najib actually uses them
- [x] Flip animation works on desktop (fan-out + sequential flip)
- [x] Flip animation works on mobile (vertical scroll-triggered flip)
- [x] Card content is readable on both sides

---

## TASK 12: Mobile Responsiveness Audit & Fix
**Status**: `[x]` COMPLETED
**Priority**: 🟡 MEDIUM
**Files**: All components, CSS files

### Procedure
1. Test every section at viewport widths: 375px, 414px, 768px, 1024px, 1440px
2. Check and fix:
   - Hero: text sizing, button positioning, stack categories layout
   - About: vortex text fits within viewport, image doesn't overflow
   - Stack: cards stack vertically on mobile, flip works with touch scroll
   - Work: cube scales down, project cards reposition, HUD stays visible
   - Footer: links wrap properly, button is tappable
   - Contact Modal: form fields are full-width, modal doesn't overflow
   - Navbar: hamburger menu opens/closes, links work
3. Fix any overflow, text truncation, or touch interaction issues

### Acceptance Criteria
- [x] No horizontal scroll on any mobile viewport
- [x] All text is readable (not too small or truncated)
- [x] All buttons/links are tappable (min 44px touch targets)
- [x] Animations work on touch scroll
- [x] Modal is usable on mobile

---

## TASK 13: SEO & Meta Tags
**Status**: `[x]` COMPLETED
**Priority**: 🟢 LOW
**Files**: `index.html`

### Procedure
1. Read `index.html`
2. Update:
   - `<title>`: "Najib Abdirahman Mohammed | Full-Stack Developer"
   - `<meta name="description">`: Compelling description of Najib as a developer
   - Open Graph tags (og:title, og:description, og:image, og:url)
   - Twitter card tags
   - Favicon: verify it loads (currently `favicon.svg`)
3. Add `<link rel="preconnect">` for Google Fonts if not already present

### Acceptance Criteria
- [x] Title and meta description reflect Najib's identity
- [x] OG tags are set for social sharing
- [x] Favicon loads correctly
- [x] `npm run build` passes

---

## TASK 14: Performance — Optimize Frame Loading Strategy
**Status**: `[x]` COMPLETED
**Priority**: 🟢 LOW (improvement after core features work)
**Files**: `CanvasBackground.jsx`

### Procedure
1. After Task 1 is done, review the frame loading strategy
2. Implement progressive loading:
   - Phase 1: Load frames 1–25 (for intro) immediately
   - Phase 2: After intro plays, start loading frames in proximity to current scroll position
   - Phase 3: Background-load remaining frames with `requestIdleCallback` or batched setTimeout
3. On mobile: skip every other frame during preload to reduce memory (load on-demand)
4. Add frame cache hit/miss tracking for debugging

### Acceptance Criteria
- [x] Intro frames (1–25) load before anything else
- [x] Scrolling never shows a blank canvas (frames near current position load first)
- [x] Mobile uses ~50% less memory than desktop
- [x] No performance regression in GSAP ticker

---

## TASK 15: Final Build Verification & Deploy
**Status**: `[x]` COMPLETED
**Priority**: 🟢 LOW (only after all above tasks)
**Files**: All

### Procedure
1. Run `npm run lint` — fix any errors
2. Run `npm run build` — verify clean production build
3. Run `npm run preview` — test all sections in production mode
4. Full manual test checklist:
   - [x] Preloader: orbiting text, counter 0→100, fade out
   - [x] Canvas intro: frame 25→1 plays after preloader
   - [x] Canvas scroll: frames scrub through hero section
   - [x] Hero: name, title, description correct; stack categories cycle; buttons work
   - [x] About: vortex text assembles; profile image shows; clock works; signature draws
   - [x] Stack: cards fan out and flip; content is Najib's skills
   - [x] Work: cube rotates through all projects; HUD updates; cards show correct data
   - [x] Footer: correct contact info; "Get in Touch" opens modal
   - [x] Contact Modal: opens/closes; form submits locally
   - [x] Mobile: all of the above works on < 768px
   - [x] No console errors
   - [x] No broken images or 404s
   - [x] No external CDN dependencies for critical assets
5. Deploy to Netlify
6. Test production URL

### Acceptance Criteria
- [x] Zero lint errors
- [x] Clean production build
- [x] All sections work in preview mode
- [x] Deployed and live on Netlify
- [x] Mobile-responsive and performant

---

## Task Execution Rules
1. **Sequential execution**: Complete tasks in order (1 → 15). Some tasks have dependencies.
2. **One task at a time**: Fully complete a task before starting the next. Mark `[/]` when in progress, `[x]` when done.
3. **Prompt first**: Before implementing any task, create a prompt file in `prompts/` as per Section 4 workflow.
4. **Approval required**: Ask user to approve the prompt before executing.
5. **Verify after each task**: Run `npm run lint` and `npm run build` after every task.
6. **Update this file**: After completing a task, edit this AGENTS.md to mark it `[x]`.
7. **New conversation pickup**: If a new conversation starts, read this AGENTS.md, find the first `[ ]` task, and begin from there.
