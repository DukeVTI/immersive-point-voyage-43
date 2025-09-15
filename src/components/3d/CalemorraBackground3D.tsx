import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingShape = ({ 
  position, 
  geometry, 
  color, 
  speed = 1 
}: {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'octahedron';
  color: string;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
      {geometry === 'torus' && <torusGeometry args={[0.5, 0.2, 8, 16]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[0.5]} />}
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05}
        color="#00A8FF"
        transparent
        opacity={0.6}
      />
    </points>
  );
};

export const CalemorraBackground3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00A8FF" />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#8A2BE2" />
        <pointLight position={[0, 10, -10]} intensity={0.4} color="#FF006E" />
        
        {/* Cyberpunk floating shapes */}
        <FloatingShape
          position={[-3, 2, -2]}
          geometry="octahedron"
          color="#00A8FF"
          speed={1.2}
        />
        <FloatingShape
          position={[4, -1, -3]}
          geometry="torus"
          color="#8A2BE2"
          speed={0.8}
        />
        <FloatingShape
          position={[-2, -3, -1]}
          geometry="sphere"
          color="#FF006E"
          speed={1.5}
        />
        <FloatingShape
          position={[3, 3, -4]}
          geometry="octahedron"
          color="#00A8FF"
          speed={0.9}
        />
        <FloatingShape
          position={[0, -2, -2]}
          geometry="torus"
          color="#8A2BE2"
          speed={1.1}
        />
        
        {/* Particle field for ambient effect */}
        <ParticleField />
      </Canvas>
    </div>
  );
};