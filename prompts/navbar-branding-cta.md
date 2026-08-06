# Task 9: Navbar — Update Branding and Subscribe Button

## Goal
Verify and polish `Navbar.jsx` branding, ensuring name display, logo image, smooth scroll anchor targets, and "Get in touch" contact modal CTA function cleanly across desktop and mobile.

## Hard Constraints
- Name must stay "NAJIB ABDIRAHMAN"
- Logo image must be local `/Silhouette For Najib Abdirahman portfolio.jpg`
- Nav links (#hero, #aboutme, #stack, #work, #footernav) must match section IDs
- "Get in touch" CTA button must invoke `onOpenContact` callback
- Mobile hamburger menu must toggle smoothly

## Files Inspected
- `src/components/Navbar.jsx`

## Exact Implementation Steps

### Step 1: Verify Navbar.jsx structure
- Confirm function accepts `onOpenContact` prop
- Confirm brand logo image path is `/Silhouette For Najib Abdirahman portfolio.jpg`
- Confirm brand text is `NAJIB <br /> ABDIRAHMAN`
- Confirm CTA button text is `Get in touch` and triggers `onOpenContact`

### Step 2: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Maintain original navbar sticky positioning and hamburger animation.
