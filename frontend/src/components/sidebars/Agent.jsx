// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import ReportPage from "../core/ReportPage";
import AnnouncementPage from "../core/AnnouncementPage";
import PropTypes from "prop-types";

/**
 * @param {object} options
 * @param {Function} options.onPageChosen
 * @returns {React.JSX.Element}
 */
function AgentSidebar({ onPageChosen }) {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (pageIndex === 0) {
      onPageChosen(<ReportPage />);
    } else if (pageIndex === 1) {
      onPageChosen(<AnnouncementPage />);
    }
  }, [pageIndex, onPageChosen]);

  return (
    <>
      <li>
        <a onClick={() => setPageIndex(0)}>
          <i className="fas fa-flag"></i>
          <span className="nav-item">Report Page</span>
        </a>
      </li>

      <li>
        <a onClick={() => setPageIndex(1)}>
          <i className="fas fa-bullhorn"></i>
          <span className="nav-item">Announcement</span>
        </a>
      </li>
    </>
  );
}

AgentSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default AgentSidebar;
