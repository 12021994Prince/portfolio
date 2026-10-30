# Mahesh Hadiyal · 3D Developer Portfolio

Personal portfolio for Mahesh Hadiyal, Shopify Developer. A single-page site with a real-time 3D scene, smooth scrolling and scroll-triggered animations.

**Stack:** React 19 · Vite 8 · Three.js · React Three Fiber · Drei · GSAP + ScrollTrigger · Lenis · Tailwind CSS 4 · Zustand

## Run it locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

## Edit the content

All text lives in `src/data/`. You never need to touch layout code to update content.

| File | What it holds |
|---|---|
| `src/data/profile.js` | Name, role, tagline, summary, stats, strengths, education, email, LinkedIn |
| `src/data/skills.js` | Skill groups (also feed the scrolling skills ticker) |
| `src/data/experience.js` | Jobs and bullet points |
| `src/data/projects.js` | Live stores: name, link, screenshot path |

Store screenshots go in `public/images/projects/` (about 960×600 JPG).

## Scroll animations

Add an attribute to any element:

```html
<div data-aos="fade-up">…</div>
<div data-aos="zoom-in" data-aos-delay="0.2" data-aos-duration="1.2">…</div>
<ul data-aos-stagger="flip-up" data-aos-step="0.15">…children animate one by one…</ul>
```

Effects: `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `zoom-in-up`, `zoom-out`, `flip-up`, `flip-left`, `blur-up`. Defined in `src/hooks/useAos.js`. Animations are skipped when the visitor's system has "Reduce motion" on.

## Project structure

```
src/
  canvas/      3D scene: Experience (the canvas), Scene (scroll poses), ShoppingBag, Orbiters, Particles
  sections/    Hero, About, Projects, Experience, Contact
  components/  Navbar, Section, SectionHeading, CountUp, TiltCard, Marquee
  hooks/       useAos, useSmoothScroll, useReducedMotion, pointer
  store/       Shared state between the page and the 3D scene
  data/        All site content
public/        favicon, link-preview image, store screenshots
```

## Performance notes

- One shared WebGL canvas for the whole page; the 3D is built from primitives, so there are no model downloads.
- Pixel ratio starts at 1.5× and drops to 1× automatically if the frame rate falls.
- On phones and portrait tablets the 3D object only appears in the hero, so it never covers text.

## Mobile layout

On phones the site behaves like an app: a floating bottom tab bar (`src/components/TabBar.jsx`) highlights the current section, skills and projects are swipeable carousels, jobs are tap-to-expand cards, and contact options are list rows. All of this switches to the desktop layout at the `md` breakpoint (768px).

## Deploy (free, on Vercel)

1. Push this repo to GitHub.
2. Sign in at https://vercel.com with GitHub, choose **Add New → Project**, and import the repo.
3. Name the project `mahesh-hadiyal` and click **Deploy**. Vercel detects Vite automatically.
4. Every later `git push` redeploys the site.

`VITE_SITE_URL` in `.env` is used for link previews. If your live URL differs from `https://mahesh-hadiyal.vercel.app`, update it, then commit and push.
