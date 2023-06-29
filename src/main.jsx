import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch.jsx";

import "./assets/scss/base.scss";
import "normalize.css";

import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase/config.js";

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
