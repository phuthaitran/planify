import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./LoginSignup.css";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const handleSignupChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleLoginChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSignupSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      addToast("error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await authApi.signup({
      //   username: signupData.username.trim(),
      //   email: signupData.email.trim(),
      //   password: signupData.password,
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setShowSuccessModal(true);
      setSignupData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Signup error:", err);
      addToast(
        "error",
        err.response?.data?.message || err.message || "Sign up failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [signupData, addToast]);

  const handleModalOk = useCallback(() => {
    setShowSuccessModal(false);
    setIsSignUp(false);
  }, []);

  const handleLoginSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const { data } = await authApi.login({
      //   username: loginData.username.trim(),
      //   password: loginData.password,
      // });
      
      // const token = data?.result?.token || data?.token;
      // if (!token) {
      //   throw new Error("No token received from server");
      // }
      // localStorage.setItem("accessToken", token);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const username = loginData.username;
      addToast("success", `Login successful! Welcome ${username}!`);
      setLoginData({ username: "", password: "" });

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (err) {
      console.error("Login error:", err);
      addToast(
        "error",
        err.response?.data?.message || err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }, [loginData, navigate, addToast]);

  return (
    <div className="auth-wrapper">
      {/* Toast notifications */}
      <div className="toasts">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <h2>Sign Up Successful!</h2>
            <p>You have successfully created an account.<br />Please login to continue.</p>
            <button onClick={handleModalOk}>OK</button>
          </div>
        </div>
      )}

      <div className={`auth-container ${isSignUp ? "active" : ""}`}>
        {/* LOGIN FORM */}
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
              disabled={loading}
            />

            <div className="password-wrapper">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                disabled={loading}
              />
              <FontAwesomeIcon
                icon={showLoginPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </button>

            <p>
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(true); }}>
                Sign up now
              </a>
            </p>
          </form>
        </div>

        {/* SIGN UP FORM */}
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
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
              disabled={loading}
            />

            <div className="password-wrapper">
              <input
                type={showSignupPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
                disabled={loading}
              />
              <FontAwesomeIcon
                icon={showSignupPassword ? faEyeSlash : faEye}
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
                disabled={loading}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Sign Up"}
            </button>

            <p>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(false); }}>
                Login
              </a>
            </p>
          </form>
        </div>

        {/* Sliding Cover */}
        <div className="auth-cover">
          <h2>WELCOME!</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;