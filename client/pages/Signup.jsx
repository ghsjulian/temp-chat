import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import useAuth from "../store/useAuth";

const Signup = () => {
    const navigate = useNavigate();
    const { signupNow, isSignup } = useAuth();
    const msgRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showMessage = (message, type) => {
        if (type) {
            msgRef.current.classList.add("success");
            msgRef.current.textContent = message;
        } else {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = message;
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 2500);
    };
    const isValid = () => {
        if (name.trim() === "") {
            showMessage("User Name Is Required", false);
            return false;
        } else if (email.trim() === "") {
            showMessage("Enter Email Address", false);
            return false;
        } else if (password.trim() === "") {
            showMessage("Enter Password", false);
            return false;
        } else {
            return true;
        }
    };

    const handleLogin = async () => {
        if (!isValid()) return;
        await signupNow(
            {
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            },
            showMessage,
            navigate
        );
    };

    return (
        <div className="login-container">
            <span ref={msgRef} id="message"></span>
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter Email Address"
                id="name"
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter Email Address"
                id="email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter Password"
                id="password"
            />
            <button onClick={handleLogin} className="login-btn">
                {isSignup ? "Processing..." : "Create Account"}
            </button>
            <div className="footer-area"></div>
        </div>
    );
};

export default Signup;
