import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RenderPosts.css";
import { RenderComments } from "./RenderComments";
import axios from "axios";
export const RenderPosts = ({ post }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="compo">
        <div
          className="post"
          key={post.id}
          onClick={() => {
            navigate(`/postdetail/${post.id}`);
          }}
        >
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4>Usuario: {post.author}</h4>
        </div>
        <div className="comments">
          <RenderComments postid={post.id}></RenderComments>
        </div>
      </div>
    </>
  );
};
