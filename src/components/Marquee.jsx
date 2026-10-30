import { skills } from '../data/skills.js'

// Infinite skills ticker. The list is rendered twice so the loop is seamless.
export default function Marquee() {
  const items = skills.flatMap((g) => g.items)
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-6 font-display text-sm whitespace-nowrap text-muted md:gap-10 md:text-2xl"
        >
          {item}
          <span className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      data-aos="fade"
      data-aos-duration="1.4"
      className="relative z-10 overflow-hidden border-y border-white/5 bg-bg/70 py-3 md:py-6"
    >
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
