import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch.jsx";

import "./assets/scss/base.scss";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
