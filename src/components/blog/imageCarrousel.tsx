import React, { useEffect, useRef, useState } from "react";
import {
  Splide,
  SplideSlide,
  Splide as SplideType,
} from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
// // or other themes
// import "@splidejs/react-splide/css/skyblue";
// import "@splidejs/react-splide/css/sea-green";

// // or only core styles
// import "@splidejs/react-splide/css/core";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const splideRef = useRef<SplideType | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
    if (splideRef.current) {
      splideRef.current?.splide?.Components?.Autoplay?.play();
    }
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

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
  }, [isVisible]);
  return (
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
        {images.map((img_path, index) => {
          return (
            <SplideSlide key={index} className="flex-center">
              <img
                alt="food"
                src={`${process.env.PUBLIC_URL + img_path}`}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  aspectRatio: 1,
                }}
              ></img>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default ImageCarousel;
