import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL || "";
        axios.post(`${API_URL}/register`, { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/');
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

                    <label>Full Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Hrithik Roshan"
                        required
                    />

                    <label>Email-Id</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="abc@gmail.com"
                        required
                    />

                    <label>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="*********"
                        required
                    />

                    <button type="submit" className="signin-btn">Sign Up</button>

                    <div style={{ marginTop: "15px", fontSize: "0.9rem", textAlign: "center" }}>
                        Already have an account? <Link to="/" style={{ color: "#7439db", fontWeight: "bold", textDecoration: "none" }}>Login here</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}