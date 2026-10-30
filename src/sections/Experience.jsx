import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { experience } from '../data/experience.js'

// Phones: compact cards that expand on tap. Desktop: full timeline, always expanded.
function Job({ job, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  const toggle = () => {
    setOpen((v) => !v)
    // Content height changes, so re-measure scroll animation positions after the expand.
    setTimeout(() => ScrollTrigger.refresh(), 350)
  }

  return (
    <li className="relative" data-aos="fade-up">
      <span className="absolute top-5 -left-[22px] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg md:top-2 md:-left-[44px]" />
      <div className="rounded-2xl border border-white/5 bg-surface/85 md:rounded-none md:border-0 md:bg-transparent">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-3 p-4 text-left active:opacity-70 md:pointer-events-none md:p-0"
        >
          <span>
            <span className="block text-[11px] text-muted md:text-sm">{job.period}</span>
            <span className="mt-0.5 block font-display text-[15px] font-semibold md:mt-1 md:text-2xl">
              {job.role}
            </span>
            {job.company && (
              <span className="block text-xs text-muted md:inline md:text-2xl md:font-display md:font-semibold">
                {job.company}
              </span>
            )}
          </span>
          <span
            className={`mt-1 rounded-full bg-white/5 p-1 text-muted transition-transform duration-300 md:hidden ${
              open ? 'rotate-180' : ''
            }`}
          >
            <Icon name="down" className="h-4 w-4" />
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <ul
              className="max-w-3xl list-disc space-y-1.5 px-4 pb-4 pl-8 text-[13px] leading-relaxed text-muted marker:text-accent md:mt-4 md:space-y-2 md:px-0 md:pb-0 md:pl-5 md:text-base"
              data-aos-stagger="fade-left"
              data-aos-step="0.07"
            >
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Experience() {
  const list = useRef()

  // The timeline line draws itself as you scroll through the section.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-timeline-line]', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: { trigger: list.current, start: 'top 75%', end: 'bottom 60%', scrub: true },
      })
    })
  })

  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Where I've worked." />
      <ol ref={list} className="relative space-y-3 pl-5 md:space-y-12 md:pl-10">
        <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-white/10" />
        <span
          aria-hidden="true"
          data-timeline-line
          className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-accent to-accent-2"
        />
        {experience.map((job, i) => (
          <Job key={job.period} job={job} defaultOpen={i === 0} />
        ))}
      </ol>
    </Section>
  )
}
