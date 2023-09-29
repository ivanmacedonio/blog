import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RenderPosts } from "./RenderPosts";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const PostDetail = () => {
  const [post, setPosts] = useState([]);
  const params = useParams();
  const nav = useNavigate()
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/postdetail/${params.id}/`
      );
      setPosts(res.data);
    };
    loadData();
  }, [post]);

  async function onSubmit(data) {
    const update = await axios.put(
      `http://127.0.0.1:8000/api/postdetail/${params.id}/`,
      data
    );
    setPosts(update);
  }

  async function handleDelete() {
    await axios.delete(`http://127.0.0.1:8000/api/postdetail/${params.id}/`)
    nav('/')
  }

  return (
    <div className="app">
      <div>
        <RenderPosts post={post}></RenderPosts>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          {...register("title")}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          {...register("description")}
        />
        <Button variant="outlined" type="submit">
          Update
        </Button>
        <Button variant="outlined" color="error"
        onClick={handleDelete}>
          Delete
        </Button>
      </form>
    </div>
  );
};
