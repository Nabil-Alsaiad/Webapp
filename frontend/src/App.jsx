import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSidebar from "./components/Admin/AdminSidebar";
import DeveloperSidebar from "./components/Developer/DeveloperSidebar";
import DeliverySidebar from "./components/Delivery/DeliverySidebar";
import ContractorSidebar from "./components/Contractor/ContractorSidebar";
import AgentSidebar from "./components/Agent/AgentSidebar";
import SecuritySidebar from "./components/Security/SecuritySidebar";
import VisitorSidebar from "./components/Visitor/VisitorSidebar";
import TenantSidebar from "./components/Tenant/TenantSidebar";
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
