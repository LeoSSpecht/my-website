import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ImageCarousel from "./imageCarrousel";

interface BlogPostProps {
  folder: string; // e.g. "2025-09-01_McDonalds"
}

const BlogPost: React.FC<BlogPostProps> = ({ folder }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the markdown
    fetch(`/resources/posts/${folder}/post.md`)
      .then((res) => res.text())
      .then(setContent);

    // For simplicity, assume images are named 1.jpg, 2.jpg, 3.jpg
    const possible = [1, 2, 3, 4, 5].map(
      (i) => `/posts/${folder}/imgs/${i}.jpeg`
    );

    // Check which actually exist
    Promise.all(
      possible.map((url) => fetch(url).then((res) => (res.ok ? url : null)))
    ).then((urls) => setImages(urls.filter((u): u is string => !!u)));
  }, [folder]);

  return (
    <article style={{ marginBottom: "3rem" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      <ImageCarousel images={images} />
    </article>
  );
};

export default BlogPost;
