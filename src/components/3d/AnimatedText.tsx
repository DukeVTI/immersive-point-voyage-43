import { useEffect, useState } from 'react';

export const AnimatedText = () => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const text = "WXYPOINT";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleLetters < text.length) {
        setVisibleLetters(prev => prev + 1);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [visibleLetters, text.length]);

  return (
    <div className="relative">
      <h1 className="font-editorial text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-4 sm:mb-8 tracking-tight relative overflow-hidden">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className={`
              inline-block relative transition-all duration-700 ease-out
              ${index < visibleLetters ? 
                'text-silver opacity-100 transform translate-y-0' : 
                'text-transparent opacity-0 transform translate-y-8'
              }
            `}
            style={{
              transitionDelay: `${index * 100}ms`,
              textShadow: '0 0 30px rgba(248, 248, 248, 0.5)',
            }}
          >
            {letter}
            
            {/* Individual letter glow effect */}
            <div 
              className={`
                absolute inset-0 bg-gradient-to-b from-silver/30 via-silver/10 to-transparent
                blur-sm transition-opacity duration-1000 -z-10
                ${index < visibleLetters ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            />
            
            {/* Premium shimmer effect */}
            <div 
              className={`
                absolute inset-0 bg-gradient-to-r from-transparent via-ghost-white/20 to-transparent
                transform -skew-x-12 transition-transform duration-1000 -z-10
                ${index < visibleLetters ? 'translate-x-full' : '-translate-x-full'}
              `}
              style={{ 
                transitionDelay: `${index * 200 + 500}ms`,
                animationName: index < visibleLetters ? 'shimmer' : 'none',
                animationDuration: '2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${index * 100}ms`
              }}
            />
          </span>
        ))}
        
        {/* Overall premium text shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-silver/20 via-silver/30 to-silver/20 blur-xl -z-20 animate-pulse" />
        
        {/* Premium floating effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-silver/10 via-transparent to-silver/10 blur-2xl -z-20 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
      </h1>
      
      {/* Elegant underline animation */}
      <div className="flex justify-center">
        <div 
          className={`
            h-0.5 bg-gradient-to-r from-transparent via-silver to-transparent
            transition-all duration-2000 ease-out
            ${visibleLetters >= text.length ? 'w-64 opacity-100' : 'w-0 opacity-0'}
          `}
          style={{ transitionDelay: '1s' }}
        />
      </div>
      
      {/* Custom CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};