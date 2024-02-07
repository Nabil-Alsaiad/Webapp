import React, { useState } from "react";
import RegisterForm from "../core/RegisterForm";
import ViewUser from "./ViewUser";
import ReportPage from "./ReportPage";
import AnnouncementPage from "./AnnouncementPage";
import MaintenanceSchedule from "./MaintenanceSchedule";
import MaintenanceApproval from "./MaintenanceApproval";
import "./AdminSidebar.css";
import Logout from "../core/Logout";
import Logo from "../core/Logo";

function AdminSidebar() {
  const [subPagesVisible, setSubPagesVisible] = useState(false);
  const [subMaintenancePagesVisible, setSubMaintenancePagesVisible] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showReportPage, setShowReportPage] = useState(false);
  const [showAnnouncementPage, setShowAnnouncementPage] = useState(false);
  const [showMaintenanceSchedule, setShowMaintenanceSchedule] = useState(false);
  const [showMaintenanceApproval, setShowMaintenanceApproval] = useState(false);

  const toggleSubPages = () => {
    setSubPagesVisible(!subPagesVisible);
    setSubMaintenancePagesVisible(false);
    setShowRegisterForm(false);
    setShowViewUser(false);
    setShowReportPage(false);
    setShowAnnouncementPage(false);
    setShowMaintenanceSchedule(false);
    setShowMaintenanceApproval(false);
  };

  const toggleSubMaintenancePages = () => {
    setSubMaintenancePagesVisible(!subMaintenancePagesVisible);
    setSubPagesVisible(false);
    setShowRegisterForm(false);
    setShowViewUser(false);
    setShowReportPage(false);
    setShowAnnouncementPage(false);
    setShowMaintenanceSchedule(false);
    setShowMaintenanceApproval(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowViewUser(false);
    setShowReportPage(false);
    setShowMaintenanceSchedule(false);
    setShowMaintenanceApproval(false);
  };

  const toggleViewUser = () => {
    setShowViewUser(!showViewUser);
    setShowRegisterForm(false);
    setShowReportPage(false);
    setShowMaintenanceSchedule(false);
    setShowMaintenanceApproval(false);
  };

  const toggleReportPage = () => {
    setShowReportPage(!showReportPage);
    setSubPagesVisible(false);
    setSubMaintenancePagesVisible(false);
    setShowRegisterForm(false);
    setShowViewUser(false);
    setShowAnnouncementPage(false);
    setShowMaintenanceSchedule(false);
    setShowMaintenanceApproval(false);
  };

  const toggleAnnouncementPage = () => {
    setShowAnnouncementPage(!showAnnouncementPage);
    setSubPagesVisible(false);
    setSubMaintenancePagesVisible(false);
    setShowRegisterForm(false);
    setShowViewUser(false);
    setShowReportPage(false);
    setShowMaintenanceSchedule(false);
    setShowMaintenanceApproval(false);
  };

  const toggleMaintenanceSchedule = () => {
    setShowMaintenanceSchedule(!showMaintenanceSchedule);
    setShowMaintenanceApproval(false);
    setSubPagesVisible(false);
    setShowRegisterForm(false);
    setShowAnnouncementPage(false);
    setShowViewUser(false);
    setShowReportPage(false);
  };

  const toggleMaintenanceApproval = () => {
    setShowMaintenanceApproval(!showMaintenanceApproval);
    setShowMaintenanceSchedule(false);
    setSubPagesVisible(false);
    setShowRegisterForm(false);
    setShowAnnouncementPage(false);
    setShowViewUser(false);
    setShowReportPage(false);
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Logo />
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
            <a href="#" id="viewUserButton" className="sub-page-button" onClick={toggleViewUser}>
              View User
            </a>
          </div>

          <li>
            <a href="#" onClick={toggleReportPage}>
              <i className="fas fa-flag"></i>
              <span className="nav-item">Report Page</span>
            </a>
          </li>

          <li>
            <a href="#" onClick={toggleAnnouncementPage}>
              <i className="fas fa-bullhorn"></i>
              <span className="nav-item">Announcement</span>
            </a>
          </li>

          <li>
            <a href="#" className="maintenance-button" onClick={toggleSubMaintenancePages}>
              <i className="fas fa-wrench"></i>
              <span className="nav-item">Maintenance</span>
            </a>
          </li>

          <div className={`sub-pages-container ${subMaintenancePagesVisible ? "visible" : ""}`}>
            <a href="#" id="maintenanceScheduleButton" className="sub-page-button" onClick={toggleMaintenanceSchedule}>
              Maintenance Schedule
            </a>
            <a href="#" id="maintenanceApprovalButton" className="sub-page-button" onClick={toggleMaintenanceApproval}>
              Maintenance Approval
            </a>
          </div>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      {showRegisterForm && <RegisterForm extra={true} />}
      {showViewUser && <ViewUser />}
      {showReportPage && <ReportPage />}
      {showAnnouncementPage && <AnnouncementPage />}
      {showMaintenanceSchedule && <MaintenanceSchedule />}
      {showMaintenanceApproval && <MaintenanceApproval />}
    </div>
  );
}

export default AdminSidebar;
