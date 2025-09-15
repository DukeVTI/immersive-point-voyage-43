import { useEffect, useRef } from 'react';
import { StarryBackground } from '@/components/3d/StarryBackground';
import { HeroBackground3D } from '@/components/3d/HeroBackground3D';
import { MouseParticles } from '@/components/3d/MouseParticles';
import { Footer } from '@/components/Footer';
import farmhouse from '@/assets/farmhouse.jpg';
import bungalow from '@/assets/bungalow.jpg';
import trailhouse from '@/assets/trailhouse.jpg';
import kissimmee from '@/assets/kissimmee.jpg';
import floridaRoom from '@/assets/florida-room.jpg';
import sweetGum from '@/assets/sweet-gum.jpg';
import modernOasis from '@/assets/modern-oasis.jpg';

const properties = [
  {
    id: 1,
    name: "Farm House",
    location: "Luxury Rural Retreat",
    type: "Farm House",
    image: farmhouse,
    link: "https://www.airbnb.com/l/z3t6MUbU"
  },
  {
    id: 2,
    name: "718 Bungalow",
    location: "Modern Urban Living",
    type: "Contemporary Bungalow",
    image: bungalow,
    link: "https://www.airbnb.com/l/5GltsUJv"
  },
  {
    id: 3,
    name: "The Trailhouse Retreat",
    location: "Nature's Gateway",
    type: "Mountain Retreat",
    image: trailhouse,
    link: "https://www.airbnb.com/l/2s4AJKv5"
  },
  {
    id: 4,
    name: "Kissimmee Relaxing Getaway",
    location: "Florida Paradise",
    type: "Vacation Rental",
    image: kissimmee,
    link: "https://www.airbnb.com/l/n20co3j7"
  },
  {
    id: 5,
    name: "The Florida Room",
    location: "Sunshine State Living",
    type: "Tropical Escape",
    image: floridaRoom,
    link: "https://www.airbnb.com/l/ag5b3tWZ"
  },
  {
    id: 6,
    name: "Sweet Gum Cottage",
    location: "Charming Countryside",
    type: "Cottage Retreat",
    image: sweetGum,
    link: "https://www.airbnb.com/l/CYDlAuWH"
  },
  {
    id: 7,
    name: "The Modern Oasis",
    location: "Contemporary Luxury",
    type: "Modern Villa",
    image: modernOasis,
    link: "https://www.airbnb.com/l/5iAdufLO"
  }
];

const Properties = () => {
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

  const handlePropertyClick = (propertyId: number) => {
    window.location.href = `/property/${propertyId}`;
  };

  return (
    <main className="min-h-screen bg-matte-black relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>
      
      <div className="relative z-10">
        <MouseParticles />
      </div>
      
      <div className="relative z-20">
        <HeroBackground3D />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-silver/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-silver/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-40 pt-16 sm:pt-24 lg:pt-32" ref={gridRef}>
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="fade-in-up text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="relative bg-matte-black/40 backdrop-blur-xl border border-ghost-white/10 rounded-xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 shadow-2xl max-w-4xl mx-auto">
              <h1 className="font-editorial text-3xl sm:text-5xl md:text-7xl text-silver mb-6 sm:mb-8 tracking-tight">
                Our Properties
              </h1>
              <p className="font-minimal text-base sm:text-lg text-ghost-white/70 max-w-2xl mx-auto leading-relaxed">
                Discover our curated collection of exceptional properties, each offering 
                a unique blend of luxury, comfort, and extraordinary experiences.
              </p>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pb-16 sm:pb-24">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="fade-in-up group cursor-pointer relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-silver/20 rounded-lg"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handlePropertyClick(property.id)}
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
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Properties;