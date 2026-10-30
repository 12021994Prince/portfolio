import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'

// Subtle 3D tilt that follows the cursor. Mouse only, skipped on touch and reduced motion.
export default function TiltCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef()
  const api = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      gsap.set(ref.current, { transformPerspective: 900 })
      api.current = {
        rx: gsap.quickTo(ref.current, 'rotationX', { duration: 0.5, ease: 'power3' }),
        ry: gsap.quickTo(ref.current, 'rotationY', { duration: 0.5, ease: 'power3' }),
      }
      return () => {
        api.current = null
      }
    })
  })

  const onMove = (e) => {
    if (!api.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    api.current.ry(x * 10)
    api.current.rx(-y * 10)
  }
  const onLeave = () => {
    api.current?.rx(0)
    api.current?.ry(0)
  }

  return (
    <Tag ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  )
}
