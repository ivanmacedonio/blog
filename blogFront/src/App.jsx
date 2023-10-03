import "./App.css";
import { Posts } from "./components/Posts";
import { CreatePost } from "./components/CreatePost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostDetail } from "./components/PostDetail";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Profile } from "./components/Profile";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts></Posts>}/>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/create" element={<CreatePost></CreatePost>}/>
        <Route path="/postdetail/:id" element={<PostDetail></PostDetail>}/>
        <Route path="/profile/:id" element={<Profile></Profile>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
