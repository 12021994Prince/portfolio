// Shared wrapper: consistent width, gutters and anchor offset under the fixed navbar.
// Mobile spacing is compact (app-like); desktop keeps generous spacing.
export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative z-10 scroll-mt-16 px-4 py-12 md:scroll-mt-20 md:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
