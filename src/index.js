import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const googleMapScript = document.createElement('script');
googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcyLx7lr6FJDrQYzv6f5tJP8m8q1UjO6E`;
googleMapScript.async = true;
window.document.head.appendChild(googleMapScript);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
