import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RenderPosts.css";
import { RenderComments } from "./RenderComments";
import axios from "axios";
export const RenderPosts = ({ post }) => {
  async function handleOnClick(postid) {
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const post_id = postid;
    const res = await axios.post(
      "http://127.0.0.1:8000/api/postLike/",
      post_id,
      {
        headers,
      }
    );
    console.log(res);
  }
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
        <div className="likes" onClick={handleOnClick}>
          <h2 onClick={handleOnClick(post.id)}>{post.likes} Likes</h2>
        </div>
      </div>
    </>
  );
};
