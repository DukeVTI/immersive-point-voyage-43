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
    location: "Sanford, Florida, United States",
    type: "Farm House",
    rating: 5.0,
    reviews: 10,
    images: [farmhouse, farmhouse1, farmhouse2, farmhouse3, farmhouse4],
    description: "🏡 The 1917 Farmhouse Charming 3BR, 2BA retreat on nearly an acre near Downtown Sanford. Fully stocked kitchen, cozy living room, patios, hammock & firepit. Minutes from Boombah Sports Complex & New Smyrna Beach. Pet-friendly with Wi-Fi, parking & smart access.",
    features: ["6 Guests", "3 Bedrooms","2 Baths", "3 Beds"],
    amenities: ["WiFi", "Kitchen", "Parking", "Air Conditioning","Pet Friendly","Dedicated workspace"],
    link: "https://www.airbnb.com/l/z3t6MUbU"
  },
  {
    id: 2,
    name: "718 Bungalow",
    location: "Orlando, Florida, United States",
    type: "Contemporary Bungalow",
    rating: 4.6,
    reviews: 5,
    images: [bungalow, bungalow1, bungalow2],
    description: "✨ The 718 Bungalow Modern 1BR, 1BA private bungalow in Orlando’s College Park/Winter Park corridor. Features queen bed, Smart TV, Wi-Fi, stylish bath, mini fridge & Keurig. Enjoy full privacy with a dedicated entrance & patio. Minutes from Winter Park & Downtown.",
    features: ["1 Bedroom", "1 Bathroom", "1 Bed", "2 Guests"],
    amenities: ["WiFi", "Microwave", "Parking", "Air Conditioning", "Workspace", "HDTV"],
    link: "https://www.airbnb.com/l/5GltsUJv"
  },
  {
    id: 3,
    name: "The Trailhouse Retreat",
    location: "Sanford, Florida, United States",
    type: "Mountain Retreat",
    rating: 5.0,
    reviews: 12,
    images: [trailhouse, trailhouse1, trailhouse2, trailhouse3, trailhouse4, trailhouse5, trailhouse6, trailhouse7, trailhouse8, trailhouse9],
    description: "🏡 Trailhouse Retreat – A 3BR/2BA getaway near Orlando blending charm & comfort. Features queen bedrooms, bunk beds, full kitchen, fenced yard, firepit, swing, and a private hot tub. Perfect for families or couples seeking relaxation & adventure. Smart lock entry, Wi-Fi & washer/dryer included.",
    features: ["3 Bedrooms", "2 Bathrooms", "6 guests", "4 beds"],
    amenities: ["WiFi", "Kitchen", "HDTV with standard cable", "Free dryer", "Free washer", "Dedicated workspace"],
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
    name: "The Florida Room",
    location: "Sanford, Florida, United States",
    type: "Tropical Escape",
    rating: 4.76,
    reviews: 17,
    images: [floridaRoom, floridaRoom1, floridaRoom2, floridaRoom3, floridaRoom4],
    description: "🌴 The Florida Room – Cozy studio in historic Sanford with full kitchen, queen bed, workspace & stylish living area. Just 0.3 miles from Lake Monroe Hospital—perfect for nurses, pros, or a relaxing escape. Private outdoor hangout, smart entry, Wi-Fi, and pet-friendly (fee applies).",
    features: ["2 Beds", "1 Bathroom", "Studio", "4 Guests"],
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Dedicated workspace", "TV", "Private backyard"],
    link: "https://www.airbnb.com/l/ag5b3tWZ"
  },
  {
    id: 6,
    name: "🌿 Sweet Gum Cottage",
    location: "Sanford, Florida, United States",
    type: "Cottage Retreat",
    rating: 4.85,
    reviews: 13,
    images: [sweetGum, sweetGum1, sweetGum2, sweetGum3, sweetGum4],
    description: "🌿 Sweet Gum Cottage – Cozy 3BR/2BA retreat just 10 mins from Sanford Airport, Historic District & Boombah Sports Complex. Features queen beds, full kitchen, screened patio & firepit. Perfect for families or getaways. Smart entry, Wi-Fi & comfy interiors. Grill currently unavailable.",
    features: ["3 Bedrooms", "2 Bathroom", "6 Guests", "3 Beds"],
    amenities: ["WiFi", "Kitchen", "TV", "Washer", "Bathtub", "Air Conditioning"],
    link: "https://www.airbnb.com/l/CYDlAuWH"
  },
  {
    id: 7,
    name: "🌴 The Modern Oasis",
    location: "Orlando, Florida, United States",
    type: "Modern Villa",
    rating: 4.97,
    reviews: 101,
    images: [modernOasis, modernOasis1, modernOasis2, modernOasis3, modernOasis4],
    description: "🌴 The Modern Oasis – Chic 2BR/1BA duplex in Downtown Orlando with queen beds, rainfall shower, stylish living space & dining area. Walk to bars, coffee shops & Lake Eola. Just 15 mins from Universal & airport. Includes private entrance, smart lock, driveway parking for 2, and Wi-Fi.",
    features: ["4 Bedrooms", "1 Bathroom", "4 guests", "2 Beds"],
    amenities: ["Fast WiFi", "Kitchen", "Central air conditioning", "65 inch HDTV", "Refrigerator", "Exterior security cameras"],
    link: "https://www.airbnb.com/l/5iAdufLO"
  },
  {
    id: 8,
   name: "🌴 The Modern Oasis",
    location: "Orlando, Florida, United States",
    type: "Modern Villa",
    rating: 4.97,
    reviews: 101,
    images: [modernOasis, modernOasis1, modernOasis2, modernOasis3, modernOasis4],
    description: "🌴 The Modern Oasis – Chic 2BR/1BA duplex in Downtown Orlando with queen beds, rainfall shower, stylish living space & dining area. Walk to bars, coffee shops & Lake Eola. Just 15 mins from Universal & airport. Includes private entrance, smart lock, driveway parking for 2, and Wi-Fi.",
    features: ["4 Bedrooms", "1 Bathroom", "4 guests", "2 Beds"],
    amenities: ["Fast WiFi", "Kitchen", "Central air conditioning", "65 inch HDTV", "Refrigerator", "Exterior security cameras"],
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