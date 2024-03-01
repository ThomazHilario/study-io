import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// import Toaster from sonner
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster duration={2000} position="top-right"/>
    <App />
  </React.StrictMode>,
);
