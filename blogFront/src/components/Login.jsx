import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

import "../styles/Login.css";
import axios from "axios";
export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const nav = useNavigate();

  async function onSubmit(data) {
    try {
      const res = await axios.post(
        "https://drfblogcrud-api.onrender.com/api/loginView/",
        data
      );
      const access = res.data;
      const username = data.username
      localStorage.setItem("access", access.token);
      localStorage.setItem('username', username )
      nav("/");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div>
      <div className="titlelogin">
        <h1>Welcome to @ivandev Blog</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="formlogin">
        <div className="anch">
          <div className="usernameinput">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              {...register("username")}
            />
          </div>

          <div className="password">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              {...register("password")}
            />
          </div>

          <div className="buttonlogin">
            <Button variant="outlined" type="submit">
              Login
            </Button>
          </div>
        </div>
      </form>
      <div className="errorcontainer">
      {error ? (
          <Alert severity="error">
            <h2>Failed to authenticate credentials!</h2>
          </Alert>
        ) : (
          ""
        )}
      </div>
      <div className="foot">
        <h2>
          Dont have account? <a href="/register">Register</a> now for free!
        </h2>
      </div>
    </div>
  );
};
