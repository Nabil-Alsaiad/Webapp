import React, { useState } from "react";
import RegisterForm from "./VisitorRegisterForm";
import QRVerification from "./QRVerification";
import "./VisitorSidebar.css";
import Logout from "../../Logout";
import SubpagesContainer from "../SubpagesContainer";

function VisitorSidebar() {
  const [subpageIndex, setSubpageIndex] = useState(0);

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <a className="logo">
              <span className="nav-item">Visitor Management System</span>
            </a>
          </li>

          <li>
            <SubpagesContainer onIndexChange={setSubpageIndex} name={"Profile"} subpagesNames={["Register User", "QR Verification"]} />
          </li>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      {subpageIndex === 0 && <RegisterForm />}
      {subpageIndex === 1 && <QRVerification />}
    </div>
  );
}

export default VisitorSidebar;
