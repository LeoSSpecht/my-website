import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div style={{ textAlign: "center", margin: "1rem 0" }}>
      <button onClick={prev}>◀</button>
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        style={{ maxWidth: "400px", display: "block", margin: "0 auto" }}
      />
      <button onClick={next}>▶</button>
    </div>
  );
};

export default ImageCarousel;
