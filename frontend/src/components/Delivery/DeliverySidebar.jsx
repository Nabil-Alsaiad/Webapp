import React, { useState } from "react";
import RegisterForm from "./VisitorRegisterForm";
import QRVerification from "./QRVerification";
import "./DeliverySidebar.css";
import Logout from "../../Logout";
import SubpagesContainer from "../SubpagesContainer";
import Logo from "../Logo";

function DeliverySidebar() {
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

export default DeliverySidebar;
