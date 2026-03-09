import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, CheckCircle, MessageCircle, Phone, Share2, Heart, Flag, AlertTriangle, ChevronDown, Shield, Info, Calendar, Award, Briefcase, ChevronLeft, ChevronRight, X, ZoomIn, BadgeCheck } from "lucide-react";
import ReportServiceModal from "../../components/modals/ReportServiceModal";


const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const services = [ 
    {
      id: 1,
      title: "Professional Plumbing Services",
      description: "Comprehensive plumbing services including pipe repairs, leak detection, drain cleaning, fixture installation, and water heater maintenance. We handle both residential and commercial properties with same-day emergency services available.\n\nOur team is fully equipped to handle any plumbing emergency, from burst pipes to clogged drains. We use modern equipment and techniques to ensure efficient and lasting repairs.",
      category: "Home Repair",
      price: "₦5,000",
      priceNote: "Starting price, final cost depends on service scope",
      duration: "1-2 hours",
      rating: 4.9,
      reviews: 127,
      verified: true,
      location: "Downtown Area, Lagos",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      availableHours: "8:00 AM - 6:00 PM",
      images: [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      ],
      features: [
        "Emergency 24/7 service",
        "Free inspection",
        "90-day warranty",
        "Licensed & insured",
      ],
      provider: {
        id: 1,
        name: "John's Repair Services",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
        phone: "+234 812 345 6789",
        rating: 4.9,
        totalReviews: 458,
        completedJobs: 892,
        yearsExperience: 10,
        verified: true,
        memberSince: "2019",
        responseTime: "Usually responds within 1 hour",
      },
    },
    {
      id: 2,
      title: "Expert Tailoring & Alterations",
      description: "Professional tailoring services including custom dress making, suit alterations, repairs, and hemming. We work with all types of fabrics and provide quick turnaround times without compromising on quality.\n\nWhether you need a simple hem or a complete custom outfit, our experienced tailors deliver precision and attention to detail.",
      category: "Tailoring",
      price: "₦3,000",
      priceNote: "Basic alterations, custom work priced separately",
      duration: "30-60 min",
      rating: 5.0,
      reviews: 89,
      verified: true,
      location: "City Center, Lagos",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      availableHours: "9:00 AM - 7:00 PM",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop",
      ],
      features: [
        "Same-day alterations available",
        "Custom measurements",
        "Quality fabrics",
        "Satisfaction guaranteed",
      ],
      provider: {
        id: 2,
        name: "Sarah's Tailoring Studio",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
        phone: "+234 803 456 7890",
        rating: 5.0,
        totalReviews: 234,
        completedJobs: 567,
        yearsExperience: 8,
        verified: true,
        memberSince: "2020",
        responseTime: "Usually responds within 30 minutes",
      },
    },
    {
      id: 3,
      title: "Computer Repair & Setup",
      description: "Expert computer repair, software installation, virus removal, and hardware upgrades. We service laptops, desktops, and provide network setup for homes and small businesses.\n\nOur certified technicians can diagnose and fix any computer issue quickly and affordably.",
      category: "Tech Support",
      price: "₦8,000",
      priceNote: "Diagnostic fee, repairs billed separately",
      duration: "2-3 hours",
      rating: 4.8,
      reviews: 156,
      verified: true,
      location: "Tech District, Lagos",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      availableHours: "10:00 AM - 8:00 PM",
      images: [
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      ],
      features: [
        "Same-day service available",
        "Data recovery",
        "Remote support option",
        "30-day warranty on repairs",
      ],
      provider: {
        id: 3,
        name: "Mike's Tech Solutions",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        phone: "+234 809 123 4567",
        rating: 4.8,
        totalReviews: 312,
        completedJobs: 654,
        yearsExperience: 6,
        verified: true,
        memberSince: "2021",
        responseTime: "Usually responds within 2 hours",
      },
    },
   ];

  const service = services.find((s) => s.id === Number(id));
  const similarServices = services.filter((s) => s.id !== Number(id)).slice(0, 3);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
      
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const providerInitials = service.provider.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Service link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-20">
        {/* Back & Actions */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/services" className="inline-flex items-center gap-2 px-4 py-2 text-black  rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="flex gap-2">
            <button className="p-2 border rounded-full hover:bg-gray-200">
              <Heart className="w-4 h-4" />
            </button>
            <button onClick={handleShare} className="p-2 border rounded-full  hover:bg-gray-100">
              <Share2 className="w-4 h-4" />
            </button>
           
          </div>
        </div>

        {/* Service Image */}
        <div className="container mx-auto px-4 mb-8">
          <div
            className="relative rounded-2xl overflow-hidden h-64 md:h-96 cursor-pointer group"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={service.images[selectedImageIndex]}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100">
              <ZoomIn className="w-5 h-5" />
            </div>



            {service.images.length > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {selectedImageIndex + 1} / {service.images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {service.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {service.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === idx
                      ? "ring-2 ring-blue-500 scale-105"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img src={img} alt={`${service.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                  {selectedImageIndex === idx && <div className="absolute inset-0 bg-blue-100/20" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative flex items-center justify-center w-full h-[80vh]">
              <img src={service.images[selectedImageIndex]} alt={`${service.title} - ${selectedImageIndex + 1}`} className="max-w-full max-h-full object-contain" />
              {service.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? service.images.length - 1 : prev - 1))}
                    className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === service.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {service.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg bg-black/50">
                {service.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-12 h-12 rounded overflow-hidden transition-all ${selectedImageIndex === idx ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12 grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {service.verified && (
                  <span className="flex items-center gap-1 text-xs bg-blue-500 text-blue-100 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                )}
                <span className="px-2 py-0.5 text-xs border border-gray-300 rounded-full">{service.category}</span>
              </div>

              <h1 className="text-3xl md:text-2xl font-bold mb-3">{service.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary" fill="currentColor" />

                  <span className="font-semibold">{service.rating}</span>
                  <span>({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{service.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl border border-gray-200 flex flex-wrap gap-4 justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Service Price</p>
                <p className="text-[1.5rem] font-bold text-black">{service.price}</p>
                <p className="text-xs text-gray-500 mt-1">{service.priceNote}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <p className="text-xl font-medium">{service.duration}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">About this service</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{service.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">What's included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Available Days</p>
                  <div className="flex flex-wrap gap-2">
                    {service.availableDays.map((day) => (
                      <span key={day} className="px-2 py-1 border rounded-full text-sm">{day.slice(0, 3)}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Working Hours</p>
                  <p className="font-medium">{service.availableHours}</p>
                </div>
              </div>
            </div>
                        {/* Similar Services */}
            {similarServices.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Similar Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarServices.map((s) => (
                    <Link key={s.id} to={`/services/${s.id}`}>
                      <div className="flex border rounded-lg overflow-hidden hover:shadow-lg transition">
                        <img
                          src={s.images[0]}
                          alt={s.title}
                          className="w-24 h-24 object-cover flex-shrink-0"
                        />
                        <div className="p-3 flex-1">
                          <h3 className="font-medium text-sm line-clamp-2">{s.title}</h3>
                          <p className="text-xs text-gray-500">{s.provider.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-3 h-3 text-primary" fill="currentColor"/>
                            <span className="text-xs font-medium">{s.rating}</span>
                            <span className="text-xs text-primary font-semibold" >{s.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Provider Card */}
            <div className="sticky top-24 space-y-6">
            <div className=" p-6 bg-white rounded-xl shadow-md space-y-4">
              <div className="flex items-start gap-4">
                 <div className="relative">
      <img
        src=""
        alt={service.provider.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      {service.provider.verified && (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-blue-500 p-1 shadow-md">
          <BadgeCheck className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{service.provider.name}</h3>
                   
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-blue" fill="currentColor" />
                    <span className="font-medium">{service.provider.rating}</span>
                    <span className="text-gray-500">({service.provider.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-100 rounded-lg text-center">
                <div>
                  <Briefcase className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold">{service.provider.completedJobs}</p>
                  <p className="text-xs text-gray-500">Jobs</p>
                </div>
                <div className="border-x border-gray-200">
                  <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold">{service.provider.yearsExperience}+</p>
                  <p className="text-xs text-gray-500">Years</p>
                </div>
                <div>
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold">{service.provider.memberSince}</p>
                  <p className="text-xs text-gray-500">Since</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {service.provider.responseTime}
              </p>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-500">
                <MessageCircle className="w-4 h-4" /> Message Provider
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
              href={`tel:${service.provider.phone}`}
              className="text-lg font-semibold text-primary hover:underline flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {service.provider.phone}
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
             {/* Safety Tips */}
              <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Safety Tips
              </h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Verify the agent’s profile: check if verified, has a profile picture, and active service.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Message through Elomaze for transaction records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Pay only after service is completed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>Use Elomaze messaging to track communication with the provider.</span>
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

<ReportServiceModal 
  isOpen={isReportOpen} 
  onClose={() => setIsReportOpen(false)}
  serviceId={service.id}
/>



    </div>
  );
};

export default ServiceDetail;
