import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./auth.css";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, newPassword);
      const response = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (response.data.success) {
        console.log(response.data.success);
        console.log("Forgot Password successful");
        navigate("/login");
      } else {
        // toast.error("Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error("Registration Failed");
    }
  };
  //   useEffect(() => {
  //     return () => {
  //       navigate("/login");
  //     };
  //   }, []);

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>ForgotPassword</h1>

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
              type="text"
              className="form-control"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Your Favourite Sport"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
