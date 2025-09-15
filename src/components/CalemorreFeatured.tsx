import { useEffect, useRef, useState } from 'react';
import { CalemorraBackground3D } from '@/components/3d/CalemorraBackground3D';
import { supabase } from '@/integrations/supabase/client';

export const CalemorreFeatured = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Load video from Supabase storage
  useEffect(() => {
    const getVideoUrl = async () => {
      try {
        // Try to get public URL first
        const { data } = supabase.storage
          .from('videos')
          .getPublicUrl('calemorra');
        
        if (data?.publicUrl) {
          console.log('Video URL:', data.publicUrl);
          setVideoUrl(data.publicUrl);
        } else {
          console.log('No public URL available for video');
        }
      } catch (error) {
        console.error('Error loading video:', error);
      }
    };

    getVideoUrl();
  }, []);

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

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-cinematic bg-matte-black relative overflow-hidden" ref={sectionRef}>
      {/* 3D Background */}
      <CalemorraBackground3D />
      
      {/* Premium Property Walkthrough Video */}
      <div className="absolute inset-0 overflow-hidden">
        {videoUrl && (
          <video 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            autoPlay 
            muted 
            loop 
            playsInline
            onError={(e) => {
              // Fallback to animated background if video fails
              console.log('Video failed to load, showing fallback');
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback videos */}
            <source src="https://coverr.co/videos/download/854" type="video/mp4" />
            <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Enhanced Animated Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" style={{ display: 'none' }}>
          {/* Premium Interior Elements */}
          <div className="absolute inset-0 opacity-80">
            {/* Luxury Marble Floor */}
            <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-slate-200/40 via-slate-300/20 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:80px_80px] animate-pulse"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[length:60px_60px]"></div>
            </div>
            
            {/* Sophisticated Lighting */}
            <div className="absolute top-0 left-1/3 w-2/3 h-3/5 bg-gradient-to-b from-amber-400/50 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute top-1/5 right-1/5 w-2/5 h-2/5 bg-gradient-to-bl from-blue-400/40 to-transparent blur-2xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/6 w-1/3 h-1/3 bg-gradient-to-tr from-purple-400/30 to-transparent blur-xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '4s' }}></div>
            
            {/* Architectural Elements */}
            <div className="absolute right-0 top-1/5 w-2/5 h-3/5 border-l-4 border-t-4 border-b-4 border-slate-100/40 bg-gradient-to-l from-slate-50/20 to-transparent">
              {/* Sunlight streaming through windows */}
              <div className="absolute left-0 top-1/5 w-full h-3 bg-gradient-to-r from-amber-300/80 to-transparent blur-sm animate-pulse" style={{ animationDuration: '5s' }}></div>
              <div className="absolute left-0 top-2/5 w-full h-3 bg-gradient-to-r from-amber-300/70 to-transparent blur-sm animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }}></div>
              <div className="absolute left-0 top-3/5 w-full h-3 bg-gradient-to-r from-amber-300/80 to-transparent blur-sm animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
              <div className="absolute left-0 top-4/5 w-full h-3 bg-gradient-to-r from-amber-300/60 to-transparent blur-sm animate-pulse" style={{ animationDuration: '8s', animationDelay: '4.5s' }}></div>
            </div>
            
            {/* High-end Furniture */}
            <div className="absolute left-1/5 bottom-2/5 w-24 h-32 bg-gradient-to-t from-slate-700/60 to-slate-600/40 rounded-t-xl shadow-2xl">
              <div className="absolute top-4 left-4 right-4 h-3 bg-gradient-to-r from-amber-400/60 to-amber-300/40 rounded animate-pulse" style={{ animationDuration: '5s' }}></div>
              <div className="absolute bottom-4 left-2 right-2 h-1 bg-slate-400/50 rounded"></div>
            </div>
            
            <div className="absolute left-2/5 bottom-1/4 w-32 h-12 bg-gradient-to-r from-slate-600/50 to-slate-500/30 rounded-xl shadow-xl">
              <div className="absolute inset-3 bg-gradient-to-r from-slate-300/40 to-slate-200/20 rounded-lg"></div>
            </div>
            
            <div className="absolute right-1/4 bottom-1/3 w-20 h-28 bg-gradient-to-t from-slate-600/40 to-slate-500/20 rounded-lg shadow-lg">
              <div className="absolute top-2 left-2 right-2 bottom-8 bg-gradient-to-b from-amber-200/30 to-transparent rounded"></div>
            </div>
            
            {/* Atmospheric Particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-amber-200/80 rounded-full animate-pulse"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${5 + Math.random() * 90}%`,
                    animationDuration: `${2 + Math.random() * 6}s`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
            
            {/* Premium Camera Pan Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/15 to-transparent opacity-50" style={{ 
              animation: 'walkthrough 20s infinite ease-in-out'
            }}></div>
            
            {/* Luxury Ambiance */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-50/5 to-transparent animate-pulse opacity-40" style={{
              animationDuration: '10s'
            }}></div>
          </div>
        </div>
        
        {/* Video Overlay for Cinematic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black/70 via-transparent to-matte-black/50 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-matte-black/30 pointer-events-none"></div>
      </div>
      
      {/* Cyberpunk Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-matte-black via-matte-black/50 to-transparent" />
      <div className="absolute inset-0 gradient-electric opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
        <div className="space-y-6 sm:space-y-8">
          {/* Featured Label */}
          <div className="fade-in-up">
            <span className="font-minimal text-xs text-electric-blue tracking-wider uppercase border border-electric-blue/30 px-3 sm:px-4 py-2 inline-block rounded">
              Featured Project
            </span>
          </div>

          {/* Title */}
          <div className="fade-in-up">
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-7xl text-ghost-white mb-3 sm:mb-4 tracking-tight">
              Calemorra
            </h2>
            <p className="font-minimal text-base sm:text-lg text-cyber-purple tracking-wider uppercase">
              Orlando, Florida
            </p>
          </div>

          {/* Description */}
          <div className="fade-in-up space-y-4 sm:space-y-6">
            <p className="font-minimal text-base sm:text-lg text-ghost-white/90 leading-relaxed">
              Where luxury meets the future. Calemorra redefines Orlando hospitality 
              with immersive technology, avant-garde design, and experiences that 
              blur the boundaries between reality and imagination.
            </p>
            <p className="font-minimal text-sm sm:text-base text-ghost-white/70 leading-relaxed">
              Every surface tells a story through ambient lighting, interactive elements, 
              and spaces that adapt to your presence. This isn't just accommodation—it's 
              a glimpse into the future of travel.
            </p>
          </div>

          {/* Features */}
          <div className="fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {[
                'Adaptive Lighting Systems',
                'Immersive Audio Environments', 
                'Smart Glass Technology',
                'Biometric Access Control'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-electric-blue rounded-full flex-shrink-0" />
                  <span className="font-minimal text-sm text-ghost-white/80">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="fade-in-up">
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-electric-blue/20 to-cyber-purple/20 border border-electric-blue/40 text-ghost-white font-minimal text-sm tracking-widest uppercase transition-all duration-500 hover:from-electric-blue/30 hover:to-cyber-purple/30 hover:border-electric-blue hover:shadow-lg hover:shadow-electric-blue/30 rounded-lg">
              <span className="relative z-10">Experience Calemorra</span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cyber-purple opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg" />
            </button>
          </div>
        </div>

        {/* Interactive Element Placeholder */}
        <div className="fade-in-up order-first lg:order-last">
          <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 border border-electric-blue/30 animate-pulse rounded-lg" />
            <div className="absolute inset-2 sm:inset-4 border border-cyber-purple/30 rounded-lg" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-4 sm:inset-8 border border-electric-blue/20 rounded-lg" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-0 gradient-radial rounded-lg" />
          </div>
        </div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-electric-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    </section>
  );
};