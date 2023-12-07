import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "../../style/AuthStyle.css";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  // const [registrationSuccess, setRegistrationSuccess] = useState(false);
  // const navigate = useNavigate;
  const navigate = useNavigate();

  // Form submission function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password, phone, address, answer);
      const response = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (response.data.success) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        // toast.error("Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration Failed");
    }
  };

  useEffect(() => {
    return () => {
      // navigate("/login");
    };
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register Now</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
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
            <input
              type="number"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
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
              placeholder="What is Your Favourite Sports"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
