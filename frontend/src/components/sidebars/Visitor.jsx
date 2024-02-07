import React, { useState } from "react";
import RegisterForm from "../core/RegisterForm";
import QRVerification from "../core/QRVerification";
import Logout from "../core/Logout";
import SubpagesContainer from "../core/SubpagesContainer";
import Logo from "../core/Logo";

function VisitorSidebar() {
  const [subpageIndex, setSubpageIndex] = useState(0);

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Logo />
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
