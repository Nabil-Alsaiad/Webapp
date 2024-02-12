// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import AccountInformation from "../core/AccountInformation";
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
  const pages = [<AccountInformation key={0} />, <ViewUser key={1} />, <ReportPage key={2} />, <AnnouncementPage key={3} />, <MaintenanceSchedule key={4} />, <MaintenanceApproval key={5} />];

  useEffect(
    () => onPageChosen(pages[pageIndex]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex]
  );

  const handleClick1 = (/** @type {number} */ i) => setPageIndex(i);
  const handleClick2 = (/** @type {number} */ i) => setPageIndex(i + 4);

  return (
    <>
      <li>
        <SubpagesContainer onIndexChange={handleClick1} name={"Profile"} subpagesNames={["Account Information", "View Users"]} />
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
        <SubpagesContainer onIndexChange={handleClick2} name={"Maintenance"} iconName={"wrench"} subpagesNames={["Maintenance Schedule", "Maintenance Approval"]} />
      </li>
    </>
  );
}

AdminSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default AdminSidebar;
