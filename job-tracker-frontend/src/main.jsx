import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme"
    >
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);