import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

/**
 * PUBLIC_INTERFACE
 * Entrypoint: mounts the root <App /> component into #app in index.html.
 */
const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
