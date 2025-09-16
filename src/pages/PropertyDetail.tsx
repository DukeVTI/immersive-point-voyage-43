import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, Star, MapPin, Camera, Eye } from 'lucide-react';
import { StarryBackground } from '@/components/3d/StarryBackground';
import { HeroBackground3D } from '@/components/3d/HeroBackground3D';
import { MouseParticles } from '@/components/3d/MouseParticles';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

//Imports for Farmhouse 1917
import farmhouse from '@/assets/farmhouse/IMG_6036.png';
import farmhouse1 from '@/assets/farmhouse/IMG_6037.png';
import farmhouse2 from '@/assets/farmhouse/IMG_6038.png';
import farmhouse3 from '@/assets/farmhouse/IMG_6039.png';
import farmhouse4 from '@/assets/farmhouse/IMG_6040.png';

//Imports for 718 Bungalow 
import bungalow from '@/assets/718/IMG_6024.png';
import bungalow1 from '@/assets/718/IMG_6025.png';
import bungalow2 from '@/assets/718/IMG_6026.png';

//Imports for TrailHouse Retreat 
import trailhouse from '@/assets/trailhouseretreat/IMG_6028.png';
import trailhouse1 from '@/assets/trailhouseretreat/IMG_6030.png';
import trailhouse2 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151149.png';
import trailhouse3 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151206.png';
import trailhouse4 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151214.png';
import trailhouse5 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151221.png';
import trailhouse6 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151237.png';
import trailhouse7 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151244.png';
import trailhouse8 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151251.png';
import trailhouse9 from '@/assets/trailhouseretreat/Screenshot 2025-08-19 151257.png';

//imports for Pine Meadows Retreat 
import kissimmee from '@/assets/pinemeadows/Screenshot 2025-08-19 150626.png';
import kissimmee1 from '@/assets/pinemeadows/Screenshot 2025-08-19 150636.png';
import kissimmee2 from '@/assets/pinemeadows/Screenshot 2025-08-19 150646.png';
import kissimmee3 from '@/assets/pinemeadows/Screenshot 2025-08-19 150657.png';
import kissimmee4 from '@/assets/pinemeadows/Screenshot 2025-08-19 150703.png';
import kissimmee5 from '@/assets/pinemeadows/Screenshot 2025-08-19 150712.png';
import kissimmee6 from '@/assets/pinemeadows/Screenshot 2025-08-19 150721.png';
import kissimmee7 from '@/assets/pinemeadows/Screenshot 2025-08-19 150730.png';
import kissimmee8 from '@/assets/pinemeadows/Screenshot 2025-08-19 150738.png';
import kissimmee9 from '@/assets/pinemeadows/Screenshot 2025-08-19 150746.png';
import kissimmee10 from '@/assets/pinemeadows/Screenshot 2025-08-19 150755.png';
import kissimmee11 from '@/assets/pinemeadows/Screenshot 2025-08-19 150804.png';
import kissimmee12 from '@/assets/pinemeadows/Screenshot 2025-08-19 150816.png';

//Import for Marcy Lounge
import floridaRoom from '@/assets/marcy/Screenshot 2025-08-19 145943.png';
import floridaRoom1 from '@/assets/marcy/Screenshot 2025-08-19 150109.png';
import floridaRoom2 from '@/assets/marcy/Screenshot 2025-08-19 150123.png';
import floridaRoom3 from '@/assets/marcy/Screenshot 2025-08-19 150147.png';
import floridaRoom4 from '@/assets/marcy/Screenshot 2025-08-19 150156.png';

//Import for Sweet Gum Cottage
import sweetGum from '@/assets/sweetgumcottage/Screenshot 2025-08-19 150950.png';
import sweetGum1 from '@/assets/sweetgumcottage/Screenshot 2025-08-19 151012.png';
import sweetGum2 from '@/assets/sweetgumcottage/Screenshot 2025-08-19 151031.png';
import sweetGum3 from '@/assets/sweetgumcottage/Screenshot 2025-08-19 151042.png';
import sweetGum4 from '@/assets/sweetgumcottage/Screenshot 2025-08-19 151053.png';

//Import for Modern Oasis
import modernOasis from '@/assets/modernoasis/Screenshot 2025-08-19 150400.png';
import modernOasis1 from '@/assets/modernoasis/Screenshot 2025-08-19 150407.png';
import modernOasis2 from '@/assets/modernoasis/Screenshot 2025-08-19 150419.png';
import modernOasis3 from '@/assets/modernoasis/Screenshot 2025-08-19 150427.png';
import modernOasis4 from '@/assets/modernoasis/Screenshot 2025-08-19 150442.png';

//Import for Release Retreat
import capecoral from '@/assets/releaseretreat/IMG_6032.png'
import capecoral1 from '@/assets/releaseretreat/IMG_6033.png'
import capecoral2 from '@/assets/releaseretreat/IMG_6034.png'
import capecoral3 from '@/assets/releaseretreat/IMG_6035.png'

// Extended property data with multiple images
const properties = [
  {
    id: 1,
    name: "Farm House",
    location: "Sanford, Florida",
    type: "Farm House",
    rating: 4.9,
    reviews: 127,
    images: [farmhouse, farmhouse1, farmhouse2, farmhouse3, farmhouse4],
    description: "Experience the perfect blend of rustic charm and modern luxury in this stunning farmhouse retreat. Nestled in the countryside, this property offers breathtaking views and unparalleled tranquility.",
    features: ["4 Bedrooms", "3 Bathrooms", "Private Pool", "Large Garden", "Fireplace"],
    amenities: ["WiFi", "Kitchen", "Parking", "Air Conditioning", "Hot Tub", "Pet Friendly"],
    link: "https://www.airbnb.com/l/z3t6MUbU"
  },
  {
    id: 2,
    name: "718 Bungalow",
    location: "College Park, Florida",
    type: "Contemporary Bungalow",
    rating: 4.8,
    reviews: 89,
    images: [bungalow, bungalow1, bungalow2],
    description: "A sophisticated urban retreat featuring contemporary design and premium amenities. Perfect for those seeking modern comfort in the heart of the city.",
    features: ["3 Bedrooms", "2 Bathrooms", "Modern Kitchen", "Rooftop Terrace", "Smart Home Features"],
    amenities: ["WiFi", "Kitchen", "Parking", "Air Conditioning", "Workspace", "City Views"],
    link: "https://www.airbnb.com/l/5GltsUJv"
  },
  {
    id: 3,
    name: "The Trailhouse Retreat",
    location: "Sanford, Florida",
    type: "Mountain Retreat",
    rating: 5.0,
    reviews: 64,
    images: [trailhouse, trailhouse1, trailhouse2, trailhouse3, trailhouse4, trailhouse5, trailhouse6, trailhouse7, trailhouse8, trailhouse9],
    description: "Escape to nature in this beautifully crafted mountain retreat. Surrounded by hiking trails and pristine wilderness, it's the perfect getaway for outdoor enthusiasts.",
    features: ["2 Bedrooms", "2 Bathrooms", "Hot Tub", "Hiking Access", "Mountain Views"],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot Tub", "Hiking", "Mountain Views"],
    link: "https://www.airbnb.com/l/2s4AJKv5"
  },
  {
    id: 4,
    name: "Pine Meadows Retreat",
    location: "Orlando, Florida",
    type: "Vacation Rental",
    rating: 4.7,
    reviews: 203,
    images: [kissimmee, kissimmee1, kissimmee2, kissimmee3, kissimmee4, kissimmee5, kissimmee6, kissimmee7, kissimmee8, kissimmee9, kissimmee10, kissimmee11, kissimmee12],
    description: "Your gateway to Florida's magic, this charming vacation rental offers easy access to theme parks while providing a peaceful retreat after exciting days.",
    features: ["5 Bedrooms", "4 Bathrooms", "Game Room", "Pool Access", "Near Theme Parks"],
    amenities: ["WiFi", "Kitchen", "Pool", "Game Room", "Theme Park Access", "Family Friendly"],
    link: "https://www.airbnb.com/l/n20co3j7"
  },
  {
    id: 5,
    name: "Marcy Lounge",
    location: "Longwood, Florida",
    type: "Tropical Escape",
    rating: 4.9,
    reviews: 156,
    images: [floridaRoom, floridaRoom1, floridaRoom2, floridaRoom3, floridaRoom4],
    description: "Embrace the Florida lifestyle in this bright and airy tropical escape. Features stunning outdoor spaces and easy access to beaches and local attractions.",
    features: ["3 Bedrooms", "2 Bathrooms", "Screened Porch", "Tropical Garden", "Beach Access"],
    amenities: ["WiFi", "Kitchen", "Beach Access", "Garden", "Outdoor Dining", "Tropical Views"],
    link: "https://www.airbnb.com/l/ag5b3tWZ"
  },
  {
    id: 6,
    name: "Sweet Gum Cottage",
    location: "Sanford, Florida",
    type: "Cottage Retreat",
    rating: 4.8,
    reviews: 92,
    images: [sweetGum, sweetGum1, sweetGum2, sweetGum3, sweetGum4],
    description: "A delightful cottage that combines rustic charm with modern comforts. Perfect for a romantic getaway or peaceful family vacation in the countryside.",
    features: ["2 Bedrooms", "1 Bathroom", "Cozy Fireplace", "Garden Views", "Peaceful Setting"],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Garden Views", "Peaceful", "Romantic"],
    link: "https://www.airbnb.com/l/CYDlAuWH"
  },
  {
    id: 7,
    name: "Modern Oasis",
    location: "Orlando, Florida",
    type: "Modern Villa",
    rating: 5.0,
    reviews: 78,
    images: [modernOasis, modernOasis1, modernOasis2, modernOasis3, modernOasis4],
    description: "Experience ultimate luxury in this contemporary villa featuring cutting-edge design, premium amenities, and stunning architectural details.",
    features: ["4 Bedrooms", "3 Bathrooms", "Infinity Pool", "Wine Cellar", "Chef's Kitchen"],
    amenities: ["WiFi", "Kitchen", "Infinity Pool", "Wine Cellar", "Luxury", "Chef's Kitchen"],
    link: "https://www.airbnb.com/l/5iAdufLO"
  },
  {
    id: 8,
    name: "Release Retreat",
    location: "Cape Coral, Florida",
    type: "Modern Villa",
    rating: 5.0,
    reviews: 78,
    images: [capecoral, capecoral1, capecoral2, capecoral3],
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