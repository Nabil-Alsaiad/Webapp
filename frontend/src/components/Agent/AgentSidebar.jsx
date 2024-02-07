import React, { useState } from "react";
import ReportPage from "./ReportPage";
import AnnouncementPage from "./AnnouncementPage";

import "./AgentSidebar.css";
import Logout from "../../Logout";
import Logo from "../Logo";

function AgentSidebar() {
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
            <Logo />
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
            <Logout />
          </li>
        </ul>
      </nav>

      {showReportPage && <ReportPage />}
      {showAnnouncementPage && <AnnouncementPage />}
    </div>
  );
}

export default AgentSidebar;
