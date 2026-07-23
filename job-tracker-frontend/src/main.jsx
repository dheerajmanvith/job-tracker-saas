import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "./i18n"; // Initialize i18next

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import setupAxiosInterceptors from "./utils/axiosInterceptor";

// Initialize Axios interceptors
setupAxiosInterceptors();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme"
    >
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>

        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);