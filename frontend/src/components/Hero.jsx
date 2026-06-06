
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const Hero = ({ onSearchChange, initialQuery }) => {
  const [localSearch, setLocalSearch] = useState(initialQuery || "");

  // Popular locations as seen in Screenshot 2026-05-06 164806.png
  const popularLocations = [
    "Frontgate ",
    "Backgate",
    "Junction",
    "Izzabgo",
    "Iwakpo",
  ];

  useEffect(() => {
    setLocalSearch(initialQuery || "");
  }, [initialQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    if (onSearchChange) onSearchChange(value);
  };

  const handleLocationClick = (loc) => {
    setLocalSearch(loc);
    if (onSearchChange) onSearchChange(loc);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) onSearchChange(localSearch);
  };

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <section className="relative min-h-[200px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl md:min-h-[200px] lg:min-h-[200px]">
        {/* Background Image - hero-lagos.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: "url('/ad.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-6 py-20 md:px-20 lg:px-32">
          <div className="max-w-4xl text-white">
            <h1 className="mb-6 text-5xl font-semibold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
              Settle smart
              <br />
              Live better.
            </h1>

            <p className="mb-10 max-w-xl text-lg font-normal leading-relaxed opacity-90 md:text-xl lg:text-2xl">
             More than housing discover the city through the people who know it best
            </p>

            {/* SEARCH AREA - Matching Screenshot 2026-05-06 164806.png */}
            <div className="w-full max-w-3xl">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center w-full bg-white rounded-full p-1.5 shadow-lg"
              >
                <div className="pl-5 flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={localSearch}
                  onChange={handleInputChange}
                  placeholder="Search city, area, or property..."
                  className="w-full h-12 md:h-14 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent text-lg"
                />
                <button
                  type="submit"
                  className="h-12 md:h-14 px-8 md:px-10 rounded-full bg-[#0F233C] text-white font-bold text-lg hover:bg-[#1a3a5c] transition-colors active:scale-95"
                >
                  Search
                </button>
              </form>

              {/* POPULAR TAGS */}
              {/* <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-white/80">
                  Popular:
                </span>
                {popularLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationClick(loc)}
                    className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/10 text-white text-sm hover:bg-white/25 transition-all active:scale-95"
                  >
                    {loc}
                  </button>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        {/* Decorative Bottom Fade */}
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/40 to-transparent" />
      </section>
    </div>
  );
};

export default Hero;
