import CountUp from '../components/CountUp.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { education, profile } from '../data/profile.js'
import { skills } from '../data/skills.js'

const card = 'rounded-2xl border border-white/5 bg-surface/85'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="E-commerce, built properly." />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed text-muted" data-aos-stagger="fade-right" data-aos-step="0.15">
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <dl className="grid grid-cols-3 gap-4 self-start md:grid-cols-1" data-aos-stagger="fade-left" data-aos-step="0.15">
          {profile.stats.map((s) => (
            <div key={s.label} className={`${card} p-5`}>
              <dt className="text-xs text-muted md:text-sm">{s.label}</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-fg md:text-4xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-aos-stagger="zoom-in-up">
        {skills.map((g) => (
          <div key={g.group} className={`${card} p-6 transition hover:border-accent/40`}>
            <h3 className="mb-4 font-display font-semibold">{g.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className="rounded-full bg-white/5 px-3 py-1 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div data-aos="fade-right">
          <h3 className="mb-4 font-display text-xl font-semibold">Education</h3>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.degree} className="flex justify-between gap-4 text-muted">
                <span>
                  <span className="text-fg">{e.degree}</span> · {e.school}
                </span>
                <span className="shrink-0">{e.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-aos="fade-left">
          <h3 className="mb-4 font-display text-xl font-semibold">Strengths</h3>
          <ul className="flex flex-wrap gap-2" data-aos-stagger="zoom-in" data-aos-step="0.07">
            {profile.strengths.map((s) => (
              <li key={s} className="rounded-full border border-white/10 bg-bg/60 px-3 py-1 text-sm text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
