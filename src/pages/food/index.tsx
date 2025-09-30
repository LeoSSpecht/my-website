import React from "react";
import BlogPost from "../../components/blog/blogPost";

import "../../blog.css";

const postFolders = ["08182025_urara"];

const Food: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        font: "system-ui, 'Helvetica', sans-serif",
        color: "#555",
        fontWeight: "bold",
      }}
      // className="bold"
    >
      <h1 style={{ textAlign: "center" }}>My Food Blog</h1>
      {postFolders.map((folder) => (
        <BlogPost key={folder} folder={folder} />
      ))}
    </div>
  );
};

export default Food;
