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
  const [image, setImage] = useState(null);

  async function onSubmit(data) {
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("image", image); // 'image' es el nombre del campo donde deseas enviar la imagen
    formData.append("title", data.title);
    formData.append("description", data.description);
    console.log(formData);

    if ((data.title === "") | (data.description === "")) {
      console.log('error');
    } else {
      await axios.post("https://drfblogcrud-api.onrender.com/api/postlist/", formData, {
        headers,
      });
      navigate("/");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  function handleImage(e) {
    const file = e.target.files[0];
    setImage(file);
  }

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
              <input type="file" onChange={handleImage} />
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
          Failed to authenticate, please <a href="/login">login</a>
        </h1>
      )}
    </div>
  );
};
