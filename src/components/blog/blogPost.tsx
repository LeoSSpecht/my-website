import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ImageCarousel from "./imageCarrousel";
import "../../blog.css";

interface BlogPostProps {
  folder: string;
  imageCount: number;
}

const BlogPost: React.FC<BlogPostProps> = ({ folder, imageCount }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the markdown
    fetch(`/resources/posts/${folder}/post.md`)
      .then((res) => res.text())
      .then(setContent);

    // For simplicity, assume images are named 1.jpg, 2.jpg, 3.jpg
    const possible = Array.from({ length: imageCount }, (_, i) => i + 1).map(
      (i) => `/resources/posts/${folder}/imgs/${i}.jpeg`
    );

    console.log("Possible", possible);
    // Check which actually exist
    Promise.all(
      possible.map((url) => fetch(url).then((res) => (res.ok ? url : null)))
    ).then((urls) => setImages(urls.filter((u): u is string => !!u)));
  }, [folder, imageCount]);

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
