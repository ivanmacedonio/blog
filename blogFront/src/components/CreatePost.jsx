import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/CreatePost.css";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post("http://127.0.0.1:8000/api/postlist/", data, {
      headers,
    });
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem('access')
    if(token){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])

  return (
    <div>
      {isAuth ? (
        <div>
          <div>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="navigation">⬅ Posts</div>
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="title">
              <TextField
                className="titleinput"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                {...register("title")}
              />
            </div>
            <div className="description">
              <TextField
                className="titleinput"
                id="outlined-basic"
                label="Description"
                variant="outlined"
                {...register("description")}
              />
            </div>
            <div className="button">
              <Button variant="outlined" type="submit">
                Create
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <h1>
          Failed authenticate, please <a href="/login">Login</a>
        </h1>
      )}
    </div>
  );
};
