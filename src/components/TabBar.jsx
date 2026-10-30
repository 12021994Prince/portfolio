import { tabs } from '../data/navigation.js'
import { useAppStore } from '../store/useAppStore.js'
import Icon from './Icon.jsx'

// App-style floating bottom navigation for phones. Highlights the section you're in.
export default function TabBar() {
  // floor: switch tabs only once the next section reaches the middle of the screen.
  const active = useAppStore((s) => Math.floor(s.stage))

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-3 z-50 rounded-2xl border border-white/10 bg-surface/80 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden"
      style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <ul className="grid grid-cols-5">
        {tabs.map((tab, i) => {
          const isActive = i === active
          return (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition active:scale-90 ${
                  isActive ? 'text-fg' : 'text-muted'
                }`}
              >
                <span
                  className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-accent/25 text-accent' : ''
                  }`}
                >
                  <Icon name={tab.icon} className="h-[18px] w-[18px]" />
                </span>
                {tab.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
