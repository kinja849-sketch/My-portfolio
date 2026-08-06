# Task 14: Performance — Optimize Frame Loading Strategy

## Goal
Verify and tune the progressive frame loading architecture in `CanvasBackground.jsx` to ensure fast initial page load, low memory footprint on mobile devices, and zero-stutter frame scrubbing during scroll.

## Hard Constraints
- Phase 1 must load frames 1–25 immediately on mount
- Mobile devices must use 50% frame skipping during preload (`step = isMobile ? 2 : 1`)
- On-demand fallback loading must draw frames as soon as they load if image cache misses during scrub
- Canvas background must clean up all GSAP timelines and resize listeners on unmount

## Files Inspected
- `src/components/CanvasBackground.jsx`

## Exact Implementation Steps

### Step 1: Verify CanvasBackground.jsx frame loading strategy
- Confirm frames 1–25 load synchronously on mount
- Confirm intro animation triggers when `preloaderDone` is true
- Confirm background preload uses step interval on mobile
- Confirm `requestAnimationFrame` drawing loop handles integer frame changes only

### Step 2: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Maintain smooth 60fps canvas animation rendering.
