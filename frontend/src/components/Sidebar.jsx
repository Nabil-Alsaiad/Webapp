import React, { useState } from "react";
import ContractorSidebar from "./sidebars/Contractor";
import DeveloperSidebar from "./sidebars/Developer";
import DeliverySidebar from "./sidebars/Delivery";
import SecuritySidebar from "./sidebars/Security";
import VisitorSidebar from "./sidebars/Visitor";
import TenantSidebar from "./sidebars/Tenant";
import AgentSidebar from "./sidebars/Agent";
import AdminSidebar from "./sidebars/Admin";
import Logout from "./core/Logout";
import Logo from "./core/Logo";
import "./Sidebar.css";

function App() {
  const savedAccount = localStorage.getItem("loggedInAccount");
  const loggedInAccount = savedAccount ? JSON.parse(savedAccount) : {};

  const [contentPage, setContentPage] = useState();

  const getSidebar = () => {
    switch (loggedInAccount.userType) {
      case "visitor":
        return <VisitorSidebar onPageChosen={setContentPage} />;

      case "admin":
        return <AdminSidebar onPageChosen={setContentPage} />;

      case "developer":
        return <DeveloperSidebar onPageChosen={setContentPage} />;

      case "delivery":
        return <DeliverySidebar onPageChosen={setContentPage} />;

      case "contractor":
        return <ContractorSidebar onPageChosen={setContentPage} />;

      case "agent":
        return <AgentSidebar onPageChosen={setContentPage} />;

      case "security":
        return <SecuritySidebar onPageChosen={setContentPage} />;

      case "tenant":
        return <TenantSidebar onPageChosen={setContentPage} />;
    }

    throw new Error("Invalid user type");
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Logo />
          </li>
          {getSidebar()}
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      {contentPage}
    </div>
  );
}

export default App;
