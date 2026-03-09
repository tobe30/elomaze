import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Dummy data for illustration
  const listings = [
    { id: 1, title: "Cozy Studio Near Campus", price: "₦50,000/mo", image: "/listing1.jpg", distance: "0.5km from school" },
    { id: 2, title: "Shared Apartment", price: "₦35,000/mo", image: "/listing2.jpg", distance: "1km from school" },
    { id: 3, title: "Single Room with Amenities", price: "₦45,000/mo", image: "/listing3.jpg", distance: "0.8km from school" },
  ];

  const roommates = [
    { id: 1, name: "Chika", school: "Uni of Lagos", preference: "Female", image: "/user1.jpg" },
    { id: 2, name: "Tunde", school: "ABU", preference: "Male", image: "/user2.jpg" },
    { id: 3, name: "Aisha", school: "Alex Ekwueme Uni", preference: "Any", image: "/user3.jpg" },
  ];

  const services = [
    { id: 1, name: "Tailor", description: "Quick stitching services", image: "/service1.jpg" },
    { id: 2, name: "Carpenter", description: "Furniture repairs and custom builds", image: "/service2.jpg" },
    { id: 3, name: "Electrician", description: "Fast electrical fixes", image: "/service3.jpg" },
  ];

  return (
    <div className="w-full font-sans">
      {/* HERO SECTION */}
      <section className="relative h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white" style={{ backgroundImage: "url('/elomaze-hero.jpg')" }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Find Your Next Stay</h1>
        <p className="text-lg md:text-xl mb-6 text-center">Your campus home made easy</p>
        <div className="flex gap-4">
          <Link to="/listings" className="bg-primary px-6 py-3 rounded text-white font-medium hover:bg-primary-dark transition">Find a Room</Link>
          <Link to="/list-space" className="bg-white px-6 py-3 rounded text-primary font-medium hover:bg-gray-100 transition">List Your Space</Link>
        </div>
      </section>

      {/* LISTINGS SECTION */}
      <section className="py-12 px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-6">Available Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map(listing => (
            <Link key={listing.id} to={`/listing/${listing.id}`} className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition">
              <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <p className="text-gray-600">{listing.price}</p>
                <p className="text-gray-400 text-sm">{listing.distance}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/listings" className="text-primary font-medium hover:underline">View All Listings</Link>
        </div>
      </section>

      {/* ROOMMATES SECTION */}
      <section className="py-12 px-4 md:px-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Find Roommates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {roommates.map(rm => (
            <div key={rm.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
              <img src={rm.image} alt={rm.name} className="w-24 h-24 rounded-full object-cover mb-4" />
              <h3 className="font-semibold">{rm.name}</h3>
              <p className="text-gray-600 text-sm">{rm.school}</p>
              <p className="text-gray-400 text-sm">Prefers: {rm.preference}</p>
              <Link to="/roommates" className="mt-3 text-primary font-medium hover:underline">Connect</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/roommates" className="text-primary font-medium hover:underline">See All Roommates</Link>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-12 px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-6">Local Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition p-4">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/services" className="text-primary font-medium hover:underline">See All Services</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-8 px-4 md:px-12 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Elomaze. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
          <Link to="/help" className="hover:underline">Help</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
