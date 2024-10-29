import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("join-form-widget")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
