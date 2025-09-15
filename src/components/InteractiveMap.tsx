import { useEffect, useRef, useState } from 'react';

const locations = [
  { id: 1, name: 'Miami', x: 75, y: 70, status: 'active' },
  { id: 2, name: 'Orlando', x: 73, y: 65, status: 'featured' },
  { id: 3, name: 'Austin', x: 45, y: 60, status: 'active' },
  { id: 4, name: 'Tulum', x: 35, y: 80, status: 'active' },
  { id: 5, name: 'Los Angeles', x: 15, y: 45, status: 'coming' },
  { id: 6, name: 'New York', x: 80, y: 35, status: 'coming' }
];

export const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

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

    const elements = mapRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-matte-black" ref={mapRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="fade-in-up text-center mb-20">
          <h2 className="font-editorial text-4xl md:text-6xl text-ghost-white mb-8 tracking-tight">
            Become Part of the Map
          </h2>
          <p className="font-minimal text-lg text-ghost-white/70 max-w-2xl mx-auto leading-relaxed">
            Our network spans carefully selected destinations, each chosen for 
            its unique character and potential for extraordinary experiences.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="fade-in-up max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-matte-black via-soft-gray-dark/20 to-matte-black border border-soft-gray-medium/20 overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 grid-rows-8 h-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-ghost-white/10" />
                ))}
              </div>
            </div>

            {/* Location Markers */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Marker */}
                <div className={`relative w-4 h-4 transition-all duration-300 ${
                  location.status === 'featured' ? 'scale-125' : ''
                }`}>
                  <div className={`w-full h-full rounded-full border-2 ${
                    location.status === 'active' ? 'bg-accent border-accent' :
                    location.status === 'featured' ? 'bg-electric-blue border-electric-blue' :
                    'bg-transparent border-ghost-white/50'
                  } transition-all duration-300`} />
                  
                  {/* Pulse Effect */}
                  {location.status !== 'coming' && (
                    <div className={`absolute inset-0 rounded-full animate-ping ${
                      location.status === 'featured' ? 'bg-electric-blue/30' : 'bg-accent/30'
                    }`} />
                  )}
                </div>

                {/* Location Label */}
                <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                  hoveredLocation === location.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <div className="bg-matte-black/90 backdrop-blur-sm px-3 py-2 border border-ghost-white/20 whitespace-nowrap">
                    <span className="font-minimal text-sm text-ghost-white">
                      {location.name}
                    </span>
                    <span className={`ml-2 text-xs ${
                      location.status === 'active' ? 'text-accent' :
                      location.status === 'featured' ? 'text-electric-blue' :
                      'text-ghost-white/50'
                    }`}>
                      {location.status === 'coming' ? 'Coming Soon' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              {locations.filter(l => l.status !== 'coming').map((location, index, array) => {
                if (index === array.length - 1) return null;
                const nextLocation = array[index + 1];
                return (
                  <line
                    key={`${location.id}-${nextLocation.id}`}
                    x1={`${location.x}%`}
                    y1={`${location.y}%`}
                    x2={`${nextLocation.x}%`}
                    y2={`${nextLocation.y}%`}
                    stroke="hsl(var(--accent))"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-electric-blue/5 pointer-events-none" />
          </div>

          {/* Legend */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="font-minimal text-sm text-ghost-white/70">Active Properties</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-electric-blue rounded-full" />
              <span className="font-minimal text-sm text-ghost-white/70">Featured Project</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-ghost-white/50 rounded-full" />
              <span className="font-minimal text-sm text-ghost-white/70">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};