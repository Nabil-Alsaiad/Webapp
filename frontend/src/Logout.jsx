import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("loggedInAccount");
    navigate("/login");
  };

  return (
    <a className="logout" onClick={onClick}>
      <i className="fas fa-sign-out-alt"></i>
      <span className="nav-item">Log out</span>
    </a>
  );
};

export default Logout;
