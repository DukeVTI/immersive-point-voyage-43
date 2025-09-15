import { useEffect, useRef } from 'react';
import { Property3DContainer } from '@/components/3d/Property3DContainer';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const properties = [
  {
    id: 1,
    name: "Farm House",
    location: "Luxury Rural Retreat",
    type: "Farm House",
    image: property1,
    link: "https://www.airbnb.com/l/z3t6MUbU"
  },
  {
    id: 2,
    name: "718 Bungalow",
    location: "Modern Urban Living",
    type: "Contemporary Bungalow",
    image: property2,
    link: "https://www.airbnb.com/l/5GltsUJv"
  },
  {
    id: 3,
    name: "The Trailhouse Retreat",
    location: "Nature's Gateway",
    type: "Mountain Retreat",
    image: property3,
    link: "https://www.airbnb.com/l/2s4AJKv5"
  }
];

export const PropertiesGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = gridRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handlePropertyClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-matte-black to-matte-black/90 relative overflow-hidden" ref={gridRef}>
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyber-purple/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="fade-in-up text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-6xl text-ghost-white mb-6 sm:mb-8 tracking-tight">
            Explore Our Properties
          </h2>
          <p className="font-minimal text-base sm:text-lg text-ghost-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Each property in our collection offers a unique perspective on luxury, 
            design, and the art of hospitality.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="fade-in-up group cursor-pointer relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-silver/20 rounded-lg"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handlePropertyClick(property.link)}
            >
              <div className="relative overflow-hidden rounded-lg">
                {/* Property Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Animated Glow Effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-silver/20 via-transparent to-silver/20" />
                    
                    {/* Outer glow border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-silver to-silver rounded blur-sm opacity-30 animate-pulse" />
                    
                    {/* Animated scanning effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-silver/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                
                {/* Property Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-ghost-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-1 sm:space-y-2">
                    <span className="font-minimal text-xs text-silver tracking-wider uppercase">
                      {property.type}
                    </span>
                    <h3 className="font-editorial text-xl sm:text-2xl">
                      {property.name}
                    </h3>
                    <p className="font-minimal text-sm text-ghost-white/80">
                      {property.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Properties */}
        <div className="fade-in-up text-center mt-12 sm:mt-16">
          <button 
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-silver to-silver text-matte-black font-minimal text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-2xl hover:shadow-silver/25 hover:scale-105 overflow-hidden rounded-lg"
            onClick={() => window.location.href = '/properties'}
          >
            <span className="relative z-10">View All Properties</span>
            <div className="absolute inset-0 bg-gradient-to-r from-ghost-white to-ghost-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-silver to-silver blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};