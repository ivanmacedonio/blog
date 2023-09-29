import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RenderPosts } from "./RenderPosts";
import { Button } from "@mui/material";

import "../styles/Posts.css";

export const Posts = ({ likes }) => {
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPosts() {
      const token = localStorage.getItem("access");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get("http://127.0.0.1:8000/api/postlist/", {
          headers,
        });
        setPosts(res.data);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      {isAuth ? (
        <div>
          <Button
            onClick={() => {
              navigate("/create");
            }}
          >
            <div className="navigate">Create post</div>
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("access");
              navigate("/login");
            }}
          >
            <div className="navigate">⬅ Logout</div>
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
      ) : (
        <h1>Failted to authenticate, <a href="/login">Login</a></h1>
      )}
    </div>
  );
};
