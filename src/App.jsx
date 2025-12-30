import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Aboutus from "./components/Aboutus";
import Feedback from "./components/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
