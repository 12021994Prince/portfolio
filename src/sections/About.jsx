import CountUp from '../components/CountUp.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { education, profile } from '../data/profile.js'
import { skills } from '../data/skills.js'

const card = 'rounded-2xl border border-white/5 bg-surface/85'
// Phones: horizontal swipe row with snap. Desktop: regular grid.
const carousel =
  'no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="E-commerce, built properly." />

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div
          className="space-y-3 text-[15px] leading-relaxed text-muted md:space-y-4 md:text-lg"
          data-aos-stagger="fade-right"
          data-aos-step="0.15"
        >
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <dl
          className="grid grid-cols-3 gap-2 self-start md:grid-cols-1 md:gap-4"
          data-aos-stagger="fade-left"
          data-aos-step="0.15"
        >
          {profile.stats.map((s) => (
            <div key={s.label} className={`${card} p-3 md:p-5`}>
              <dd className="font-display text-2xl font-bold text-fg md:mt-1 md:text-4xl">
                <CountUp value={s.value} />
              </dd>
              <dt className="mt-0.5 text-[11px] leading-tight text-muted md:order-first md:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-10 mb-3 flex items-center justify-between md:hidden">
        <h3 className="font-display text-base font-semibold">Skills</h3>
        <span className="text-xs text-muted">Swipe →</span>
      </div>
      <div className={`${carousel} md:mt-20`} data-aos-stagger="zoom-in-up" data-aos-step="0.1">
        {skills.map((g) => (
          <div
            key={g.group}
            className={`${card} w-[78%] shrink-0 snap-start p-4 transition hover:border-accent/40 md:w-auto md:p-6`}
          >
            <h3 className="mb-3 font-display text-sm font-semibold md:mb-4 md:text-base">{g.group}</h3>
            <ul className="flex flex-wrap gap-1.5 md:gap-2">
              {g.items.map((item) => (
                <li key={item} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted md:px-3 md:text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
        <div data-aos="fade-right" className={`${card} p-4 md:border-0 md:bg-transparent md:p-0`}>
          <h3 className="mb-3 font-display text-base font-semibold md:mb-4 md:text-xl">Education</h3>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.degree} className="flex justify-between gap-4 text-sm text-muted md:text-base">
                <span>
                  <span className="block text-fg md:inline">{e.degree}</span>
                  <span className="hidden md:inline"> · </span>
                  <span className="text-xs md:text-base">{e.school}</span>
                </span>
                <span className="shrink-0 text-xs md:text-base">{e.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-aos="fade-left">
          <h3 className="mb-3 font-display text-base font-semibold md:mb-4 md:text-xl">Strengths</h3>
          <ul className="flex flex-wrap gap-1.5 md:gap-2" data-aos-stagger="zoom-in" data-aos-step="0.07">
            {profile.strengths.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/10 bg-bg/60 px-2.5 py-1 text-xs text-muted md:px-3 md:text-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
