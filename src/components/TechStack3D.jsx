import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

// Exact SVGs provided for technical stack
const LOGOS = {
  react: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
  typescript: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg',
  tailwind: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
  nextjs: 'https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg',
  nodejs: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
  supabase: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg',
  postgresql: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg',
}

const COLORS = {
  react: '#00d8ff',
  typescript: '#3178c6',
  tailwind: '#38bdf8',
  nextjs: '#ffffff',
  nodejs: '#8cc84b',
  supabase: '#3ecf8e',
  postgresql: '#336791',
}

// Crisp Canvas-rendered fallback texture if vector icon fails network load
function createFallbackTexture(name, color) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#121620'
  ctx.beginPath()
  if (ctx.roundRect) {
    ctx.roundRect(32, 32, 448, 448, 64)
  } else {
    ctx.rect(32, 32, 448, 448)
  }
  ctx.fill()
  ctx.lineWidth = 12
  ctx.strokeStyle = color
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 72px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(name.toUpperCase(), 256, 256)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function TechIcon({ iconKey, url, color, position }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    let isMounted = true
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      if (!isMounted) return
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 512, 512)
      ctx.drawImage(img, 32, 32, 448, 448)
      
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true
      setTexture(tex)
    }
    img.onerror = () => {
      if (!isMounted) return
      setTexture(createFallbackTexture(iconKey, color))
    }

    return () => {
      isMounted = false
    }
  }, [url, iconKey, color])

  // Subtle mouse-facing tilt
  useEffect(() => {
    if (!mesh.current) return
    const onMove = (e) => {
      if (!hovered) return
      const x = (e.clientX / window.innerWidth - 0.5) * 0.55
      const y = (e.clientY / window.innerHeight - 0.5) * 0.35
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, x, 0.1)
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -y, 0.1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [hovered])

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2} floatingRange={[-0.08, 0.08]}>
      <group position={position}>
        <mesh
          ref={mesh}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.15 : 1}
        >
          <planeGeometry args={[1.15, 1.15]} />
          <meshStandardMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
            roughness={0.25}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={hovered ? 0.38 : 0.08}
          />
        </mesh>

        {/* Soft brand-colored glow under the icon */}
        <mesh position={[0, -0.68, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.55, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.35 : 0.16} />
        </mesh>
      </group>
    </Float>
  )
}

export default function TechStack3D({ activeTab = 'frontend' }) {
  const frontend = [
    { key: 'react', pos: [-2.2, 0.4, 0] },
    { key: 'typescript', pos: [-0.75, 0.4, 0] },
    { key: 'tailwind', pos: [0.75, 0.4, 0] },
    { key: 'nextjs', pos: [2.2, 0.4, 0] },
  ]

  const backend = [
    { key: 'nodejs', pos: [-1.6, 0.4, 0] },
    { key: 'supabase', pos: [0, 0.4, 0] },
    { key: 'postgresql', pos: [1.6, 0.4, 0] },
  ]

  const items = activeTab === 'frontend' ? frontend : backend

  return (
    <div
      className="w-full h-[480px] md:h-[520px] rounded-3xl overflow-hidden relative bg-[#0e1017] border border-white/10 shadow-2xl transition-all"
      style={{
        width: '100%',
        height: '480px',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        background: '#0e1017',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 7, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />

        <Environment preset="city" />

        {items.map((item) => (
          <TechIcon
            key={item.key}
            iconKey={item.key}
            url={LOGOS[item.key]}
            color={COLORS[item.key]}
            position={item.pos}
          />
        ))}

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.38}
          scale={12}
          blur={2.5}
          far={3.5}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.75}
        />
      </Canvas>
    </div>
  )
}
