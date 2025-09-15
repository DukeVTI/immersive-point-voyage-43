import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

const ParticleSystem = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const particlesRef = useRef<Particle[]>([]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useRef(new THREE.Object3D());
  const [particleCount] = useState(20);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Add new particles near mouse
    if (particlesRef.current.length < particleCount) {
      const particle: Particle = {
        position: new THREE.Vector3(
          mousePosition.x + (Math.random() - 0.5) * 0.5,
          mousePosition.y + (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.01
        ),
        life: 0,
        maxLife: 2 + Math.random() * 3
      };
      particlesRef.current.push(particle);
    }

    // Update particles
    particlesRef.current = particlesRef.current.filter((particle, index) => {
      particle.life += delta;
      particle.position.add(particle.velocity);
      particle.velocity.multiplyScalar(0.99); // friction

      if (particle.life >= particle.maxLife) {
        return false;
      }

      // Update instance matrix
      const scale = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.3;
      tempObject.current.position.copy(particle.position);
      tempObject.current.scale.setScalar(scale);
      tempObject.current.updateMatrix();
      meshRef.current!.setMatrixAt(index, tempObject.current.matrix);

      return true;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.count = particlesRef.current.length;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial 
        color="#00A8FF"
        transparent
        opacity={0.6}
        emissive="#00A8FF"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
};

export const MouseParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert screen coordinates to 3D space
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: x * 5, y: y * 3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#00A8FF" />
        <ParticleSystem mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};