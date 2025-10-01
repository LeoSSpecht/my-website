import React, { useEffect, useRef, useState } from "react";
import {
  Splide,
  SplideSlide,
  Splide as SplideType,
} from "@splidejs/react-splide";
import ImageOverlay from "./ImageOverlay";
import "@splidejs/react-splide/css";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const splideRef = useRef<SplideType | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (splideRef.current && isVisible && selectedImageIndex === null) {
      splideRef.current.splide?.Components?.Autoplay?.play();
    } else if (splideRef.current) {
      splideRef.current.splide?.Components?.Autoplay?.pause();
    }
  }, [isVisible, selectedImageIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || selectedImageIndex !== null) return;

      switch (e.key) {
        case "ArrowRight":
          splideRef.current?.splide?.go(">");
          break;
        case "ArrowLeft":
          splideRef.current?.splide?.go("<");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, selectedImageIndex]);

  return (
    <>
      <div ref={containerRef}>
        <Splide
          ref={splideRef}
          options={{
            perPage: isMobile
              ? Math.min(2, images.length)
              : Math.min(3, images.length),
            perMove: 1,
            interval: 3000,
            type: images.length > (isMobile ? 2 : 3) ? "loop" : "slide",
            autoplay: images.length > (isMobile ? 2 : 3) ? true : "pause",
            pauseOnFocus: false,
            pauseOnHover: true,
            pagination: false,
            arrows: false,
            gap: "1rem",
          }}
        >
          {images.map((img_path, index) => (
            <SplideSlide key={index} className="flex-center">
              <div className="aspect-square w-full max-w-[220px]">
                <img
                  alt="food"
                  src={`${process.env.PUBLIC_URL + img_path}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImageIndex(index)}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {selectedImageIndex !== null && (
        <ImageOverlay
          images={images.map(
            (img_path) => `${process.env.PUBLIC_URL + img_path}`
          )}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
};

export default ImageCarousel;
