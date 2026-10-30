import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { projects } from '../data/projects.js'

function Cover({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} homepage`}
        loading="lazy"
        decoding="async"
        width="960"
        height="600"
        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
      />
    )
  }
  // Designed placeholder when no screenshot is available.
  const initials = project.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.45),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(34,211,238,0.3),transparent_55%)]">
      <span className="font-display text-5xl font-bold text-white/80">{initials}</span>
    </div>
  )
}

function Card({ project, index }) {
  const linked = Boolean(project.url)
  const host = linked ? new URL(project.url).hostname.replace(/^www\./, '') : ''

  return (
    <TiltCard
      as={linked ? 'a' : 'div'}
      {...(linked ? { href: project.url, target: '_blank', rel: 'noreferrer' } : {})}
      className="group block h-full overflow-hidden rounded-2xl border border-white/5 bg-surface/90 transition-colors hover:border-accent/50"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-white/5">
        <Cover project={project} />
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <span className="text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-1 font-display text-lg font-semibold">{project.name}</h3>
        </div>
        <span className="shrink-0 text-sm text-muted transition group-hover:text-accent-2">
          {linked ? `${host} ↗` : 'Shopify store'}
        </span>
      </div>
    </TiltCard>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Selected work" title="Live stores I've built." />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-aos-stagger="flip-up" data-aos-step="0.15">
        {projects.map((p, i) => (
          <li key={p.name}>
            <Card project={p} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
