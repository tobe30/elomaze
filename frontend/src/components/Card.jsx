import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Card() {
  const lodges = [
    { img: "/pic1.jpg", title: "Frontgate" },
    { img: "/pic2.jpg", title: "Backgate" },
    { img: "/pic3.jpg", title: "Junction" },
    { img: "/pic1.jpg", title: "Izzabgo" },
    { img: "/property-6.jpg", title: "Iwkpo" },
  ];

  return (
    <div className="relative min-h-screen bg-white/40 flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="relative w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Scattered Cards - Hidden on Mobile */}
        <div className="hidden lg:block relative w-[600px] h-[600px] shrink-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.03] tracking-tighter z-0 select-none"
          >
            ELOMAZE
          </motion.h1>

          {lodges.map((lodge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                rotate: [-8, -18, 12, -12, 10][index],
              }}
              transition={{
                delay: index * 0.1,
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 50,
                transition: { duration: 0.3 },
              }}
              className="absolute w-[220px] h-[250px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md cursor-pointer group"
              style={{
                top: ["40px", "160px", "160px", "360px", "360px"][index],
                left: ["200px", "20px", "340px", "100px", "380px"][index],
                zIndex: 10 - index,
              }}
            >
              <img
                src={lodge.img}
                alt={lodge.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="text-white text-lg font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/60" />
                  {lodge.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Map & Text */}
        <div className="relative z-10 w-full lg:max-w-md space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-primary text-4xl md:text-5xl font-bold tracking-tight">
              Verified Housing, <br />
              <span className="text-primary">Zero Stress.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Explore premium student lodges mapped out for your convenience.
              Elomaze connects you to the best spaces around campus.
            </p>
          </div>

          {/* Map Preview - Shown on all devices */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative rounded-[32px] overflow-hidden shadow-xl"
          >
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <p className="text-white text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Explore Live Map
              </p>
            </div>
            <img
              src="/map.png"
              alt="University Map"
              className="w-full h-64 md:h-80 lg:h-64 object-cover rounded-[24px] grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
