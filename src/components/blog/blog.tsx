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
        margin: "0 auto",
        marginTop: "1rem",
        padding: "0 2rem",
        font: "system-ui, 'Helvetica', sans-serif",
        color: "#555",
      }}
      className="blog"
    >
      <h1 style={{ textAlign: "center" }}>My Food Blog</h1>
      <p className="m-auto max-w-lg text-center">
        Hey there! I am here to try what is (hopefully) the best food out there,
        and document what I find!
      </p>
      <div className="m-auto text-center my-2">
        {json.reverse().map((postData: PostContent) => (
          <a className="text-lg" href={`#${postData.folder_name}`}>
            {postData.title} <br></br>
          </a>
        ))}
      </div>
      {json.map((postData: PostContent) => (
        <BlogPost
          key={postData.folder_name}
          folder={postData.folder_name}
          imageCount={postData.image_amount}
          sourceImages={postData.images}
        />
      ))}
    </div>
  );
};

export default Blog;
