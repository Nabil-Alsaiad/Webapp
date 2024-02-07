import React, { useState } from "react";
import RegisterForm from "./VisitorRegisterForm";
import QRVerification from "./QRVerification";
import "./VisitorSidebar.css";
import Logout from "../../Logout";

const VisitorSidebar = () => {
  const [subPagesVisible, setSubPagesVisible] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showQRVerification, setShowQRVerification] = useState(false);

  const toggleSubPages = () => {
    setSubPagesVisible(!subPagesVisible);
    setShowRegisterForm(false);
    setShowQRVerification(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowQRVerification(false);
  };

  const toggleQRVerification = () => {
    setShowQRVerification(!showQRVerification);
    setShowRegisterForm(false);
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <a href="" className="logo">
              <span className="nav-item">Visitor Management System</span>
            </a>
          </li>

          <li>
            <a href="#" className="profile-button" onClick={toggleSubPages}>
              <i className="fas fa-user"></i>
              <span className="nav-item">Profile</span>
            </a>
          </li>

          <div className={`sub-pages-container ${subPagesVisible ? "visible" : ""}`}>
            <a href="#" id="registerUserButton" className="sub-page-button" onClick={toggleRegisterForm}>
              Register User
            </a>
            <a href="#" id="QRVerificationButton" className="sub-page-button" onClick={toggleQRVerification}>
              QR Verification
            </a>
          </div>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      {showRegisterForm && <RegisterForm />}
      {showQRVerification && <QRVerification />}
    </div>
  );
};

export default VisitorSidebar;
