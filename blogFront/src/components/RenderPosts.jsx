import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/RenderPosts.css'

export const RenderPosts = ({post}) => {
  return (
    <div className="compo" >
      <div className="post" key={post.id}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div>{post.author}</div>
      </div>
    </div>
  );
};
