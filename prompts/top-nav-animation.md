# Top Navbar Centering & Scroll Animation Implementation Plan

## Goal
Center the dark capsule navigation pill ("About", "Stack", "Work", "Contact") at the top of the viewport, remove the unwanted stacked links on the left side, enhance the pill size and typography, and implement a smooth scroll-linked animation using Framer Motion / GSAP.

## Hard Constraints
- Follow `AGENTS.md` architecture and styling principles.
- Maintain existing section links (`#aboutme`, `#stack`, `#work`, `#footernav`).
- Preserve responsive mobile layout functionality.
- Do not introduce breaking changes to Lenis or GSAP ScrollTrigger ticker.

## Files Inspected
- `src/components/Navbar.jsx`
- `src/components/ui/dock.jsx`
- `src/components/ui/dock.tsx`
- `src/index.css`
- `src/webflow.css`
- `AGENTS.md`

## Exact Implementation Steps

### Step 1: Clean Up Left-Side Stacked Links & Center Navbar Container
- Remove the leftover `.nav_menu` stacked block elements from the desktop layout in `Navbar.jsx`.
- Position the top navbar as a fixed, centered header component (`fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto`).
- Ensure logo and brand elements remain properly aligned or integrated into the top bar system as requested.

### Step 2: Enhance Pill Size and Visual Polish
- Increase navigation text size to `text-base` / `text-lg` with `font-serif` typography.
- Expand container padding (`px-8 py-3.5`) and gap between items (`gap-8`).
- Scale white bullet dots (`w-2.5 h-2.5 rounded-full bg-white`) with subtle glow box-shadow.
- Enhance dark capsule styling (`bg-[#1a1918]/95`, `backdrop-blur-xl`, `border border-white/15`, `shadow-[0_15px_40px_rgba(0,0,0,0.7)]`).

### Step 3: Implement Scroll-Linked Animation
- Add scroll progress listener using Framer Motion `useScroll` / GSAP `ScrollTrigger`.
- As user scrolls down past 50px:
  - Smoothly scale pill from `1.0` to `0.92` or compact layout (`px-6 py-2.5`).
  - Darken capsule background (`bg-[#121110]/95`).
  - Enhance border opacity and shadow depth.
- When user scrolls back near the top (scrollY < 50px), smoothly transition back to full prominent scale.

## Success Criteria
- Left-side stacked blue links are completely removed.
- Top navigation capsule is perfectly centered horizontally at the top of the screen.
- Navigation pill size and typography are enhanced and readable.
- Scroll animation smoothly reacts when scrolling down/up.
- All section links (`About`, `Stack`, `Work`, `Contact`) trigger smooth scrolling.
- Production build (`npm run build`) and oxlint pass without errors.
