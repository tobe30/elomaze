import { useState } from "react";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add search logic here
  };

  return (
    <section className="relative h-[400px] md:h-[480px] w-full overflow-hidden">
      {/* Background Image */}
     <div
  className="absolute inset-0 bg-cover bg-[center_top_45%] bg-no-repeat"
  style={{ backgroundImage: "url('/ad.jpeg')" }}
/>

      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 animate-fade-in">
           Settle Smarter, Live Better
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 animate-fade-in">
            More than housing discover the city through the people who know it best
          </p>

          {/* Search Bar */}
         <form
  onSubmit={handleSearch}
  className="w-full max-w-3xl mx-auto animate-fade-in"
>
  <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-lg p-2.5 shadow-2xl">
    <input
      type="text"
      placeholder="Enter city, university, or neighborhood..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1 border-0 text-base md:text-lg h-12 md:h-14 
                 focus:outline-none focus:ring-0 focus-visible:ring-0"
    />
    <button
      type="submit"
      className="h-12 md:h-14 px-8 gap-2 whitespace-nowrap flex items-center justify-center 
                 bg-primary text-white rounded-lg hover:bg-blue-950 transition"
    >
      <Search className="h-5 w-5" />
      <span className="hidden sm:inline">Search Now</span>
      <span className="sm:hidden">Search</span>
    </button>
  </div>
</form>


          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 animate-fade-in">
            <span className="text-white/80 text-sm">Popular searches:</span>
            <button className="text-white text-sm hover:text-primary transition-colors underline underline-offset-2">
              London
            </button>
            <span className="text-white/50">•</span>
            <button className="text-white text-sm hover:text-primary transition-colors underline underline-offset-2">
              Manchester
            </button>
            <span className="text-white/50">•</span>
            <button className="text-white text-sm hover:text-primary transition-colors underline underline-offset-2">
              Birmingham
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
