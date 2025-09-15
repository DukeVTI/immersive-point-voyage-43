import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating geometric shapes for ambient 3D effect
const FloatingGeometry = ({ position, rotation, scale, color, geometry = 'sphere' }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  geometry?: 'sphere' | 'box';
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {geometry === 'sphere' ? (
        <sphereGeometry args={[1, 16, 16]} />
      ) : (
        <boxGeometry args={[1, 1, 1]} />
      )}
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
};

export const HeroBackground3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00A8FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8A2BE2" />
        
        {/* Floating geometric shapes */}
        <FloatingGeometry
          position={[-4, 2, -2]}
          rotation={[0, 0, 0]}
          scale={0.8}
          color="#00A8FF"
          geometry="sphere"
        />
        <FloatingGeometry
          position={[4, -1, -1]}
          rotation={[0.5, 0, 0]}
          scale={0.6}
          color="#8A2BE2"
          geometry="box"
        />
        <FloatingGeometry
          position={[-2, -3, -3]}
          rotation={[0.2, 0.3, 0]}
          scale={0.5}
          color="#00A8FF"
          geometry="sphere"
        />
        <FloatingGeometry
          position={[3, 3, -4]}
          rotation={[0.8, 0.2, 0]}
          scale={0.4}
          color="#8A2BE2"
          geometry="box"
        />
        <FloatingGeometry
          position={[0, -2, -2]}
          rotation={[0.1, 0.7, 0]}
          scale={0.7}
          color="#00A8FF"
          geometry="sphere"
        />
      </Canvas>
    </div>
  );
};