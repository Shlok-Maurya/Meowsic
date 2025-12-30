import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_API_URL || "";
    axios.post(`${API_URL}/`, { email, password })
      .then(result => {
        console.log(result);
        if (result.data.status === "Success") {
          localStorage.setItem("userName", result.data.name);
          window.location.href = '/home';
        } else {
          alert(result.data);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login-container">

      <div className="left-section">
        <img
          src="loginbg.png"
          alt="Login bg"
          className="illustration"
        />
        <h1 className="title">Meowsic</h1>
        <p className="subtitle">
          Where words fail, music speaks...
        </p>
      </div>

      <div className="right-section">

        <h1 className="logo">
          <img src="favicon.png" alt="logo" />
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>

          <label>Email-Id</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="*********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/forgot-password" className="forgot">Forgot password?</Link>

          <button type="submit" className="signin-btn">Login</button>

          <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>
            New here? <Link to="/register" style={{ color: "#7439db" }}>Create an account</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login