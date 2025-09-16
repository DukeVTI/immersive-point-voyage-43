import { useEffect, useRef } from 'react';
import { HeroBackground3D } from '@/components/3d/HeroBackground3D';
import { MouseParticles } from '@/components/3d/MouseParticles';
import { StarryBackground } from '@/components/3d/StarryBackground';
import { AnimatedText } from '@/components/3d/AnimatedText';
import heroBackground from '@/assets/hero-bg.jpg';
import wLogo from '@/assets/w-logo.png';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-cinematic relative overflow-hidden bg-matte-black">
      {/* Starry background layer - lowest z-index */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>
      
      {/* Mouse particle system */}
      <div className="relative z-10">
        <MouseParticles />
      </div>
      
      {/* 3D Background Elements */}
      <div className="relative z-20">
        <HeroBackground3D />
      </div>
      
      {/* Premium glass morphism background with floating elements */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Premium Brand Logo - positioned aesthetically */}
        <div className="absolute top-6 sm:top-8 left-6 sm:left-8 group">
          <div className="relative">
            {/* Logo container with solid black premium effect */}
            <div className="relative bg-matte-black border border-silver/30 rounded-2xl p-4 sm:p-6 shadow-2xl transition-all duration-700 hover:border-silver/50 hover:shadow-silver/30">
              <img 
                src={wLogo} 
                alt="WXYPOINT Logo"
                className="w-8 sm:w-12 h-8 sm:h-12 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-silver/15 via-transparent to-silver/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            {/* Enhanced ambient glow */}
            <div className="absolute inset-0 bg-silver/30 blur-xl rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>
        </div>
        
        {/* Dynamic light beams */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-silver/30 via-transparent to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-silver/20 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-silver rounded-full shadow-[0_0_20px_10px] shadow-silver/30 animate-ping" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-silver rounded-full shadow-[0_0_15px_8px] shadow-silver/40 animate-ping" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content with glass morphism container */}
      <div className="relative z-40 container mx-auto px-4 sm:px-6 text-center">
        <div className="fade-in-up animate max-w-5xl mx-auto">
          {/* Premium glass container */}
          <div className="relative bg-matte-black/40 backdrop-blur-xl border border-ghost-white/10 rounded-xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 shadow-2xl">
            {/* Floating accent elements */}
            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-silver rounded-full shadow-[0_0_20px_5px] shadow-silver/50" />
            <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-2 sm:w-3 h-2 sm:h-3 bg-silver rounded-full shadow-[0_0_15px_3px] shadow-silver/50" />
            
            {/* Animated Brand Name */}
            <AnimatedText />
            
            {/* Enhanced tagline */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-16">
              <p className="font-minimal text-base sm:text-xl md:text-2xl text-ghost-white/90 tracking-wide leading-relaxed px-2">
                The Next Evolution of Immersive Travel
              </p>
              <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-silver to-transparent" />
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-silver rounded-full shadow-[0_0_10px_2px] shadow-silver/50" />
                <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-silver to-transparent" />
              </div>
              <p className="font-minimal text-xs sm:text-sm text-ghost-white/60 tracking-widest uppercase px-4">
                Premium • Immersive • Extraordinary
              </p>
            </div>
            
            {/* Premium CTA button */}
            <div className="flex justify-center">
              <button 
                className="group relative px-8 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-ghost-white/5 to-ghost-white/10 border border-ghost-white/20 text-ghost-white font-minimal text-xs sm:text-sm tracking-widest uppercase transition-all duration-700 hover:from-silver/10 hover:to-silver/10 hover:border-silver/50 hover:shadow-2xl hover:shadow-silver/30 backdrop-blur-md rounded-lg sm:rounded-xl"
                onClick={() => {
                  const joinVisionSection = document.getElementById('join-vision');
                  if (joinVisionSection) {
                    joinVisionSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      const firstInput = joinVisionSection.querySelector('input');
                      if (firstInput) {
                        firstInput.focus();
                      }
                    }, 800);
                  }
                }}
              >
                <span className="relative z-10">Explore Calemorra</span>
                <div className="absolute inset-0 bg-gradient-to-r from-silver/20 to-silver/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg sm:rounded-xl" />
                
                {/* Premium button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-silver/30 to-silver/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10 rounded-lg sm:rounded-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 z-50">
        <div className="relative">
          <div className="w-6 h-10 border-2 border-ghost-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-silver rounded-full mt-2 animate-bounce" />
          </div>
          <div className="absolute inset-0 bg-silver/20 blur-md rounded-full" />
        </div>
        <p className="text-ghost-white/40 text-xs tracking-widest uppercase font-minimal">Scroll</p>
      </div>
    </section>
  );
};