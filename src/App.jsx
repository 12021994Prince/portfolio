import Experience3D from './canvas/Experience.jsx'
import Marquee from './components/Marquee.jsx'
import Navbar from './components/Navbar.jsx'
import { useAos } from './hooks/useAos.js'
import { useReducedMotion } from './hooks/useReducedMotion.js'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Experience from './sections/Experience.jsx'
import Hero from './sections/Hero.jsx'
import Projects from './sections/Projects.jsx'

export default function App() {
  const reduced = useReducedMotion()
  useSmoothScroll(!reduced)
  useAos()

  return (
    <>
      <Experience3D />
      <Navbar />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
