import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ImageCarousel from "./imageCarrousel";
import "../../blog.css";

interface BlogPostProps {
  folder: string;
  imageCount: number;
  sourceImages?: string[];
}

const BlogPost: React.FC<BlogPostProps> = ({
  folder,
  imageCount,
  sourceImages,
}) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the markdown
    fetch(`/resources/posts/${folder}/post.md`)
      .then((res) => res.text())
      .then(setContent);

    let possible: string[] = [];

    if (!sourceImages) {
      possible = Array.from({ length: imageCount }, (_, i) => i + 1).map(
        (i) => `/resources/posts/${folder}/imgs/${i}.jpeg`
      );
    } else {
      possible = sourceImages.map(
        (value) => `/resources/posts/${folder}/imgs/${value}`
      );
    }

    // Check which actually exist
    Promise.all(
      possible.map((url) => fetch(url).then((res) => (res.ok ? url : null)))
    ).then((urls) => setImages(urls.filter((u): u is string => !!u)));
  }, [folder, imageCount, sourceImages]);

  return (
    <article
      id={folder}
      style={{ marginBottom: "3rem" }}
      className="post-content"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      <ImageCarousel images={images} />
    </article>
  );
};

export default BlogPost;
