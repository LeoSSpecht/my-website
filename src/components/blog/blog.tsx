import React from "react";
import json from "./posts.json";
import BlogPost from "../../components/blog/blogPost";

import "../../blog.css";
import PostContent from "./postContent";

const postFolders = ["08182025_urara"];

const Blog: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
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
