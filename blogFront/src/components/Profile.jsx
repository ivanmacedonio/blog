import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RenderPosts } from "./RenderPosts";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../styles/Profile.css'
export const Profile = () => {
  const params = useParams();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("access");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://127.0.0.1:8000/api/userList/${params.id}`,
          { headers }
        );
        const resPosts = await axios.get(
          `http://127.0.0.1:8000/api/postListFiltered/`,
          {
            headers,
          }
        );
        setUsername(res.data[0].username);
        setPosts(resPosts.data.posts);
      } else {
        console.log("error");
      }
    }
    loadData();
  }, []);
  return (
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
          navigate("/");
        }}
      >
        <div className="navigate">Posts</div>
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem('access')
          navigate('/login')
        }}
      >
        <div className="navigate">Logout</div>
      </Button>
      <div className="username">
        <h2>{username}</h2>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <RenderPosts post={post}></RenderPosts>
          </div>
        ))}
      </div>
    </div>
  );
};
