// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import ReportSubmission from "../core/ReportSubmission";
import MaintenanceSchedule from "../core/MaintenanceSchedule";
import SubpagesContainer from "../core/SubpagesContainer";
import PropTypes from "prop-types";

/**
 * @param {object} options
 * @param {Function} options.onPageChosen
 * @returns {React.JSX.Element}
 */
function ContractorSidebar({ onPageChosen }) {
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

ContractorSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default ContractorSidebar;
