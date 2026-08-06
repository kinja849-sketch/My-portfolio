# Task 7: Localize All External Asset References

## Goal
Replace all external CDN URLs (`cdn.prod.website-files.com`) in `Hero.jsx`, `Navbar.jsx`, `FooterContact.jsx`, `ContactModal.jsx`, and `StackSection.jsx` with local SVG/image assets or clean inline SVGs, eliminating all third-party image/icon network dependencies.

## Hard Constraints
- Must replace `6a35157bf937edec5b945227_SVG%20(1).svg` (button arrow) in `Hero.jsx` and `FooterContact.jsx`
- Must replace `6a3518a536fe5f17506a2315_SVG%20(3).svg` (subscribe arrow) in `Navbar.jsx`
- Must replace `6a384b480d55b37ecbe8b45e_69c6e447b7d4ded1ceb40a45_ic_baseline-close.svg` in `ContactModal.jsx`
- Must replace external card background images in `StackSection.jsx`
- Zero functional or visual regression

## Files Inspected
- `src/components/Hero.jsx`
- `src/components/Navbar.jsx`
- `src/components/FooterContact.jsx`
- `src/components/ContactModal.jsx`
- `src/components/StackSection.jsx`

## Exact Implementation Steps

### Step 1: Replace button arrow image in Hero.jsx & FooterContact.jsx
- Use inline SVG:
  ```jsx
  <svg width="14" height="14" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-btn">
    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  ```

### Step 2: Replace subscribe arrow in Navbar.jsx
- Use inline SVG:
  ```jsx
  <svg width="14" height="14" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-btn">
    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  ```

### Step 3: Replace close icon in ContactModal.jsx
- Use inline SVG:
  ```jsx
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="image-9" style={{ color: '#fff' }}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" fill="currentColor"/>
  </svg>
  ```

### Step 4: Fix StackSection.jsx background video/image references
- Remove external background video/poster dependencies or replace card texture images with CSS dark gradient backgrounds (`background: linear-gradient(135deg, #18181b 0%, #09090b 100%)`).

### Step 5: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Eliminate all external image CDN dependencies.
