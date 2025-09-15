import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Property3DCard = ({ isHovered }: { isHovered: boolean }) => {
  const cardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cardRef.current) {
      const targetRotation = isHovered ? 0.1 : 0;
      cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, targetRotation, 0.1);
      cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, targetRotation * 0.5, 0.1);
      
      if (isHovered) {
        cardRef.current.position.z = THREE.MathUtils.lerp(cardRef.current.position.z, 0.2, 0.1);
      } else {
        cardRef.current.position.z = THREE.MathUtils.lerp(cardRef.current.position.z, 0, 0.1);
      }
    }
  });

  return (
    <group ref={cardRef}>
      <mesh>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial 
          color={isHovered ? "#00A8FF" : "#1a1a1a"}
          transparent
          opacity={0.8}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Enhanced glow effect when hovered */}
      {isHovered && (
        <>
          <mesh>
            <boxGeometry args={[2.1, 1.6, 0.05]} />
            <meshStandardMaterial 
              color="#00A8FF"
              transparent
              opacity={0.3}
              emissive="#00A8FF"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Outer glow layer */}
          <mesh>
            <boxGeometry args={[2.3, 1.8, 0.02]} />
            <meshStandardMaterial 
              color="#8B5CF6"
              transparent
              opacity={0.15}
              emissive="#8B5CF6"
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Animated light ring */}
          <mesh rotation={[0, 0, Math.sin(Date.now() * 0.001) * 0.1]}>
            <ringGeometry args={[1.1, 1.3, 32]} />
            <meshStandardMaterial 
              color="#00A8FF"
              transparent
              opacity={0.4}
              emissive="#00A8FF"
              emissiveIntensity={0.6}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export const Property3DContainer = ({ children, className }: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={isHovered ? 0.8 : 0.4} color="#00A8FF" />
          <pointLight position={[-5, -5, 5]} intensity={isHovered ? 0.6 : 0.2} color="#8B5CF6" />
          <spotLight position={[0, 0, 10]} intensity={isHovered ? 1.2 : 0} color="#00A8FF" angle={0.3} />
          <Property3DCard isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Original content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};