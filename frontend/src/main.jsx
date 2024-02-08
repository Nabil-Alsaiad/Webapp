import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App.jsx";
// import Register from "./Register";
import Login from "./Login";
import "./main.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />} />
        </>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
