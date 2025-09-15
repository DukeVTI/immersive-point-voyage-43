import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Animated3DText = ({ 
  text, 
  isVisible,
  color = "#ffffff"
}: { 
  text: string; 
  isVisible: boolean;
  color?: string;
}) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      const targetZ = isVisible ? 0 : -2;
      const targetOpacity = isVisible ? 1 : 0;
      
      textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, targetZ, 0.1);
      
      if (textRef.current.material instanceof THREE.Material) {
        textRef.current.material.opacity = THREE.MathUtils.lerp(
          textRef.current.material.opacity, 
          targetOpacity, 
          0.1
        );
      }

      // Subtle floating animation when visible
      if (isVisible) {
        textRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={1}
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0}
    >
      {text}
    </Text>
  );
};

export const Interactive3DText = ({ 
  text, 
  isVisible, 
  className = "w-full h-32",
  color = "#ffffff"
}: {
  text: string;
  isVisible: boolean;
  className?: string;
  color?: string;
}) => {
  return (
    <div className={`${className} pointer-events-none`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color={color} />
        <Animated3DText text={text} isVisible={isVisible} color={color} />
      </Canvas>
    </div>
  );
};