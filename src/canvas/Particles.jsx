import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

// Seeded random numbers, so the star field looks the same on every load.
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Points spread evenly through a sphere.
function makePositions(count, radius) {
  const rand = mulberry32(42)
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(rand())
    const theta = rand() * Math.PI * 2
    const phi = Math.acos(2 * rand() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
}

// One draw call for the whole star field.
export default function Particles({ count = 900, radius = 14, animate = true }) {
  const ref = useRef()
  const positions = useMemo(() => makePositions(count, radius), [count, radius])

  useFrame((_, delta) => {
    if (animate && ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#a5b4fc" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}
