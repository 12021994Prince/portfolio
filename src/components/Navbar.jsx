import { navLinks } from '../data/navigation.js'
import { profile } from '../data/profile.js'

// Top bar. Desktop: full links. Mobile: compact app header (the bottom TabBar handles navigation).
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <a href="#hero" className="font-display text-base font-bold tracking-tight md:text-lg">
          {profile.firstName}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden gap-8 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="transition-colors hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent ring-1 ring-accent/30 transition active:scale-95 md:hidden"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  )
}
