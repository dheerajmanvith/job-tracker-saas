import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000";

      await axios.post(
        `${API_URL}/api/v2/auth/register`,
        {
          username: name,
          email,
          password,
        }
      );

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 mb-6">
          Create your Job Tracker account
        </p>

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 bg-green-50 border border-green-200 rounded p-3 mb-4">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="block mb-1 font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded w-full"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <div className="mt-6 text-center border-t pt-5">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;