# Task 6: About Section — Add Background Text + Signature SVG

## Goal
Add the handwriting-style SVG signature element to `AboutSection.jsx` and animate its stroke paths on scroll using GSAP ScrollTrigger, matching the original Webflow design.

## Hard Constraints
- Must include the `.scroll-signature` SVG element with 3 paths
- Must use GSAP `strokeDasharray` and `strokeDashoffset` scroll-linked animation
- Must trigger on `.section_about` scroll (`start: "top 30%"`, `end: "bottom 70%"`, `scrub: 0.3`)
- Must maintain existing vortex text, profile photo, and clock functionality

## Files Inspected
- `src/components/AboutSection.jsx`
- Original Webflow reference code (lines 861–913)

## Exact Implementation Steps

### Step 1: Add SVG signature element to AboutSection.jsx
- Add SVG JSX inside `.heading-about-wrapper`:
  ```jsx
  <svg ref={signatureRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446 526" preserveAspectRatio="xMidYMid meet" fill="none" className="scroll-signature" style={{ width: '12rem', height: '8rem', maxWidth: '100%', display: 'block', margin: '1rem auto 0' }}>
    <path d="M428.972 55.0117C428.972 55.2241 428.117 57.6385 426.303 62.3293C424.309 67.1116 421.655 74.7695 418.914 83.2617C417.759 86.5654 417.082 87.8268 415.402 90.7299" stroke="black" strokeWidth="8" strokeLinecap="round"/>
    <path d="M133.917 188.813C133.701 188.813 136.765 184.732 146.417 173.971C161.527 157.126 177.094 140.365 183.481 130.708C192.221 117.492 187.527 161.93 195.136 170.588C197.03 172.744 199.914 173.282 203.464 172.591C207.014 171.9 211.61 169.445 238.891 145.62C266.173 121.796 316.001 76.6765 345.072 48.3177C374.143 19.959 380.946 9.72822 381.346 7.1812C382.353 0.765777 364.611 21.4124 350.47 46.6183C339.839 65.569 326.29 99.1843 275.785 174.997C225.28 250.809 139.277 368.351 88.9205 434.575C38.5635 500.799 26.458 512.143 19.6579 517.034C12.8578 521.925 11.73 520.019 9.84449 515.017C4.9787 502.107 4.22376 484.668 10.5483 463.411C14.2927 450.827 23.2277 435.998 35.5731 417.664C47.9186 399.331 64.4529 378.302 121.343 329.331C178.232 280.361 274.976 204.086 318.479 169.37C361.982 134.655 349.313 143.811 338.069 153.575C316.422 172.372 305.407 188.266 303.946 194.514C303.494 196.445 308.682 195.386 321.644 185.528C334.607 175.669 356.478 156.921 368.319 146.372C380.16 135.824 381.308 134.042 379.746 135.138C363.547 146.502 358.714 160.849 359.47 163.538C362.132 173.006 395.398 156.738 412.252 145.263C434.172 130.338 437.915 116.827 438.841 114.498C438.462 113.735 436.362 113.821 436.164 113.918C435.965 114.016 437.732 114.122 439.552 114.231" stroke="black" strokeWidth="8" strokeLinecap="round"/>
    <path d="M245.111 257.72C245.751 257.504 264.87 248.568 300.636 230.255C317.949 221.39 332.214 210.881 350.558 201.104C368.903 191.327 390.551 181.957 402.49 176.884C414.428 171.812 416.001 171.321 420.794 168.347" stroke="black" strokeWidth="8" strokeLinecap="round"/>
  </svg>
  ```

### Step 2: Add GSAP stroke animation logic
- In `useEffect`:
  ```javascript
  const signatureSvg = signatureRef.current;
  if (signatureSvg && aboutSection) {
    const paths = signatureSvg.querySelectorAll('path');
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    const sigTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 30%',
        end: 'bottom 70%',
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });

    paths.forEach((path) => {
      sigTl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 });
    });
  }
  ```

### Step 3: Run checks
- `npx oxlint`
- `npm run build`

## Completion Mandate
Do not start the next step until the previous is verified. Stay faithful to original Webflow SVG signature animation.
