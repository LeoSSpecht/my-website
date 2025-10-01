import React from "react";
import json from "./posts.json";
import BlogPost from "../../components/blog/blogPost";

import "../../blog.css";
import PostContent from "./postContent";

const Blog: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "700px",
        marginTop: "1rem",
        padding: "0 1.5rem",
        font: "system-ui, 'Helvetica', sans-serif",
        color: "#555",
      }}
      className="blog"
    >
      <h1 style={{ textAlign: "center" }}>My Food Blog</h1>
      {json.map((postData: PostContent) => (
        <BlogPost
          key={postData.folder_name}
          folder={postData.folder_name}
          imageCount={postData.image_amount}
        />
      ))}
    </div>
  );
};

export default Blog;
