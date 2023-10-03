import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import "../styles/RenderComments.css";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

export const RenderComments = ({ postid }) => {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const token = localStorage.getItem("access");
    async function loadData() {
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://127.0.0.1:8000/api/postComment/${postid}/`,
          {
            headers,
          }
        );
        setComments(res.data);
      } else {
        console.log("error");
      }
    }
    loadData();
  }, []);

  async function onSubmit(data) {
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `http://127.0.0.1:8000/api/postComment/${postid}/`,
      data,
      { headers }
    );
    window.location.reload();
    console.log(res.data);
  }

  return (
    <div className="commentBox">
      <form className="usernameinput" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className="usernm"
          id="outlined-basic"
          label="Say something..."
          variant="outlined"
          {...register("textComment")}
        />
        <div className="buttonComment">
          <Button variant="outlined" type="submit">
            Comment
          </Button>
        </div>
      </form>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <ul>
            <li>
              {comment.user} : {comment.text}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
