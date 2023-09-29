import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RenderPosts } from "./RenderPosts";
import { Button } from "@mui/material";

import "../styles/Posts.css";

export const Posts = ({ likes }) => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPosts() {
      const res = await axios.get("http://127.0.0.1:8000/api/postlist/");
      setPosts(res.data);
    }
    loadPosts();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          navigate("/create");
        }}
      >
        <div className="navigate">💻 Create post</div>
      </Button>
      <div className="container">
        <div className="postlist">
          {posts.map((post) => (
            <div
              className="post"
              onClick={() => {
                navigate(`/postdetail/${post.id}`);
              }}
            >
              <RenderPosts key={post.id} post={post}></RenderPosts>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
