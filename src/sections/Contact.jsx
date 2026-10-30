import Icon from '../components/Icon.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { profile } from '../data/profile.js'

const YEAR = new Date().getFullYear()

// Phones: settings-style list rows. Desktop: pill buttons.
function Row({ href, icon, title, subtitle, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="flex items-center gap-3 px-4 py-3.5 transition active:bg-white/5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block truncate text-xs text-muted">{subtitle}</span>
      </span>
      <Icon name="chevron" className="h-4 w-4 text-muted" />
    </a>
  )
}

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build your next store." />
      <p className="max-w-xl text-[15px] text-muted md:text-lg" data-aos="fade-up">
        Have a Shopify, BigCommerce, Webflow or WordPress (ACF, Elementor, Divi Builder) project in mind? Send me an email and I&apos;ll get back to you.
      </p>

      {/* Phones */}
      <div
        className="mt-5 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-surface/85 md:hidden"
        data-aos="zoom-in"
        data-aos-delay="0.15"
      >
        <Row href={`mailto:${profile.email}`} icon="mail" title="Email" subtitle={profile.email} />
        {profile.linkedin && (
          <Row href={profile.linkedin} icon="linkedin" title="LinkedIn" subtitle="Mahesh Hadiyal" external />
        )}
      </div>

      {/* Desktop */}
      <div className="mt-10 hidden flex-wrap gap-4 md:flex" data-aos="zoom-in" data-aos-delay="0.15">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {profile.email}
        </a>
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
          >
            LinkedIn ↗
          </a>
        )}
      </div>

      <footer
        data-aos="fade-up"
        className="mt-10 flex flex-col justify-between gap-1 border-t border-white/5 pt-5 text-xs text-muted sm:flex-row md:mt-24 md:pt-8 md:text-sm"
      >
        <span>
          © {YEAR} {profile.name}
        </span>
        <span>{profile.location}</span>
      </footer>
    </Section>
  )
}
