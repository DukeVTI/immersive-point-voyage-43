import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { StarryBackground } from './3d/StarryBackground';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Premium floating particles with elegant glow
const PremiumParticle = ({ position, delay }: { position: [number, number, number]; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.001;
      meshRef.current.position.x += Math.cos(state.clock.elapsedTime * 0.2 + delay) * 0.0005;
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.015, 12, 12]} />
      <meshStandardMaterial 
        color="#C0A876"
        transparent
        opacity={0.8}
        emissive="#C0A876"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Premium 3D scene with elegant lighting
const PremiumLoadingScene = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 80; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        ] as [number, number, number],
        delay: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 8]} intensity={0.8} color="#C0A876" />
      <pointLight position={[-6, 6, -6]} intensity={0.4} color="#E8DCC6" />
      <pointLight position={[6, -6, 6]} intensity={0.3} color="#F5F5DC" />
      
      {particles.map((particle, index) => (
        <PremiumParticle
          key={index}
          position={particle.position}
          delay={particle.delay}
        />
      ))}
    </>
  );
};

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a short delay for cinematic effect
    const textTimer = setTimeout(() => setShowText(true), 800);
    
    const duration = 3500; // 3.5 seconds
    const interval = 16; // 60fps for smooth animation
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + increment, 100);
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(textTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-matte-black flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>

      {/* 3D Premium Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <PremiumLoadingScene />
        </Canvas>
      </div>

      {/* Premium ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-silver/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-silver/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-silver/2 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-30 flex flex-col items-center space-y-16">
        {/* Premium Logo Display */}
        <div className={`transition-all duration-1200 ease-out ${showText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          <div className="relative flex flex-col items-center">
            {/* Logo with premium effects */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-silver/20 via-silver/30 to-silver/20 rounded-2xl blur-xl animate-pulse" />
              <div className="relative bg-matte-black/60 backdrop-blur-xl border border-silver/20 rounded-2xl p-8 shadow-2xl">
                <img 
                  src="/lovable-uploads/0d0e2528-63b1-42bf-8dd2-228b28b16862.png" 
                  alt="WXYPOINT Logo"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
            
            {/* Brand name with premium styling */}
            <h1 className="font-editorial text-5xl md:text-6xl text-silver tracking-tight relative mb-4">
              WXYPOINT
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-silver/20 to-transparent opacity-0 animate-pulse" style={{ animationDelay: '2s' }} />
            </h1>
            <p className="font-minimal text-sm text-ghost-white/70 tracking-[0.3em] uppercase text-center">
              Premium Travel Experiences
            </p>
          </div>
        </div>

        {/* Luxurious loading interface */}
        <div className="w-[450px] flex flex-col items-center space-y-10">
          {/* Premium progress container */}
          <div className="relative w-full">
            {/* Elegant background track */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-silver/30 to-transparent rounded-full" />
            
            {/* Premium progress bar */}
            <div className="relative w-full h-[2px] rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-silver via-ghost-white to-silver transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
              
              {/* Luxurious glow effect */}
              <div 
                className="absolute top-0 left-0 h-full bg-silver blur-sm opacity-60 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
              
              {/* Shimmer effect */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-ghost-white/80 to-transparent blur-[1px] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Elegant progress indicator */}
            <div 
              className="absolute top-0 w-3 h-3 bg-silver rounded-full transform -translate-y-1/2 transition-all duration-500 shadow-lg shadow-silver/40 border border-ghost-white/30"
              style={{ left: `${progress}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            >
              <div className="absolute inset-0 bg-silver rounded-full animate-pulse opacity-50" />
            </div>
          </div>
          
          {/* Premium progress display */}
          <div className="flex flex-col items-center space-y-3">
            <div className="font-minimal text-4xl text-silver tracking-wider">
              {Math.round(progress)}<span className="text-xl text-ghost-white/70">%</span>
            </div>
            <div className="font-minimal text-xs text-ghost-white/50 tracking-[0.2em] uppercase">
              {progress < 25 ? 'Initializing Experience' : 
               progress < 50 ? 'Loading Premium Assets' : 
               progress < 75 ? 'Preparing Immersion' : 
               progress < 95 ? 'Finalizing Details' : 'Welcome'}
            </div>
          </div>
        </div>
      </div>

      {/* Premium cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-40">
        <div className="absolute inset-0 bg-gradient-to-b from-silver/5 via-transparent to-silver/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-silver/3 to-transparent animate-pulse" style={{ 
          animationDuration: '4s'
        }} />
      </div>
    </div>
  );
};