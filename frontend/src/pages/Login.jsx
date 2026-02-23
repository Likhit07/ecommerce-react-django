import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("login/", form);
      localStorage.setItem("token", res.data.access);
      navigate("/");
      window.location.reload();
    } catch {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card shadow">
        <h3 className="text-center mb-4">Welcome Back 👋</h3>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <br></br>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <br></br>

          <button className="btn btn-light w-100 fw-bold">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-warning">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}