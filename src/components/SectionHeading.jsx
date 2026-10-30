export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-5 md:mb-14">
      <p
        data-aos="fade-right"
        className="mb-1 text-[11px] font-medium tracking-[0.2em] text-accent-2 uppercase md:mb-2 md:text-sm"
      >
        {eyebrow}
      </p>
      <h2
        data-aos="blur-up"
        data-aos-delay="0.1"
        className="font-display text-2xl font-bold tracking-tight md:text-5xl"
      >
        {title}
      </h2>
    </div>
  )
}
