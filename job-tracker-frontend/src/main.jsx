import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "./components/theme-provider.jsx";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);