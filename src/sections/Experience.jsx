import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { experience } from '../data/experience.js'

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
      <ol ref={list} className="relative space-y-12 pl-6 md:pl-10">
        <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-white/10" />
        <span
          aria-hidden="true"
          data-timeline-line
          className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-accent to-accent-2"
        />
        {experience.map((job) => (
          <li key={job.period} className="relative" data-aos="fade-up">
            <span className="absolute top-2 -left-[28px] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg md:-left-[44px]" />
            <p className="text-sm text-muted">{job.period}</p>
            <h3 className="mt-1 font-display text-xl font-semibold md:text-2xl">
              {job.role}
              {job.company && <span className="text-muted"> · {job.company}</span>}
            </h3>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted marker:text-accent" data-aos-stagger="fade-left" data-aos-step="0.07">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
