import { useEffect, useRef } from 'react';

export const BrandStory = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = storyRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-matte-black/95 to-matte-black relative overflow-hidden" ref={storyRef}>
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {/* Philosophy Header */}
          <div className="fade-in-up text-center">
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-6xl text-ghost-white mb-6 sm:mb-8 tracking-tight">
              Redefining Hospitality
            </h2>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
          </div>

          {/* Story Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="fade-in-up space-y-4 sm:space-y-6 order-2 lg:order-1">
              <p className="font-minimal text-base sm:text-lg text-ghost-white/80 leading-relaxed">
                From The Superhost Pros to WXYPOINT, we've evolved beyond traditional hospitality. 
                We create immersive environments where every detail is curated for the modern traveler.
              </p>
              <p className="font-minimal text-base sm:text-lg text-ghost-white/80 leading-relaxed">
                Our properties aren't just places to stay—they're carefully crafted experiences 
                that blur the line between luxury accommodation and artistic expression.
              </p>
            </div>
            
            <div className="fade-in-up order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-cyber-purple/10 blur-xl" />
                <div className="relative bg-matte-black/40 backdrop-blur-sm p-6 sm:p-8 border border-accent/20 rounded-lg">
                  <blockquote className="font-editorial text-xl sm:text-2xl text-ghost-white italic leading-relaxed">
                    "Every space tells a story. Every stay becomes a memory."
                  </blockquote>
                  <cite className="font-minimal text-sm text-ghost-white/60 mt-4 block">
                    — WXYPOINT Philosophy
                  </cite>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="fade-in-up text-center max-w-3xl mx-auto">
            <h3 className="font-editorial text-2xl sm:text-3xl text-ghost-white mb-4 sm:mb-6">
              The Future of Travel
            </h3>
            <p className="font-minimal text-base sm:text-lg text-ghost-white/70 leading-relaxed">
              We're building a network of extraordinary spaces that challenge conventions, 
              inspire creativity, and create connections between travelers and destinations 
              in ways never before imagined.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};