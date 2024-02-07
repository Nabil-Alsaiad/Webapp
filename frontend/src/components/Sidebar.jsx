import React from "react";
import ContractorSidebar from "./sidebars/Contractor";
import DeveloperSidebar from "./sidebars/Developer";
import DeliverySidebar from "./sidebars/Delivery";
import SecuritySidebar from "./sidebars/Security";
import VisitorSidebar from "./sidebars/Visitor";
import TenantSidebar from "./sidebars/Tenant";
import AgentSidebar from "./sidebars/Agent";
import AdminSidebar from "./sidebars/Admin";
import "./Sidebar.css";

function App() {
  const savedAccount = localStorage.getItem("loggedInAccount");
  const loggedInAccount = savedAccount ? JSON.parse(savedAccount) : {};

  const getSidebar = () => {
    switch (loggedInAccount.userType) {
      case "visitor":
        return <VisitorSidebar />;

      case "admin":
        return <AdminSidebar />;

      case "developer":
        return <DeveloperSidebar />;

      case "delivery":
        return <DeliverySidebar />;

      case "contractor":
        return <ContractorSidebar />;

      case "agent":
        return <AgentSidebar />;

      case "security":
        return <SecuritySidebar />;

      case "tenant":
        return <TenantSidebar />;
    }

    throw new Error("Invalid user type");
  };

  return getSidebar();
}

export default App;
