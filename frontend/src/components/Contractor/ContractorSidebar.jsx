import React, { useState } from "react";
import ReportSubmission from "./ReportSubmission";
import MaintenanceSchedule from "./MaintenanceSchedule";

import "./ContractorSidebar.css";
import Logout from "../../Logout";

const ContractorSidebar = () => {
  const [subPagesVisible, setSubPagesVisible] = useState(false);
  const [subMaintenancePagesVisible, setSubMaintenancePagesVisible] = useState(false);
  const [showMaintenanceSchedule, setShowMaintenanceSchedule] = useState(false);
  const [showReportSubmission, setShowReportSubmission] = useState(false);

  const toggleSubPages = () => {
    setSubPagesVisible(!subPagesVisible);
    setSubMaintenancePagesVisible(false);
    setShowMaintenanceSchedule(false);
    setShowReportSubmission(false);
  };

  const toggleSubMaintenancePages = () => {
    setSubMaintenancePagesVisible(!subMaintenancePagesVisible);
    setSubPagesVisible(false);
    setShowMaintenanceSchedule(false);
    setShowReportSubmission(false);
  };

  const toggleMaintenanceSchedule = () => {
    setShowMaintenanceSchedule(!showMaintenanceSchedule);
    setShowReportSubmission(false);
    setSubPagesVisible(false);
  };

  const toggleReportSubmission = () => {
    setShowReportSubmission(!showReportSubmission);
    setShowMaintenanceSchedule(false);
    setSubPagesVisible(false);
  };

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
            <a href="#" className="maintenance-button" onClick={toggleSubMaintenancePages}>
              <i className="fas fa-wrench"></i>
              <span className="nav-item">Maintenance</span>
            </a>
          </li>

          <div className={`sub-pages-container ${subMaintenancePagesVisible ? "visible" : ""}`}>
            <a href="#" id="maintenanceScheduleButton" className="sub-page-button" onClick={toggleMaintenanceSchedule}>
              Maintenance Schedule
            </a>
            <a href="#" id="ReportSubmissionButton" className="sub-page-button" onClick={toggleReportSubmission}>
              Report Submission
            </a>
          </div>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      {showMaintenanceSchedule && <MaintenanceSchedule />}
      {showReportSubmission && <ReportSubmission />}
    </div>
  );
};

export default ContractorSidebar;
