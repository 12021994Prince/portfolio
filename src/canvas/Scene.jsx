import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils } from 'three'
import { pointer } from '../hooks/pointer.js'
import { useAppStore } from '../store/useAppStore.js'
import Orbiters from './Orbiters.jsx'
import Particles from './Particles.jsx'
import ShoppingBag from './ShoppingBag.jsx'

// Pose of the hero object for each section (index = stage from the store).
// x is a fraction of the visible half-width, so it adapts to any screen.
// Desktop: it rests in the margins or empty space so it never sits behind text.
const DESKTOP = [
  { x: 0.5, y: 0, z: 0, spin: 0, scale: 1 }, // hero: right half
  { x: 1.0, y: 0.15, z: -1, spin: 0.8, scale: 0.5 }, // about: peeks from right edge
  { x: -1.0, y: 0.15, z: -1, spin: 1.6, scale: 0.5 }, // projects: peeks from left edge
  { x: 0.68, y: 0, z: -1, spin: 2.4, scale: 0.72 }, // experience: empty right side
  { x: 0.55, y: -0.1, z: 0, spin: 2 * Math.PI, scale: 0.9 }, // contact: right half
]
// Narrower desktops and landscape tablets (about 1000 to 1350px wide) have less room
// beside the text, so the object sits further right and a little smaller.
const NARROW = [
  { x: 0.64, y: 0, z: 0, spin: 0, scale: 0.78 },
  { x: 1.0, y: 0.15, z: -1, spin: 0.8, scale: 0.45 },
  { x: -1.0, y: 0.15, z: -1, spin: 1.6, scale: 0.45 },
  { x: 1.0, y: 0.1, z: -1, spin: 2.4, scale: 0.5 },
  { x: 0.66, y: -0.1, z: 0, spin: 2 * Math.PI, scale: 0.72 },
]
// Phones have no spare space beside the text, so it only appears in the hero.
const MOBILE = [
  { x: 0, y: 1.3, z: 0, spin: 0, scale: 0.62 },
  { x: 0, y: 2.5, z: -2, spin: 0.8, scale: 0 },
  { x: 0, y: 2.5, z: -2, spin: 1.6, scale: 0 },
  { x: 0, y: 2.5, z: -2, spin: 2.4, scale: 0 },
  { x: 0, y: 2.5, z: -2, spin: 2 * Math.PI, scale: 0 },
]

function sample(poses, stage) {
  const i = Math.min(Math.floor(stage), poses.length - 2)
  const t = stage - i
  const a = poses[i]
  const b = poses[i + 1]
  const lerp = (k) => MathUtils.lerp(a[k], b[k], t)
  return { x: lerp('x'), y: lerp('y'), z: lerp('z'), spin: lerp('spin'), scale: lerp('scale') }
}

export default function Scene({ animate = true }) {
  const hero = useRef()

  useFrame(({ viewport, camera }, delta) => {
    // Portrait screens (phones, tablets) put the object above the text.
    const poses = viewport.aspect < 0.9 ? MOBILE : viewport.aspect < 1.55 ? NARROW : DESKTOP
    const k = sample(poses, useAppStore.getState().stage)
    const tx = k.x * (viewport.width / 2)

    const g = hero.current
    const lambda = animate ? 4 : 1000
    g.position.x = MathUtils.damp(g.position.x, tx, lambda, delta)
    g.position.y = MathUtils.damp(g.position.y, k.y, lambda, delta)
    g.position.z = MathUtils.damp(g.position.z, k.z, lambda, delta)
    g.rotation.y = MathUtils.damp(g.rotation.y, k.spin - 0.35 + pointer.x * 0.35, lambda, delta)
    g.rotation.x = MathUtils.damp(g.rotation.x, 0.12 - pointer.y * 0.2, lambda, delta)
    g.scale.setScalar(MathUtils.damp(g.scale.x, k.scale, lambda, delta))
    g.visible = g.scale.x > 0.02 // skip drawing when shrunk away

    // Gentle camera parallax.
    if (animate) {
      camera.position.x = MathUtils.damp(camera.position.x, pointer.x * 0.4, 2, delta)
      camera.position.y = MathUtils.damp(camera.position.y, pointer.y * 0.3, 2, delta)
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#22d3ee" />
      <pointLight position={[5, 3, -2]} intensity={25} color="#7c5cff" />

      {/* Local studio reflections: no HDR download needed. */}
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 5, -6]} scale={[10, 4, 1]} />
        <Lightformer form="circle" intensity={3} color="#22d3ee" position={[-5, 1, 2]} scale={3} />
        <Lightformer form="ring" intensity={2.5} color="#a78bfa" position={[5, -1, 3]} scale={3} />
      </Environment>

      <group ref={hero} position={[2, 0, 0]}>
        <Float speed={animate ? 1.6 : 0} rotationIntensity={0.4} floatIntensity={0.8}>
          <ShoppingBag />
        </Float>
        <Orbiters animate={animate} />
        {animate && <Sparkles count={40} scale={6} size={2.5} speed={0.4} color="#c4b5fd" />}
      </group>

      <Particles animate={animate} />
    </>
  )
}
