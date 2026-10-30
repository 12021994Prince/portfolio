import { RoundedBox } from '@react-three/drei'

// Procedural shopping bag: a nod to e-commerce, built from primitives (no model download).
export default function ShoppingBag(props) {
  return (
    <group {...props}>
      <RoundedBox args={[1.8, 2.1, 0.8]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial color="#7c5cff" roughness={0.3} metalness={0.1} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>

      {/* Handles */}
      {[0.18, -0.18].map((z) => (
        <mesh key={z} position={[0, 1.05, z]}>
          <torusGeometry args={[0.45, 0.055, 16, 48, Math.PI]} />
          <meshStandardMaterial color="#e8eaf0" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Front tag */}
      <mesh position={[0, 0.05, 0.405]}>
        <circleGeometry args={[0.38, 48]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.05, 0.41]}>
        <ringGeometry args={[0.44, 0.48, 48]} />
        <meshStandardMaterial color="#e8eaf0" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  )
}
