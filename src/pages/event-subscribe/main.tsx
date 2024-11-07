import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("event-subscribe")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);