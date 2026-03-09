import { useState } from "react";
import { ChevronLeft, ChevronRight, Grid, X } from "lucide-react";

const PropertyImageGallery = ({ images, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[450px]">
          <div
            className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>

          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="hidden md:block relative cursor-pointer group"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image}
                alt={`${title} - ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded shadow-lg text-sm font-medium"
          onClick={() => openLightbox(0)}
        >
          <Grid className="w-4 h-4" />
          Show all photos
        </button>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8">
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/30"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10 hover:bg-white/30"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next */}
          <button
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10 hover:bg-white/30"
            onClick={goToNext}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image */}
          <img
            src={images[currentIndex]}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />

          {/* Counter */}
          <div className="absolute bottom-8 md:bottom-12 bg-black/60 text-white px-4 py-1 rounded-full text-sm md:text-base">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 px-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-white scale-110"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img src={image} className="w-full h-full object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;
