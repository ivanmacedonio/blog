import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RenderPosts } from "./RenderPosts";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import "../styles/Posts.css";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");

  const [filtertext, setFilterText] = useState("");
  const [filter, setFilter] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function loadPosts() {
      const token = localStorage.getItem("access");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get("https://drfblogcrud-api.onrender.com/api/postlist/", {
          headers,
        });
        const resUserId = await axios.get(
          "https://drfblogcrud-api.onrender.com/api/getUser/",
          {
            headers,
          }
        );
        setPosts(res.data);
        setIsAuth(true);
        setUserId(resUserId.data.user_id);
      } else {
        setIsAuth(false);
      }
    }
    loadPosts();
  }, []);

  async function onSubmit(data) {
    if (data.title === "") {
      setFilter(false);
    } else {
      const filter_text = data.title;
      const res = await axios.post("https://drfblogcrud-api.onrender.com/api/getPost/", {
        filter_text,
      });
      setFilteredPosts(res.data.posts);
      setFilter(true);
      
    }
  }


  return (
    <div>
      {isAuth ? (
        <div>
          <Button
            className="buttons"
            onClick={() => {
              navigate("/create");
            }}
          >
            <div className="navigate">Create post</div>
          </Button>
          <Button
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
          >
            <div className="navigate">{username}</div>
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("access");
              navigate("/login");
            }}
          >
            <div className="navigate">⬅ Logout</div>
          </Button>
          <form className="searchbar" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="bar"
              id="standard-basic"
              label="Search a post..."
              variant="standard"
              {...register("title")}
            />

            <button className="buttonSearch" type="submit">
              Search
            </button>
          </form>

          {filter ? (
            <div className="container">
              <div className="postlist">
                {filteredPosts.map((filtered) => (
                  <div key={filtered.id} className="post">
                    <RenderPosts
                      image={`http://127.0.0.1:8000${filtered.image}`}
                      key={filtered.id}
                      post={filtered}
                    ></RenderPosts>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="postlist">
                {posts.map((post) => (
                  <div key={post.id} className="post">
                    <RenderPosts key={post.id} post={post} image={post.image}></RenderPosts>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>
          Failted to authenticate, <a href="/login">Login</a>
        </h1>
      )}
    </div>
  );
};
