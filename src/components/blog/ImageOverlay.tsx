import React, { useEffect, useState } from "react";

interface ImageOverlayProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative aspect-square max-w-[90vh] max-h-[90vh]">
          <img
            src={images[currentIndex]}
            alt="enlarged view"
            className={`w-full h-full object-cover transition-opacity duration-600 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            onTransitionEnd={() => setIsTransitioning(false)}
            onLoad={() => setIsTransitioning(false)}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageOverlay;
