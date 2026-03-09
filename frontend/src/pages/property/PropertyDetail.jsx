import { useParams, Link } from "react-router-dom";

import {
  MapPin,
  Bed,
  Bath,
  Home,
  Calendar,
  CheckCircle,
  Clock,
  MessageCircle,
  Phone,
  Share2,
  Heart,
  ArrowLeft,
  Play,
  Wifi,
  Car,
  Wind,
  Dumbbell,
  Shield,
  Droplets,
  Zap,
  Trees,
  User,
  Info,
  BadgeCheck,
  Flag,
} from "lucide-react";
import PropertyImageGallery from "../../components/PropertyImageGallery";
import PropertyReviews from "../../components/PropertyReviews";
import { useState } from "react";
import ReportPropertyModal from "../../components/modals/ReportPropertyModal";

const PropertyDetail = () => {
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Mock property data
  const property = {
    id: Number(id) || 1,
    title: "Modern 2BHK Apartment with City View",
    description:
      "Welcome to this stunning modern apartment located in the heart of downtown. This beautifully designed 2-bedroom unit offers an open floor plan with floor-to-ceiling windows providing breathtaking city views. The kitchen features premium appliances, quartz countertops, and a breakfast bar. Both bedrooms are generously sized with ample closet space. The master suite includes an en-suite bathroom with a walk-in shower. Building amenities include a rooftop terrace, fitness center, and 24-hour security. Perfect for young professionals or couples looking for convenient urban living.",
    propertyType: "Apartment",
    price: "₦1,000,000/year",
    address: "123 Main Street, Apt 4B",
    area: "Downtown, City Center",
    proximityNote: "5 min walk to Metro Station, 10 min to University Campus",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bedrooms: 2,
    bathrooms: 2,
    toilets: 2,
    squareFeet: 1200,
    amenities: [
      { name: "WiFi Ready", icon: Wifi },
      { name: "Parking", icon: Car },
      { name: "Air Conditioning", icon: Wind },
      { name: "Gym Access", icon: Dumbbell },
      { name: "Security", icon: Shield },
      { name: "Water Supply", icon: Droplets },
      { name: "Power Backup", icon: Zap },
      { name: "Garden", icon: Trees },
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
      
    ],
    isAvailable: true,
    availableFrom: "2024-02-01",
    agent: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      phone: "+1 234 567 8900",
      rating: 4.9,
      listings: 45,
      verified: true,
    },
    createdAt: "2024-01-15",
    verified: true,
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-20 md:pt-5">
        {/* Back & Actions */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/properties" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Link>

          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 mb-8">
          <PropertyImageGallery images={property.images} title={property.title} />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Badges */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {property.verified && (
                    <span className="flex items-center gap-1 text-xs bg-blue-500 text-blue-100 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-xs border border-gray-300 rounded-full">{property.propertyType}</span>
                  {property.isAvailable ? (
                    <span className="px-2 py-0.5 text-xs bg-primary text-white border border-green-200 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 border border-red-200 rounded-full">
                      Not Available
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-2xl font-bold mb-3">{property.title}</h1>

                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <span>{property.address}, {property.area}</span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-black" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-black" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-black" />
                    <span>{property.squareFeet} sq ft</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Price Highlight */}
              <div className="p-6 rounded-xl bg-gray-100 border border-gray-200 flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Yearly Rent</p>
                  <p className="text-[1.5rem] font-bold text-black">{property.price}</p>
                </div>
               
                <div>
                  <p className="text-sm text-gray-500 mb-1">Available From</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <p className="text-lg font-medium">{formatDate(property.availableFrom)}</p>
                  </div>
                </div>
              </div>

              {/* Proximity */}
              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location & Proximity
                </h2>
                <p className="bg-gray-100 text-gray-700 p-4 rounded-lg">{property.proximityNote}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">About this property</h2>
                <p className="text-gray-500 leading-relaxed">{property.description}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-gray-300">
                        <amenity.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Video Tour */}
              {property.videoLink && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-black" /> Video Tour
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <iframe
                      src={property.videoLink}
                      title="Property Video Tour"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Property Details Grid */}
              <div>
                <h2 className="text-xl text-black font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Property Type", value: property.propertyType },
                    { label: "Bedrooms", value: property.bedrooms },
                    { label: "Bathrooms", value: property.bathrooms },
                    { label: "Toilets", value: property.toilets },
                    { label: "Area", value: property.squareFeet + " sq ft" },
                    { label: "Listed On", value: formatDate(property.createdAt) },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gray-100">
                      <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Reviews */}
              <PropertyReviews propertyId={property.id} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
  <div className="sticky top-24 space-y-6">
    <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-4">
  <h3 className="text-lg font-semibold mb-4">Listed by</h3>
  <div className="flex items-center gap-4 mb-4">
    <div className="relative">
      <img
        src={property.agent.avatar}
        alt={property.agent.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      {property.agent.verified && (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-blue-500 p-1 shadow-md">
          <BadgeCheck className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
    <div>
      <Link
        to={`/agents/${property.agent.id}`}
        className="font-semibold hover:text-blue-500 transition-colors"
      >
        {property.agent.name}
      </Link>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>⭐ {property.agent.rating}</span>
        <span>•</span>
        <span>{property.agent.listings} listings</span>
      </div>
    </div>
  </div>

  <div className="space-y-3">
    {/* Primary Messaging */}
    <button className="w-full flex items-center gap-2 justify-center bg-primary text-white p-2 rounded-lg hover:bg-blue-500">
      <MessageCircle className="w-4 h-4" /> Message Agent
    </button>

    {/* Contact Dropdown */}
    <div className="relative">
      <button
        onClick={() => setShowContact((prev) => !prev)}
        className="w-full flex items-center gap-2 justify-center border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
      >
        <Phone className="w-4 h-4" />
        {showContact ? "Hide Contact" : "Show Contact"}
      </button>
      {showContact && (
        <div className="mt-3 space-y-3">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Agent Phone</p>
            <a 
              href={`tel:${property.agent.phone}`}
              className="text-lg font-semibold text-primary hover:underline flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {property.agent.phone}
            </a>
          </div>

          <div className="space-y-2 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Messaging through Elomaze is safer and helps track communication.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Inform the seller you got their number on Elomaze so they know where you came from.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    

    {/* Share & Report Buttons */}
    <div className="flex gap-2 pt-2 border-t border-gray-200">
      
      <button onClick={() => setIsReportOpen(true)} className="btn btn-ghost flex-1 gap-1.5 text-red-500 hover:text-red-700">
        <Flag className="w-4 h-4" /> Report this listing
      </button>
    </div>
  </div>
</div>


    {/* Quick Info */}
    <div className="p-6 rounded-xl bg-white border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Status</span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              property.isAvailable
                ? "bg-primary text-white border border-green-200"
                : "bg-red-100 text-red-600 border border-red-200"
            }`}
          >
            {property.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Available From</span>
          <span className="font-medium">{formatDate(property.availableFrom)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Property ID</span>
          <span className="font-medium">#{property.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4" /> Listed
          </span>
          <span className="font-medium">{formatDate(property.createdAt)}</span>
        </div>
      </div>
    </div>

    {/* Safety Tips */}
              <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Safety Tips
              </h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Verify the agent’s profile: check if verified, has a profile picture, and active listings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Never pay before viewing the property.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Meet in safe locations during inspections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Confirm ownership documents if necessary.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Bring someone along when visiting the property.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Use Elomaze messaging to track communication with the agent.</span>
                </li>
                 <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Report suspicious activity immediately.</span>
                </li>
              </ul>
            </div>

  </div>
</div>


          </div>
        </div>
      </div>

       <ReportPropertyModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={(data) => {
          console.log("PROPERTY REPORT:", data);
          // call backend API here
        }}
      />
    </div>
  );
};

export default PropertyDetail;
