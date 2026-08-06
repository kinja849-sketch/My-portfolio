# Task 3: Work Section — Add Proper Project Data with Local Screenshots

## Goal
Update the `WorkSection.jsx` component with 5 projects featuring local image assets from `/projects/`, functional external links, and full cube face rotation support for 5 project stops.

## Hard Constraints
- Remove all external Webflow CDN image URLs (`cdn.prod.website-files.com`)
- Use local image paths `/projects/vicalary.jpg`, `/projects/yanhal.jpg`, `/projects/yada-learn.jpg`, `/projects/photonix.jpg`, `/projects/neura-ai.jpg`
- Support 5 projects in `PROJECTS` array
- 3D Prism cube STOPS array must handle 5 project stops + 1 overview stop (6 rotation steps total)
- Re-activate "View Project" links with `<a>` tag and `target="_blank"`
- Keep existing class names and layout structure

## Files Inspected
- `src/components/WorkSection.jsx` (299 lines)
- `public/projects/` (5 local images verified)

## Exact Implementation Steps

### Step 1: Update PROJECTS array in WorkSection.jsx
- Expand `PROJECTS` array from 3 to 5 projects:
  1. **VICALARY**: Category 'Web Application', Stack ['JavaScript', 'React', 'NodeJS', 'Tailwind'], Image '/projects/vicalary.jpg', Link '#'
  2. **YANHAL**: Category 'Web Platform', Stack ['React', 'TypeScript', 'NodeJS', 'Tailwind'], Image '/projects/yanhal.jpg', Link '#'
  3. **YADA LEARN**: Category 'EdTech Platform', Stack ['React', 'Supabase', 'TypeScript', 'NodeJS'], Image '/projects/yada-learn.jpg', Link '#'
  4. **PHOTONIX**: Category 'Automation Hub', Stack ['React', 'NodeJS', 'GSAP', 'REST API'], Image '/projects/photonix.jpg', Link '#'
  5. **NEURA-AI**: Category 'AI Application', Stack ['React', 'TypeScript', 'OpenAI', 'Tailwind'], Image '/projects/neura-ai.jpg', Link '#'
- **Success criteria**: 5 projects defined with local image paths.

### Step 2: Update STOPS and Cube Rotation Logic
- Set `STOPS` array for 6 scenes (0=Overview, 1=Vicalary, 2=Yanhal, 3=Yada Learn, 4=Photonix, 5=Neura-AI):
  `[{ rx: 90, ry: 0 }, { rx: 0, ry: 0 }, { rx: 0, ry: -90 }, { rx: 0, ry: -180 }, { rx: 0, ry: -270 }, { rx: 0, ry: -360 }]`
- Map cube faces (front, right, back, left) to display the correct project images
- Re-enable `View Project` link buttons as `<a className="card-btn" href={project.link} target="_blank" rel="noopener noreferrer">View Project →</a>`

### Step 3: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Stay faithful to the original Webflow cube rotation behavior.
