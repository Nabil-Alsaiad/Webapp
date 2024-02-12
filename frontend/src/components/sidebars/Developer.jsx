// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ReportSubmission from "../core/ReportSubmission";
import MaintenanceSchedule from "../core/MaintenanceSchedule";
import SubpagesContainer from "../core/SubpagesContainer";
import PropTypes from "prop-types";

DeveloperSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

/**
 * @param {object} options
 * @param {Function} options.onPageChosen
 * @returns {React.JSX.Element}
 */
function DeveloperSidebar({ onPageChosen }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [<MaintenanceSchedule key={0} />, <ReportSubmission key={1} />];

  useEffect(
    () => onPageChosen(pages[pageIndex]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex]
  );

  return (
    <li>
      <SubpagesContainer onIndexChange={setPageIndex} name={"Maintenance"} iconName={"wrench"} subpagesNames={["Maintenance Schedule", "Report Submission"]} />
    </li>
  );
}

export default DeveloperSidebar;
