import { Navigate } from "react-router-dom";


export default function ProtectedRoute({
    children,
    adminOnly = false
}) {


    const token =
        localStorage.getItem("access_token");


    const user =
        JSON.parse(
            localStorage.getItem("user")
        );



    // Not logged in
    if (!token) {

        return (
            <Navigate to="/" replace />
        );

    }



    // Admin check
    if (
        adminOnly &&
        user?.role !== "ADMIN"
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }



    return children;

}