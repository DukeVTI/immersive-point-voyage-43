import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/HeroSection';
import { BrandStory } from '@/components/BrandStory';
import { PropertiesGrid } from '@/components/PropertiesGrid';
import { CalemorreFeatured } from '@/components/CalemorreFeatured';
import { JoinVision } from '@/components/JoinVision';
import { InteractiveMap } from '@/components/InteractiveMap';
import { Footer } from '@/components/Footer';
import { StarryBackground } from '@/components/3d/StarryBackground';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Add scroll effects
  useEffect(() => {
    if (!isLoading) {
      // Smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Intersection observer for fade-in animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, observerOptions);

      // Observe all fade-in-up elements
      const elements = document.querySelectorAll('.fade-in-up:not(.animate)');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="min-h-screen bg-matte-black relative">
      {/* Starry background - updated for visibility */}
      <StarryBackground />
      <div className="relative z-10">
        <HeroSection />
        <BrandStory />
        <PropertiesGrid />
        <CalemorreFeatured />
        <JoinVision />
        <InteractiveMap />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
