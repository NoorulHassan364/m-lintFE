import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import AuthContextProvider from "./store/AuthContext";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const user = localStorage.getItem("user");
const admin = localStorage.getItem("admin");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider
      user={user ? JSON.parse(user) : ""}
      admin={admin ? JSON.parse(admin) : ""}
    >
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
