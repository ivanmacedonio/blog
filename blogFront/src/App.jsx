import "./App.css";
import { Posts } from "./components/Posts";
import { CreatePost } from "./components/CreatePost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostDetail } from "./components/PostDetail";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts></Posts>}/>
        <Route path="/create" element={<CreatePost></CreatePost>}/>
        <Route path="/postdetail/:id" element={<PostDetail></PostDetail>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
