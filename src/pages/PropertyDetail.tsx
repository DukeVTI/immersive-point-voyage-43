import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, Star, MapPin, Camera, Eye } from 'lucide-react';
import { StarryBackground } from '@/components/3d/StarryBackground';
import { HeroBackground3D } from '@/components/3d/HeroBackground3D';
import { MouseParticles } from '@/components/3d/MouseParticles';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import farmhouse from '@/assets/farmhouse.jpg';
import bungalow from '@/assets/bungalow.jpg';
import trailhouse from '@/assets/trailhouse.jpg';
import kissimmee from '@/assets/kissimmee.jpg';
import floridaRoom from '@/assets/florida-room.jpg';
import sweetGum from '@/assets/sweet-gum.jpg';
import modernOasis from '@/assets/modern-oasis.jpg';

// Extended property data with multiple images
const properties = [
  {
    id: 1,
    name: "Farm House",
    location: "Luxury Rural Retreat",
    type: "Farm House",
    rating: 4.9,
    reviews: 127,
    images: [farmhouse, bungalow, trailhouse],
    description: "Experience the perfect blend of rustic charm and modern luxury in this stunning farmhouse retreat. Nestled in the countryside, this property offers breathtaking views and unparalleled tranquility.",
    features: ["4 Bedrooms", "3 Bathrooms", "Private Pool", "Large Garden", "Fireplace"],
    amenities: ["WiFi", "Kitchen", "Parking", "Air Conditioning", "Hot Tub", "Pet Friendly"],
    link: "https://www.airbnb.com/l/z3t6MUbU"
  },
  {
    id: 2,
    name: "718 Bungalow",
    location: "Modern Urban Living",
    type: "Contemporary Bungalow",
    rating: 4.8,
    reviews: 89,
    images: [bungalow, farmhouse, kissimmee],
    description: "A sophisticated urban retreat featuring contemporary design and premium amenities. Perfect for those seeking modern comfort in the heart of the city.",
    features: ["3 Bedrooms", "2 Bathrooms", "Modern Kitchen", "Rooftop Terrace", "Smart Home Features"],
    amenities: ["WiFi", "Kitchen", "Parking", "Air Conditioning", "Workspace", "City Views"],
    link: "https://www.airbnb.com/l/5GltsUJv"
  },
  {
    id: 3,
    name: "The Trailhouse Retreat",
    location: "Nature's Gateway",
    type: "Mountain Retreat",
    rating: 5.0,
    reviews: 64,
    images: [trailhouse, modernOasis, sweetGum],
    description: "Escape to nature in this beautifully crafted mountain retreat. Surrounded by hiking trails and pristine wilderness, it's the perfect getaway for outdoor enthusiasts.",
    features: ["2 Bedrooms", "2 Bathrooms", "Hot Tub", "Hiking Access", "Mountain Views"],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot Tub", "Hiking", "Mountain Views"],
    link: "https://www.airbnb.com/l/2s4AJKv5"
  },
  {
    id: 4,
    name: "Kissimmee Relaxing Getaway",
    location: "Florida Paradise",
    type: "Vacation Rental",
    rating: 4.7,
    reviews: 203,
    images: [kissimmee, floridaRoom, bungalow],
    description: "Your gateway to Florida's magic, this charming vacation rental offers easy access to theme parks while providing a peaceful retreat after exciting days.",
    features: ["5 Bedrooms", "4 Bathrooms", "Game Room", "Pool Access", "Near Theme Parks"],
    amenities: ["WiFi", "Kitchen", "Pool", "Game Room", "Theme Park Access", "Family Friendly"],
    link: "https://www.airbnb.com/l/n20co3j7"
  },
  {
    id: 5,
    name: "The Florida Room",
    location: "Sunshine State Living",
    type: "Tropical Escape",
    rating: 4.9,
    reviews: 156,
    images: [floridaRoom, kissimmee, trailhouse],
    description: "Embrace the Florida lifestyle in this bright and airy tropical escape. Features stunning outdoor spaces and easy access to beaches and local attractions.",
    features: ["3 Bedrooms", "2 Bathrooms", "Screened Porch", "Tropical Garden", "Beach Access"],
    amenities: ["WiFi", "Kitchen", "Beach Access", "Garden", "Outdoor Dining", "Tropical Views"],
    link: "https://www.airbnb.com/l/ag5b3tWZ"
  },
  {
    id: 6,
    name: "Sweet Gum Cottage",
    location: "Charming Countryside",
    type: "Cottage Retreat",
    rating: 4.8,
    reviews: 92,
    images: [sweetGum, farmhouse, modernOasis],
    description: "A delightful cottage that combines rustic charm with modern comforts. Perfect for a romantic getaway or peaceful family vacation in the countryside.",
    features: ["2 Bedrooms", "1 Bathroom", "Cozy Fireplace", "Garden Views", "Peaceful Setting"],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Garden Views", "Peaceful", "Romantic"],
    link: "https://www.airbnb.com/l/CYDlAuWH"
  },
  {
    id: 7,
    name: "The Modern Oasis",
    location: "Contemporary Luxury",
    type: "Modern Villa",
    rating: 5.0,
    reviews: 78,
    images: [modernOasis, bungalow, floridaRoom],
    description: "Experience ultimate luxury in this contemporary villa featuring cutting-edge design, premium amenities, and stunning architectural details.",
    features: ["4 Bedrooms", "3 Bathrooms", "Infinity Pool", "Wine Cellar", "Chef's Kitchen"],
    amenities: ["WiFi", "Kitchen", "Infinity Pool", "Wine Cellar", "Luxury", "Chef's Kitchen"],
    link: "https://www.airbnb.com/l/5iAdufLO"
  }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const property = properties.find(p => p.id === Number(id));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contentRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen bg-matte-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-ghost-white mb-4">Property not found</h1>
          <Button onClick={() => navigate('/properties')} variant="outline">
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const goToProperties = () => {
    navigate('/properties');
  };

  const openAirbnbLink = () => {
    window.open(property.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-matte-black relative overflow-hidden">
      {/* Enhanced Background layers */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>
      
      <div className="relative z-10">
        <MouseParticles />
      </div>
      
      <div className="relative z-20">
        <HeroBackground3D />
      </div>

      {/* Premium ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-silver/8 via-silver/4 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-accent/6 via-accent/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-2/3 w-[400px] h-[400px] bg-gradient-radial from-ghost-white/4 via-ghost-white/2 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-40 pt-6 sm:pt-12" ref={contentRef}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Premium Navigation */}
          <div className="fade-in-up mb-6 sm:mb-8">
            <div className="flex items-center justify-between">
              <Button 
                onClick={goToProperties}
                variant="ghost"
                className="group relative overflow-hidden bg-matte-black/30 backdrop-blur-xl border border-ghost-white/20 hover:border-silver/40 text-ghost-white hover:text-silver transition-all duration-500 rounded-full px-6 py-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-silver/10 to-ghost-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ArrowLeft className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10 font-minimal">Back to Properties</span>
              </Button>
              
              <div className="flex items-center gap-2 bg-matte-black/40 backdrop-blur-xl border border-ghost-white/20 rounded-full px-4 py-2">
                <Camera className="w-4 h-4 text-silver" />
                <span className="font-minimal text-sm text-ghost-white">{property.images.length} Photos</span>
              </div>
            </div>
          </div>

          {/* Premium Property Header */}
          <div className="fade-in-up mb-8 sm:mb-12">
            <div className="relative overflow-hidden bg-gradient-to-br from-matte-black/60 via-matte-black/40 to-matte-black/20 backdrop-blur-2xl border border-ghost-white/20 rounded-3xl p-8 sm:p-12">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-silver/5 via-transparent to-accent/5 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div className="mb-4 sm:mb-0">
                    <span className="inline-flex items-center gap-2 font-minimal text-sm text-silver tracking-widest uppercase mb-3 px-4 py-2 bg-silver/10 rounded-full border border-silver/20">
                      {property.type}
                    </span>
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ghost-white mb-3 tracking-tight leading-tight">
                      {property.name}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-ghost-white/80">
                        <MapPin className="w-5 h-5 text-silver" />
                        <span className="font-minimal text-lg">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-accent fill-current" />
                        <span className="font-minimal text-ghost-white font-medium">{property.rating}</span>
                        <span className="font-minimal text-ghost-white/60">({property.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative p-4 bg-matte-black/60 backdrop-blur-xl border border-ghost-white/20 rounded-2xl shadow-xl">
                      <img 
                        src="/lovable-uploads/cef92f60-a1cd-4bd0-b481-cdc34ccd9fb4.png" 
                        alt="WXYPOINT Logo" 
                        className="h-16 w-auto object-contain filter brightness-0 invert opacity-90"
                      />
                    </div>
                  </div>
                </div>
                
                <p className="font-minimal text-lg text-ghost-white/80 leading-relaxed max-w-4xl">
                  {property.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Premium Image Gallery */}
            <div className="lg:col-span-3 fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative group">
                {/* Main image container with premium styling */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-matte-black/60 to-matte-black/20 backdrop-blur-2xl border border-ghost-white/20 shadow-2xl shadow-matte-black/50">
                  {/* Loading state */}
                  {isImageLoading && (
                    <div className="absolute inset-0 bg-matte-black/60 backdrop-blur-xl flex items-center justify-center z-20">
                      <div className="w-8 h-8 border-2 border-silver border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  
                  <img 
                    src={property.images[currentImageIndex]}
                    alt={`${property.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    onLoad={() => setIsImageLoading(false)}
                  />
                  
                  {/* Premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Enhanced Navigation Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-matte-black/70 backdrop-blur-xl border border-ghost-white/30 rounded-full flex items-center justify-center text-ghost-white hover:bg-matte-black/90 hover:border-silver/50 hover:text-silver hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-xl"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-matte-black/70 backdrop-blur-xl border border-ghost-white/30 rounded-full flex items-center justify-center text-ghost-white hover:bg-matte-black/90 hover:border-silver/50 hover:text-silver hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-xl"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Premium image counter */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-matte-black/70 backdrop-blur-xl border border-ghost-white/30 rounded-full shadow-xl">
                      <span className="text-sm text-ghost-white font-minimal tracking-wide">
                        {currentImageIndex + 1} / {property.images.length}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Premium Thumbnail Navigation */}
                {property.images.length > 1 && (
                  <div className="flex gap-3 mt-6 justify-center overflow-x-auto pb-2">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsImageLoading(true);
                          setCurrentImageIndex(index);
                        }}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-500 hover:scale-105 ${
                          index === currentImageIndex 
                            ? 'border-silver shadow-xl shadow-silver/30 ring-2 ring-silver/20' 
                            : 'border-ghost-white/30 hover:border-silver/50'
                        }`}
                      >
                        <img 
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-silver/20 backdrop-blur-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Property Details Sidebar */}
            <div className="lg:col-span-2 space-y-6 fade-in-up" style={{ animationDelay: '400ms' }}>
              {/* Features Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-matte-black/60 via-matte-black/40 to-matte-black/20 backdrop-blur-2xl border border-ghost-white/20 rounded-2xl p-6 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-silver/3 via-transparent to-accent/3 rounded-2xl" />
                <div className="relative z-10">
                  <h3 className="font-editorial text-2xl text-ghost-white mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Features
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-matte-black/30 rounded-xl border border-ghost-white/10 hover:border-silver/30 transition-all duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-silver to-accent rounded-full" />
                        <span className="font-minimal text-ghost-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-matte-black/60 via-matte-black/40 to-matte-black/20 backdrop-blur-2xl border border-ghost-white/20 rounded-2xl p-6 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-silver/3 rounded-2xl" />
                <div className="relative z-10">
                  <h3 className="font-editorial text-2xl text-ghost-white mb-6 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-silver" />
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-2 bg-matte-black/40 border border-ghost-white/20 rounded-full text-sm font-minimal text-ghost-white/80 hover:border-silver/40 hover:text-ghost-white transition-all duration-300"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Premium Action Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={openAirbnbLink}
                  className="group relative w-full h-14 bg-gradient-to-r from-silver via-ghost-white to-silver text-matte-black font-medium overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-silver/20 hover:scale-105"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 font-minimal tracking-wide">View on Airbnb</span>
                </Button>
                
                <Button 
                  onClick={goToProperties}
                  variant="outline"
                  className="group relative w-full h-14 bg-matte-black/40 border-2 border-ghost-white/30 text-ghost-white hover:bg-matte-black/60 hover:border-silver/50 hover:text-silver font-minimal transition-all duration-500 rounded-2xl overflow-hidden"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-silver/10 via-transparent to-silver/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 tracking-wide">View All Properties</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PropertyDetail;