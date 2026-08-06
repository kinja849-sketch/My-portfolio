# Task 1: Canvas Intro Sequence — Restore Preloader → Intro → ScrollTrigger Flow

## Goal
Restore the original Webflow 3-step canvas animation flow: Preloader completes → canvas plays intro (frame 25→1) → ScrollTrigger takes over and scrubs frames on hero scroll.

## Hard Constraints
- Canvas must scrub frames across `.section_hero` only, not the entire document
- Intro animation: frame 25 → frame 1, duration 1.0s, ease `power1.out`
- Intro must wait for preloader to complete before starting
- Only redraw on integer frame change
- Canvas resolution: 1920×1080 desktop, 960×540 mobile (match current values)
- Drawing must cover canvas while preserving aspect ratio (letterbox/pillarbox)
- About-section opacity fade in/out must be preserved
- Clean up all ScrollTriggers in useEffect return

## Files Inspected
- `src/components/CanvasBackground.jsx` (current: 157 lines — scrubs all 300 frames across entire document)
- `src/App.jsx` (current: 66 lines — passes no props to CanvasBackground)
- Original Webflow canvas script (lines 484–648 of reference: intro frame 25→1, then ScrollTrigger on `.section_hero`)

## Exact Implementation Steps

### Step 1: Modify App.jsx to pass preloaderDone prop
- Add `preloaderDone={loadingComplete}` prop to `<CanvasBackground />`
- **Success criteria**: CanvasBackground receives the boolean prop. No visual change yet.
- Only proceed after this step is verified.

### Step 2: Rewrite CanvasBackground.jsx intro + scroll flow
- Accept `preloaderDone` prop
- On mount: preload frames 1–25 only, show frame 25 on canvas immediately
- When `preloaderDone` becomes true (useEffect watching the prop): play GSAP tween frame 25→1, duration 1.0s, ease power1.out
- On intro tween complete: initialize ScrollTrigger that scrubs frame 1→300, trigger `.section_hero`, start `top top`, end `bottom bottom`, scrub value isMobile ? 0.8 : 0.5
- After ScrollTrigger init: begin lazy background preload of remaining frames (26–300)
- Keep about-section fade logic
- **Success criteria**: After preloader fades, canvas plays reverse intro, then scrolling through hero scrubs frames. Canvas fades out for about section.
- Only proceed after this step is verified.

### Step 3: Run checks
- `npm run lint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Stay faithful to the original Webflow animation behavior and this project's design system.
