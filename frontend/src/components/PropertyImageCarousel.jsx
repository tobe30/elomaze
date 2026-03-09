import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PropertyImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Main Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="btn btn-circle btn-sm absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              className="btn btn-circle btn-sm absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/80 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "ring-2 ring-primary scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageCarousel;
