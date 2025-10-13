import React, { useState, useEffect, useRef } from "react";
import {useNavigate,NavLink} from "react-router-dom"
import "../styles/login.css";
import useAuth from "../store/useAuth"


const Login = () => {
    const navigate = useNavigate()
    const {loginNow,isSigningIn} = useAuth()
    const msgRef = useRef(null);
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
        if (email.trim() === "") {
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
        await loginNow({
            email : email.trim(),
            password : password.trim()
        },showMessage,navigate)
    };

    return (
        <div className="login-container">
            <span ref={msgRef} id="message"></span>
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
                {isSigningIn? "Processing..." : "Login Now"}
            </button>
            <div className="footer-area">
                <p>
                    Don't Have Account ? <NavLink to="/signup">Login</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
