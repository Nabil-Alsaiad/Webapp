import React, { useState } from "react";
import ReportPage from "./ReportPage";
import AnnouncementPage from "./AnnouncementPage";

import "./TenantSidebar.css";

const TenantSidebar = () => {
  const [subPagesVisible, setSubPagesVisible] = useState(false);
  const [showReportPage, setShowReportPage] = useState(false);
  const [showAnnouncementPage, setShowAnnouncementPage] = useState(false);

  const toggleReportPage = () => {
    setShowReportPage(!showReportPage);
    setSubPagesVisible(false);
    setShowAnnouncementPage(false);
  };

  const toggleAnnouncementPage = () => {
    setShowAnnouncementPage(!showAnnouncementPage);
    setSubPagesVisible(false);
    setShowReportPage(false);
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
            <a href="" className="logout">
              <i className="fas fa-sign-out-alt"></i>
              <span className="nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>

      {showReportPage && <ReportPage />}
      {showAnnouncementPage && <AnnouncementPage />}
    </div>
  );
};

export default TenantSidebar;
