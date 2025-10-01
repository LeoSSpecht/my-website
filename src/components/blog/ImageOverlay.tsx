import React, { useEffect, useRef } from "react";
import {
  Splide,
  SplideSlide,
  Splide as SplideType,
} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
  const splideRef = useRef<SplideType>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          splideRef.current?.go(">");
          break;
        case "ArrowLeft":
          splideRef.current?.go("<");
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center overflow-hidden"
      onClick={handleBackgroundClick}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative aspect-square w-full max-w-[60vh]">
          <Splide
            ref={splideRef}
            options={{
              type: "fade",
              rewind: true,
              perPage: 1,
              arrows: false,
              pagination: false,
              drag: true,
              speed: 300,
              start: initialIndex,
            }}
          >
            {images.map((img, index) => (
              <SplideSlide key={index}>
                <div className="aspect-square w-full">
                  <img
                    src={img}
                    alt="enlarged view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default ImageOverlay;
