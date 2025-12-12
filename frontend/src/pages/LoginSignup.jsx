import React, { useState } from "react";
import "./login_signup.css";
import Eye from "../assets/icons/Eye.svg";
import EyeOff from "../assets/icons/Eye_off.svg";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign Up form state
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Login form state (only for password visibility + username if you want controlled inputs later)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state
  const [passwordError, setPasswordError] = useState("");

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (passwordError) setPasswordError("");
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (!signupData.terms) {
      setPasswordError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setPasswordError("");
    alert("Sign Up Successful! Ready for backend integration");
    console.log("Signup Data:", signupData);

    // Reset everything
    setSignupData({ username: "", email: "", password: "", confirmPassword: "", terms: false });
    setShowSignupPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted! Connect your backend here");
    console.log("Login Data:", loginData);
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      {/* ==================== LOGIN FORM ==================== */}
      <div className="form-container login-container">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <img
              src={showLoginPassword ? EyeOff : Eye}
              alt="toggle password"
              className="eye-icon"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
            />
          </div>

          <a href="#" className="forgot-password">
            Forgot your password?
          </a>

          <button type="submit">Login</button>

          <p>
            Don't have an account?{" "}
            <a href="#" onClick={() => setIsSignUp(true)}>
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* ==================== SIGN UP FORM ==================== */}
      <div className="form-container signup-container">
        <form onSubmit={handleSignupSubmit}>
          <h1>Sign Up</h1>

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={signupData.username}
            onChange={handleSignupChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showSignupPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <img
              src={showSignupPassword ? EyeOff : Eye}
              alt="toggle password"
              className="eye-icon"
              onClick={() => setShowSignupPassword(!showSignupPassword)}
            />
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            <img
              src={showConfirmPassword ? EyeOff : Eye}
              alt="toggle confirm password"
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          {passwordError && (
            <p style={{ color: "red", fontSize: "0.9rem", margin: "8px 0" }}>
              {passwordError}
            </p>
          )}



          <button type="submit">Sign Up</button>

          <p>
            Already have an account?{" "}
            <a href="#" onClick={() => setIsSignUp(false)}>
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Sliding Cover */}
      <div className="cover">
        <h2>WELCOME!</h2>
      </div>
    </div>
  );
};

export default LoginSignup;