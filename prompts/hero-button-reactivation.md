# Task 2: Reactivate Hero "Get in Touch" Button

## Goal
Restore the disabled "Get in Touch (Deactivated)" CTA button in the hero section to a fully functional, styled button that opens the contact modal when clicked.

## Hard Constraints
- Must match the styling of the "View Projects" button in the hero section
- Must use `onOpenContact` prop passed from `App.jsx`
- Must remove all inline disabled styling (grayscale, opacity 0.5, pointerEvents none, cursor not-allowed)
- Text must be "My Contact" or "Get in Touch" without "(Deactivated)"

## Files Inspected
- `src/components/Hero.jsx` (lines 136–154)
- `src/App.jsx` (line 55)

## Exact Implementation Steps

### Step 1: Update App.jsx
- Pass `onOpenContact={() => setContactOpen(true)}` to `<Hero />`
- **Success criteria**: `<Hero onOpenContact={() => setContactOpen(true)} />` is passed.

### Step 2: Update Hero.jsx
- Accept `onOpenContact` prop in `Hero({ onOpenContact })`
- Replace disabled `<div>` with `<a href="#footernav" className="link-hero w-inline-block" onClick={(e) => { e.preventDefault(); onOpenContact?.(); }}>`
- Remove all inline style overrides (`opacity`, `pointerEvents`, `backgroundColor`, `borderColor`, `color`, `filter`)
- Change button text to "Get in Touch" or "My Contact"
- **Success criteria**: Button is fully styled, clickable, and opens the ContactModal.

### Step 3: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Stay faithful to the original Webflow design system.
