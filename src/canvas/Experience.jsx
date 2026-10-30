import { PerformanceMonitor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import Scene from './Scene.jsx'

// The single shared WebGL canvas, fixed behind every page section.
// The wrapper div owns the positioning, because R3F sets inline styles on its own wrapper.
export default function Experience() {
  const [dpr, setDpr] = useState(1.5)
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(124,92,255,0.18),transparent_60%)]"
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <Suspense fallback={null}>
          <Scene animate={!reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
