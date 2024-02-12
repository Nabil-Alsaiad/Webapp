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
  const [subpageIndex, setSubpageIndex] = useState(0);

  useEffect(() => {
    if (subpageIndex === 0) {
      onPageChosen(<MaintenanceSchedule />);
    } else if (subpageIndex === 1) {
      onPageChosen(<ReportSubmission />);
    }
  }, [subpageIndex, onPageChosen]);

  return (
    <li>
      <SubpagesContainer onIndexChange={setSubpageIndex} name={"Maintenance"} iconName={"wrench"} subpagesNames={["Maintenance Schedule", "Report Submission"]} />
    </li>
  );
}

ContractorSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default ContractorSidebar;
