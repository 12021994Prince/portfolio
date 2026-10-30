import { skills } from '../data/skills.js'

// Infinite skills ticker. The list is rendered twice so the loop is seamless.
export default function Marquee() {
  const items = skills.flatMap((g) => g.items)
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap font-display text-xl text-muted md:text-2xl">
          {item}
          <span className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div data-aos="fade" data-aos-duration="1.4" className="relative z-10 overflow-hidden border-y border-white/5 bg-bg/70 py-6">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
