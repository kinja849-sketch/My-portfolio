# Task 13: SEO & Meta Tags

## Goal
Update `index.html` title, meta description, Open Graph tags, Twitter cards, and favicon references to accurately showcase Najib Abdirahman Mohammed as a Full-Stack Developer.

## Hard Constraints
- Title must be `Najib Abdirahman Mohammed | Full-Stack Developer`
- Description must highlight full-stack web development with React, Node.js, JavaScript, and finance/analytical rigor
- Favicon link must point to `/favicon.svg`
- Must include complete Open Graph (`og:title`, `og:description`, `og:type`) and Twitter Card tags

## Files Inspected
- `index.html` (18 lines)
- `public/favicon.svg`

## Exact Implementation Steps

### Step 1: Update index.html head
- Update `<title>` tag
- Update `<meta name="description">` tag
- Change favicon link to `/favicon.svg`
- Add `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:type" content="website">`
- Add `<meta name="twitter:card" content="summary_large_image">`

### Step 2: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Maintain Google Fonts preconnect links.
