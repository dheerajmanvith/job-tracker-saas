import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("dheeraj1816@gmail.com");
  const [password, setPassword] = useState("123456");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);

      if (response) {
        if (response.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.user)
          );
        }

        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Login
        </h1>

        <p className="text-gray-500 mb-6">
          Sign in to your Job Tracker account
        </p>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded p-3 mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              name="email"
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
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Create account */}

        <div className="mt-6 text-center border-t pt-5">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mt-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Create a new account
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;