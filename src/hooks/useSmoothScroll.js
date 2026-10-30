import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { MathUtils } from 'three'
import { useAppStore } from '../store/useAppStore.js'

export const SECTION_IDS = ['hero', 'about', 'projects', 'experience', 'contact']

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Also publishes scroll progress and the current section stage for the 3D scene.
export function useSmoothScroll(enabled) {
  useEffect(() => {
    let lenis
    let tick
    if (enabled) {
      lenis = new Lenis({ duration: 1.1, anchors: { offset: -72 } })
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => useAppStore.getState().setScrollProgress(self.progress),
    })

    // Each section holds the scene still for most of its length,
    // then eases it toward the next section's pose near the end.
    const stages = SECTION_IDS.map((id, i) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: i === 0 ? 'top top' : 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const stage = Math.min(i + MathUtils.smoothstep(self.progress, 0.55, 1), SECTION_IDS.length - 1)
          useAppStore.getState().setStage(stage)
        },
      }),
    )

    return () => {
      stages.forEach((t) => t.kill())
      progress.kill()
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
    }
  }, [enabled])
}
