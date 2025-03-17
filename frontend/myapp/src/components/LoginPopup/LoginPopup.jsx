import React, { useState,useContext} from "react";
import './LoginPopup.css';
import crossicon from './cross_icon.png';
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';
const LoginPopup = ({ setShowLogin}) => {
    
    const { url, setToken} = useContext(StoreContext); 
    const [currstate, setcurrstate] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let endpoint = currstate === "Login" ? "/api/user/login" : "/api/user/register";
        
        try {
            const response = await axios.post(`${url}${endpoint}`, data, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                window.location.reload(); // Refresh to reflect login status in Navbar
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currstate}</h2>
                    <img onClick={() => setShowLogin(false)} src={crossicon} alt="close icon" />
                </div>
                <div className="login-popup-input">
                    {currstate !== 'Login' && (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your Email"
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currstate === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
                </div>
                <hr />
                {currstate === "Login" ? (
                    <p>Create a new account? <span onClick={() => setcurrstate("Sign Up")}>Click Here</span></p>
                ) : (
                    <p>Already have an Account? <span onClick={() => setcurrstate("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
