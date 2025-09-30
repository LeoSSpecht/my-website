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
          perPage: Math.min(3, images.length),
          perMove: 1,
          interval: 3000,
          type: images.length > 3 ? "loop" : "slide",
          autoplay: images.length > 3 ? true : "pause",
          pauseOnFocus: false,
          pauseOnHover: true,
          pagination: false,
          arrows: false,
        }}
      >
        {images.map((img_path) => {
          return (
            <SplideSlide className="flex-center">
              <img
                alt="sushi"
                src={`${process.env.PUBLIC_URL + img_path}`}
                style={{
                  width: "220px",
                  height: "220px",
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
