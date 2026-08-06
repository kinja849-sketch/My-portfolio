# Task 8: Preloader Text Content — Update Orbit Words for Najib

## Goal
Update the orbiting SVG text paths in `Preloader.jsx` to reflect Najib Abdirahman Mohammed's identity and full-stack development skills, removing leftover template words like "3D SPLINE", "THREE.JS", and "WEBFLOW".

## Hard Constraints
- Keep all 8 orbiting SVG paths and GSAP rotation/stretch animation intact
- Keep counter 0 → 100 counting timeline intact
- Keep preloader completion callback `onComplete` intact
- Match orbit text lengths to word character counts to avoid SVG distortion

## Files Inspected
- `src/components/Preloader.jsx` (lines 116–140)

## Exact Implementation Steps

### Step 1: Update SVG textPath elements in Preloader.jsx
- Orbit 1: `REACT.JS` (`textLength="280"`)
- Orbit 2: `NODE.JS` (`textLength="250"`)
- Orbit 3: `FULL-STACK` (`textLength="310"`)
- Orbit 4: `DEVELOPER` (`textLength="260"`)
- Orbit 5: `JAVASCRIPT` (`textLength="300"`)
- Orbit 6: `CREATIVE` (`textLength="200"`)
- Orbit 7: `MOHAMMED` (`textLength="230"`)
- Orbit 8: `NAJIB` (`textLength="190"`)

### Step 2: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Maintain original preloader timing and visual rotation.
