import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUser } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url + (currentState === "Login" ? "/api/user/login" : "/api/user/register");

    // Only send what backend expects
    const payload =
      currentState === "Login"
        ? { email: data.email, password: data.password }
        : { name: data.name, email: data.email, password: data.password };

    try {
      const response = await axios.post(newUrl, payload);
      console.log('Login/Register Response:', response.data);

      if (response.data.success) {
        // Check if the response has the expected structure
        const userData = response.data.data || response.data.user;
        const token = response.data.token || response.data.data?.token;
        
        if (!token) {
          console.error('No token in response:', response.data);
          throw new Error('Authentication failed: No token received');
        }

        // Set token and user data
        setToken(token);
        
        // If user data is available, use it; otherwise create a minimal user object
        const userToStore = userData || { 
          name: data.name || data.email.split('@')[0],
          email: data.email 
        };
        
        setUser(userToStore);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userToStore));
        
        toast.success(currentState === "Login" ? "Login successful!" : "Account created successfully!");
        setShowLogin(false);
      } else {
        const errorMessage = response.data.message || "Authentication failed. Please check your credentials and try again.";
        console.error('Authentication failed:', errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Login/Register error:", err);
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;