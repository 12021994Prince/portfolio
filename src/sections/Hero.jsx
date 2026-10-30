import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { profile } from '../data/profile.js'

export default function Hero() {
  const ref = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          // clearProps removes GSAP's leftover inline styles once each element lands.
          .timeline({ defaults: { ease: 'power4.out', duration: 1.1, clearProps: 'transform,opacity' } })
          .from('[data-hero="eyebrow"]', { y: 20, opacity: 0, delay: 0.2 })
          .from('[data-hero="word"]', { yPercent: 110, stagger: 0.08 }, '-=0.8')
          .from('[data-hero="tagline"]', { y: 20, opacity: 0 }, '-=0.7')
          .from('[data-hero="cta"]', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.8')
          .from('[data-hero="scroll"]', { opacity: 0 }, '-=0.4')
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="hero"
      className="relative z-10 flex min-h-svh items-end px-4 pb-32 md:px-8 md:pb-28 portrait:md:pb-40 landscape:lg:items-center landscape:lg:pb-0"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p data-hero="eyebrow" className="mb-2 text-xs text-muted md:mb-4 md:text-sm">
          Hi, I&apos;m {profile.firstName} · {profile.location}
        </p>
        <h1 className="max-w-3xl font-display text-[2.5rem] leading-[1.05] font-bold tracking-tight md:text-7xl">
          {profile.role.split(' ').map((word, i, arr) => (
            <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
              <span data-hero="word" className="inline-block">
                {word}
                {i === arr.length - 1 ? <span className="text-accent">.</span> : ' '}
              </span>
            </span>
          ))}
        </h1>
        <p data-hero="tagline" className="mt-3 max-w-xl text-[15px] text-muted md:mt-6 md:text-lg">
          {profile.tagline}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:flex md:flex-wrap md:gap-4">
          <a
            data-hero="cta"
            href="#projects"
            className="rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-110 active:scale-95 md:px-6 md:py-3"
          >
            View projects
          </a>
          <a
            data-hero="cta"
            href="#contact"
            className="rounded-full border border-white/15 bg-bg/40 px-4 py-2.5 text-center text-sm font-semibold transition hover:border-white/40 active:scale-95 md:px-6 md:py-3"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div
        data-hero="scroll"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted md:flex"
      >
        Scroll
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}
