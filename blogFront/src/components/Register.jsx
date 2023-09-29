import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate()

  async function onSubmit(data) {
    if(data.password !== data.password2){
        console.log('error')
    } else {
        const res = await axios.post('http://127.0.0.1:8000/api/userRegister/', data)
        nav('/login')
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
      <div className="foot">
        <h2>
          Have an account? <a href="/register">Login</a> now!
        </h2>
      </div>
    </div>
  );
};
