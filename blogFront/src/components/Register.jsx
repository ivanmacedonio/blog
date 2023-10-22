import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const [error, setter] = useState(false);
  const [message, setMessage] = useState("alerta");
  const nav = useNavigate();

  async function onSubmit(data) {
    if (data.password !== data.password2) {
      console.log("error");
      setter(true);
      setMessage("Passwords dont match");
    } else {
      try {
        const res = await axios.post(
          "https://drfblogcrud-api.onrender.com/api/userRegister/",
          data
        );
        nav('/login')
      } catch {
          setter(true);
          setMessage("Username already exists");
      }
    }
  }
  return (
    <div>
      <div className="titlelogin">
        <h1>Register an account</h1>
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

          <div className="password2">
            <TextField
              id="outlined-basic"
              label="Repeat your password"
              variant="outlined"
              {...register("password2")}
            />
          </div>

          <div className="buttonlogin">
            <Button variant="outlined" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
      <div className="errorcontainer">
        {error ? (
          <Alert severity="error" className="erroralert">
            <h2>{message}</h2>
          </Alert>
        ) : (
          ""
        )}
      </div>
      <div className="foot">
        <h2>
          Have an account? <a href="/login">Login</a> now!
        </h2>
      </div>
    </div>
  );
};
