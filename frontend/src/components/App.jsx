import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function App() {
  const navigate = useNavigate();
  const savedAccount = localStorage.getItem("loggedInAccount");

  useEffect(() => {
    if (savedAccount === null) {
      navigate("/login");
    }
  }, [navigate, savedAccount]);

  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}

export default App;
