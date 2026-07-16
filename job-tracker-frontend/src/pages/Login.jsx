import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("Login Response:", response.data);

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh_token
      );

      console.log(
        "Stored Token:",
        localStorage.getItem("access_token")
      );

      alert("Login Successful!");

      navigate("/add");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error || "Login Failed");
      } else {
        alert("Cannot connect to server.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="submit-btn"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;