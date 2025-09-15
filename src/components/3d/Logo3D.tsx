import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Animated3DLogo = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 2, 0.3]} />
      <meshStandardMaterial 
        color="#f8f8f8"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export const Logo3D = () => {
  return (
    <div className="w-24 h-24 mx-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00A8FF" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#8A2BE2" />
        <Animated3DLogo />
      </Canvas>
    </div>
  );
};