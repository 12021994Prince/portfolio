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
      className="group block h-full overflow-hidden rounded-2xl border border-white/5 bg-surface/90 transition hover:border-accent/50 active:scale-[0.98]"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-white/5">
        <Cover project={project} />
      </div>
      <div className="flex items-end justify-between gap-3 p-3.5 md:gap-4 md:p-5">
        <div>
          <span className="text-[11px] text-muted md:text-xs">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-0.5 font-display text-[15px] font-semibold md:mt-1 md:text-lg">{project.name}</h3>
        </div>
        <span className="shrink-0 text-xs text-muted transition group-hover:text-accent-2 md:text-sm">
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
      <div className="-mt-2 mb-3 flex items-center justify-between text-xs text-muted md:hidden">
        <span>{projects.length} live stores</span>
        <span>Swipe →</span>
      </div>
      <ul
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        data-aos-stagger="flip-up"
        data-aos-step="0.15"
      >
        {projects.map((p, i) => (
          <li key={p.name} className="w-[82%] shrink-0 snap-start md:w-auto">
            <Card project={p} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
