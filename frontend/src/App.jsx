import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSidebar from "./components/sidebars/Admin";
import DeveloperSidebar from "./components/sidebars/Developer";
import DeliverySidebar from "./components/sidebars/Delivery";
import ContractorSidebar from "./components/sidebars/Contractor";
import AgentSidebar from "./components/sidebars/Agent";
import SecuritySidebar from "./components/sidebars/Security";
import VisitorSidebar from "./components/sidebars/Visitor";
import TenantSidebar from "./components/sidebars/Tenant";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminSidebar />} />
        <Route path="/developer" element={<DeveloperSidebar />} />
        <Route path="/delivery" element={<DeliverySidebar />} />
        <Route path="/contractor" element={<ContractorSidebar />} />
        <Route path="/agent" element={<AgentSidebar />} />
        <Route path="/security" element={<SecuritySidebar />} />
        <Route path="/visitor" element={<VisitorSidebar />} />
        <Route path="/tenant" element={<TenantSidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
