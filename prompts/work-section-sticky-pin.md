# Task 5: Work Section — Fix Sticky Viewport Pinning

## Goal
Ensure the work section viewport (`.sticky-viewport`) pins cleanly during page scroll while the 3D cube rotates through all project scenes.

## Hard Constraints
- Must add `pin: '.sticky-viewport'` and `pinSpacing: false` to `ScrollTrigger.create` in `WorkSection.jsx`
- Must maintain `.work-section` height (600vh) to provide 5 full scene rotations
- `.sticky-viewport` must stay 100vh high and fixed to top during scroll range
- Must clean up ScrollTrigger properly on unmount

## Files Inspected
- `src/components/WorkSection.jsx` (lines 110–125)
- `src/index.css` (lines 366–381)
- Original Webflow reference script (lines 1545–1553)

## Exact Implementation Steps

### Step 1: Update ScrollTrigger configuration in WorkSection.jsx
- Pass `pin: '.sticky-viewport'` and `pinSpacing: false` to `ScrollTrigger.create` inside `useEffect`:
  ```javascript
  const st = ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    pin: '.sticky-viewport',
    pinSpacing: false,
    invalidateOnRefresh: true,
    onUpdate: (self) => { ... }
  });
  ```

### Step 2: Ensure CSS rules for .work-section and .sticky-viewport
- In `src/index.css`, verify `.work-section` has `height: 600vh; position: relative;` and `.sticky-viewport` has `height: 100vh; width: 100%; overflow: hidden; position: relative;` (GSAP pin handles positioning).

### Step 3: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Stay faithful to original Webflow ScrollTrigger pinning architecture.
