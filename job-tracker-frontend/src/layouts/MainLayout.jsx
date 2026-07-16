import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#1f2937",
          color: "#ffffff",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            to="/dashboard"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Job Tracker
          </Link>

          <Link
            to="/dashboard"
            style={{
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/applications/new"
            style={{
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Add Application
          </Link>
        </div>

        {/* Right Side */}
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: "#ef4444",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main
        style={{
          padding: "25px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;