import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// AOS-style "animate on scroll", built on GSAP ScrollTrigger.
//
//   data-aos="fade-up"            animate this element when it scrolls into view
//   data-aos-delay="0.2"          optional delay in seconds
//   data-aos-duration="1.2"       optional duration in seconds
//   data-aos-stagger="zoom-in"    animate each child, staggered left to right per row
//   data-aos-step="0.1"           optional stagger gap for data-aos-stagger
//
// Like AOS, elements animate out again when you scroll back up past them.
export const EFFECTS = {
  fade: { opacity: 0 },
  'fade-up': { opacity: 0, y: 70 },
  'fade-down': { opacity: 0, y: -70 },
  'fade-right': { opacity: 0, x: -90 }, // moves to the right, so it starts on the left
  'fade-left': { opacity: 0, x: 90 },
  'zoom-in': { opacity: 0, scale: 0.8 },
  'zoom-in-up': { opacity: 0, scale: 0.8, y: 60 },
  'zoom-out': { opacity: 0, scale: 1.2 },
  'flip-up': { opacity: 0, rotationX: -80, transformOrigin: '50% 100%' },
  'flip-left': { opacity: 0, rotationY: -80, transformOrigin: '0% 50%' },
  'blur-up': { opacity: 0, y: 40, filter: 'blur(14px)' },
}

const NEUTRAL = { opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0, rotationY: 0, filter: 'blur(0px)' }

function animate(el, effect, delay) {
  const from = { ...(EFFECTS[effect] || EFFECTS['fade-up']), transformPerspective: 1000 }
  const to = {}
  for (const key of Object.keys(from)) if (key in NEUTRAL) to[key] = NEUTRAL[key]

  gsap.fromTo(el, from, {
    ...to,
    delay,
    duration: Number(el.dataset.aosDuration) || 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
  })
}

// Number of items in the first visual row, so stagger delays restart on each row.
function columns(children) {
  const top = children[0]?.offsetTop
  return Math.max(1, children.filter((c) => c.offsetTop === top).length)
}

export function useAos() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-aos]').forEach((el) => {
        animate(el, el.dataset.aos, Number(el.dataset.aosDelay) || 0)
      })

      gsap.utils.toArray('[data-aos-stagger]').forEach((parent) => {
        const children = Array.from(parent.children)
        const step = Number(parent.dataset.aosStep) || 0.12
        const cols = columns(children)
        children.forEach((child, i) => animate(child, parent.dataset.aosStagger, (i % cols) * step))
      })
    })

    // Images and fonts can shift layout after load, so re-measure trigger positions.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  })
}
