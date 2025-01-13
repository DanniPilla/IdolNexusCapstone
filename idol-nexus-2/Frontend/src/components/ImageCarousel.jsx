import React, { useState } from "react";

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Images */}
      <div className="overflow-hidden relative">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-fuchsia-400 text-white p-2"
        onClick={goToPrevious}
      >
        &#8249; {/* Left Arrow */}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-fuchsia-400 text-white p-2"
        onClick={goToNext}
      >
        &#8250; {/* Right Arrow */}
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentIndex === index ? "bg-fuchsia-300" : "bg-fuchsia-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

// Define defaultProps
ImageCarousel.defaultProps = {
  images: [
    "https://via.placeholder.com/800x400?text=Default+Image+1",
    "https://via.placeholder.com/800x400?text=Default+Image+2",
    "https://via.placeholder.com/800x400?text=Default+Image+3",
  ],
};