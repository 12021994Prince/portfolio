export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10 md:mb-14">
      <p data-aos="fade-right" className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent-2">{eyebrow}</p>
      <h2 data-aos="blur-up" data-aos-delay="0.1" className="font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
    </div>
  )
}
