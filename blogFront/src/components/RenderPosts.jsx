import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/RenderPosts.css'

export const RenderPosts = ({post}) => {
  return (
    <div className="compo" >
      <div className="post" key={post.id}>
        <h1>{post.title}</h1>
        <h2>{post.description}</h2>
        <div>{post.author}</div>
      </div>
    </div>
  );
};
