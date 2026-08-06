# Task 10: Footer — Update Contact Info and Links

## Goal
Verify and polish `FooterContact.jsx` contact details, social links, copyright notice, and ContactModal CTA button to ensure zero leftover original developer references.

## Hard Constraints
- Email must be `najibabdirahman074@gmail.com`
- Phone number must be `+62 82226369835`
- Copyright line must be `2026 © Edition Najib Abdirahman Mohammed. Crafted with code & intent.`
- "Get in touch" CTA button must invoke `onOpenContact` callback
- Clean inline SVG arrow icon (no external CDN dependencies)

## Files Inspected
- `src/components/FooterContact.jsx`

## Exact Implementation Steps

### Step 1: Verify FooterContact.jsx
- Confirm email `mailto:najibabdirahman074@gmail.com` link is working
- Confirm phone `tel:+6282226369835` link is working
- Confirm copyright notice is branded for Najib Abdirahman Mohammed
- Confirm CTA button opens ContactModal

### Step 2: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Maintain original Webflow footer layout structure.
