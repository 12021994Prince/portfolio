import { Float, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// Small e-commerce themed objects orbiting the bag: product boxes, coins and gems.
const ITEMS = [
  { type: 'box', pos: [2.3, 0.9, 0.4], color: '#22d3ee' },
  { type: 'coin', pos: [-2.1, 1.3, -0.4] },
  { type: 'gem', pos: [1.6, -1.6, 0.8] },
  { type: 'box', pos: [-2.4, -0.9, 0.6], color: '#f472b6' },
  { type: 'coin', pos: [0.3, 2.2, -1] },
  { type: 'gem', pos: [-1.2, -2, -0.6] },
  { type: 'coin', pos: [2.6, -0.4, -1.2] },
]

function Item({ type, color }) {
  if (type === 'box')
    return (
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.05}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} />
      </RoundedBox>
    )
  if (type === 'coin')
    return (
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.07, 40]} />
        <meshStandardMaterial color="#f5c542" emissive="#7a5200" emissiveIntensity={0.35} metalness={0.6} roughness={0.35} />
      </mesh>
    )
  return (
    <mesh>
      <icosahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#a78bfa" metalness={0.6} roughness={0.1} flatShading />
    </mesh>
  )
}

export default function Orbiters({ animate = true }) {
  const group = useRef()
  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={group}>
      {ITEMS.map((item, i) => (
        <Float
          key={i}
          position={item.pos}
          speed={animate ? 1.5 + (i % 3) * 0.5 : 0}
          rotationIntensity={2}
          floatIntensity={1.2}
        >
          <Item {...item} />
        </Float>
      ))}
    </group>
  )
}
