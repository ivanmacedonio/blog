import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RenderPosts } from "./RenderPosts";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/PostDetail.css";

export const PostDetail = () => {
  const [post, setPosts] = useState([]);
  const [isAuth, setIsAuth]  = useState(false);
  const params = useParams();
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://127.0.0.1:8000/api/postdetail/${params.id}/`,
          {
            headers,
          }
        );
        setPosts(res.data);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    loadData();
  }, []);

  async function onSubmit(data) {
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const update = await axios.put(
      `http://127.0.0.1:8000/api/postdetail/${params.id}/`,
      data,
      {
        headers,
      }
    );
    setPosts(update);
    nav("/");
  }

  async function handleDelete() {
    const token = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer${token}`
    }
    await axios.delete(`http://127.0.0.1:8000/api/postdetail/${params.id}/`, 
    {headers});
    nav("/");
  }

  return (
    <div className="app">
      {isAuth ? (
        <div>
          <div className="buton">
            <Button
              onClick={() => {
                nav("/");
              }}
            >
              <div className="navigation">⬅ Posts</div>
            </Button>
          </div>

          <div className="renderpost">
            <RenderPosts post={post}></RenderPosts>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="formRetrieve">
            <div className="form">
              <div className="t1">
                <TextField
                  className="input1"
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  {...register("title")}
                />
              </div>
              <div className="t2">
                <TextField
                  className="input2"
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  {...register("description")}
                />
              </div>
              <div className="update">
                <Button variant="outlined" type="submit" className="updatebtn">
                  Update
                </Button>
              </div>
              <div className="delete">
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h1>
          Failed to authenticate, please <a href="/login">login</a>
        </h1>
      )}
    </div>
  );
};
