import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'

// Counts "600+" up from 0 when it scrolls into view, and resets when you scroll back above it,
// so it replays like the other scroll animations. Shows the final value without JS or with reduced motion.
export default function CountUp({ value, delay = 0.5, duration = 2.4 }) {
  const ref = useRef()
  const [, num, suffix] = String(value).match(/^(\d+)(.*)$/) || [null, null, value]

  useGSAP(() => {
    if (!num) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const el = ref.current
      const counter = { v: 0 }
      const render = () => {
        el.textContent = `${Math.round(counter.v)}${suffix}`
      }
      render()

      const tween = gsap.to(counter, {
        v: Number(num),
        delay,
        duration,
        ease: 'power1.out',
        paused: true,
        onUpdate: render,
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          onEnter: () => tween.restart(true),
          onLeaveBack: () => {
            tween.pause(0)
            counter.v = 0
            render()
          },
        },
      })

      return () => {
        el.textContent = value
      }
    })
  })

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}
