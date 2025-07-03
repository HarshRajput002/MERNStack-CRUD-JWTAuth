import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface props {
  RegiButton: () => void;
}
const LoginForm = ({ RegiButton }: props) => {
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const FormHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        seterror(error.response.data.error);
      } else {
        seterror("Something went wrong");
      }
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url("Try2.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        padding: "1rem",
      }}
    >
      <form
        onSubmit={FormHandle}
        className="bg-light p-5 rounded-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "500px",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <h2 className="text-center text-primary fw-bold mb-4">
          Login to Schedule Tasks
        </h2>

        <div className="mb-3">
          <label
            htmlFor="UserName"
            className="form-label fw-semibold text-primary"
          >
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label fw-semibold text-primary"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          Submit
        </button>

        <p className="text-center mt-3" style={{ fontSize: "0.95rem" }}>
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={RegiButton}
            className="btn btn-link text-primary fw-semibold p-0"
            style={{ textDecoration: "none", fontSize: "0.95rem" }}
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
