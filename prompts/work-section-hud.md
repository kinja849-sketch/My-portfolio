# Task 4: Work Section — Add HUD Progress Indicator

## Goal
Add a bottom-center HUD progress indicator to `WorkSection.jsx` that updates scroll percentage (000% → 100%), progress bar width (0% → 100%), and current scene label ("OVERVIEW" → project category) during work section scroll.

## Hard Constraints
- Must stay centered at bottom of `.cube-container` (`bottom: 2rem`, `left: 50%`, `transform: translateX(-50%)`)
- Must use `hudPctRef`, `hudFillRef`, `hudSceneRef` React refs for direct high-performance DOM updates in ScrollTrigger `onUpdate`
- Must format percentage with 3 digits padded with zeros (`000%` to `100%`)
- Must show "OVERVIEW" on scene 0, and current project category on scenes 1–5

## Files Inspected
- `src/components/WorkSection.jsx`
- Original Webflow reference code (lines 1434–1440, 1557–1585)

## Exact Implementation Steps

### Step 1: Add HUD refs and JSX to WorkSection.jsx
- Add `hudPctRef`, `hudFillRef`, `hudSceneRef` refs using `useRef(null)`
- Render `.hud-container` JSX inside `.cube-container`:
  ```jsx
  <div className="hud-container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 20 }}>
    <div ref={hudPctRef} id="hud-pct" style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>000%</div>
    <div style={{ width: '6rem', height: '1px', background: 'rgba(255,255,255,0.06)', marginTop: '0.4rem', position: 'relative' }}>
      <div ref={hudFillRef} id="hud-fill" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%', background: '#fff', opacity: 0.65 }}></div>
    </div>
    <div ref={hudSceneRef} id="hud-scene" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.45rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.2)', marginTop: '0.3rem', textTransform: 'uppercase' }}>OVERVIEW</div>
  </div>
  ```

### Step 2: Update ScrollTrigger onUpdate in WorkSection.jsx
- Inside `onUpdate: (self) =>`:
  ```javascript
  const pct = Math.round(self.progress * 100);
  if (hudPctRef.current) hudPctRef.current.textContent = String(pct).padStart(3, '0') + '%';
  if (hudFillRef.current) hudFillRef.current.style.width = `${pct}%`;
  if (hudSceneRef.current) {
    hudSceneRef.current.textContent = sceneIndex === 0 ? 'OVERVIEW' : (PROJECTS[sceneIndex - 1]?.category || 'OVERVIEW');
  }
  ```

### Step 3: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Stay faithful to the original Webflow HUD styling.
