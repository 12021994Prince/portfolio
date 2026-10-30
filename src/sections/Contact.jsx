import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { profile } from '../data/profile.js'

const YEAR = new Date().getFullYear()

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build your next store." />
      <p className="max-w-xl text-lg text-muted" data-aos="fade-up">
        Have a Shopify, BigCommerce, Webflow or WordPress (ACF, Elementor, Divi Builder) project in mind? Send me an email and I&apos;ll get back to you.
      </p>
      <div className="mt-10 flex flex-wrap gap-4" data-aos="zoom-in" data-aos-delay="0.15">
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
      <footer data-aos="fade-up" className="mt-24 flex flex-col justify-between gap-2 border-t border-white/5 pt-8 text-sm text-muted sm:flex-row">
        <span>
          © {YEAR} {profile.name}
        </span>
        <span>{profile.location}</span>
      </footer>
    </Section>
  )
}
