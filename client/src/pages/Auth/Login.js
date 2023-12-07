import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./auth.css";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        // Handle login failure here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle login failure here
    }
  };

  useEffect(() => {
    if (auth?.token) {
      // Redirect to the desired location if the user is already authenticated
      navigate(location.state || "/");
    }
  }, [auth?.token, navigate, location.state]);

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <Link to="/forgot-password">
              <button type="button" className="btn btn-primary">
                Forgot Password
              </button>
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
