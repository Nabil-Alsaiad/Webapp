import React, { useEffect, useState } from "react";
import RegisterForm from "../core/RegisterForm";
import ViewUser from "../core/ViewUser";
import ReportPage from "../core/ReportPage";
import AnnouncementPage from "../core/AnnouncementPage";
import MaintenanceSchedule from "../core/MaintenanceSchedule";
import MaintenanceApproval from "../core/MaintenanceApproval";
import PropTypes from "prop-types";
import SubpagesContainer from "../core/SubpagesContainer";

/**
 * @param {object} options
 * @param {Function} options.onPageChosen
 * @returns {React.JSX.Element}
 */
function AdminSidebar({ onPageChosen }) {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (pageIndex === 0) {
      onPageChosen(<RegisterForm extra={true} />);
    } else if (pageIndex === 1) {
      onPageChosen(<ViewUser />);
    } else if (pageIndex === 2) {
      onPageChosen(<ReportPage />);
    } else if (pageIndex === 3) {
      onPageChosen(<AnnouncementPage />);
    } else if (pageIndex === 4) {
      onPageChosen(<MaintenanceSchedule />);
    } else if (pageIndex === 5) {
      onPageChosen(<MaintenanceApproval />);
    }
  }, [pageIndex, onPageChosen]);

  const handleClick1 = (/** @type {number} */ i) => {
    setPageIndex(i);
  };
  const handleClick2 = (/** @type {number} */ i) => {
    setPageIndex(i + 4);
  };

  return (
    <>
      <li>
        <SubpagesContainer onIndexChange={handleClick1} name={"Profile"} subpagesNames={["Register User", "View User"]} />
      </li>
      <li>
        <a onClick={() => setPageIndex(2)}>
          <i className="fas fa-flag"></i>
          <span className="nav-item">Report Page</span>
        </a>
      </li>
      <li>
        <a onClick={() => setPageIndex(3)}>
          <i className="fas fa-bullhorn"></i>
          <span className="nav-item">Announcement</span>
        </a>
      </li>
      <li>
        <SubpagesContainer onIndexChange={handleClick2} name={"Maintenance"} subpagesNames={["Maintenance Schedule", "Maintenance Approval"]} />
      </li>
    </>
  );
}

AdminSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default AdminSidebar;
