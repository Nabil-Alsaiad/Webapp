import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Register from "./Register";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Sidebar />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
