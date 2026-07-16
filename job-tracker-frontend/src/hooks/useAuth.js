import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  return {
    logout,
    isAuthenticated,
  };
}