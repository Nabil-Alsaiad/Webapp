import React, { useState } from "react";
import ReportSubmission from "./ReportSubmission";
import MaintenanceSchedule from "./MaintenanceSchedule";

import "./ContractorSidebar.css";
import Logout from "../../Logout";
import SubpagesContainer from "../SubpagesContainer";

function ContractorSidebar() {
  const [subpageIndex, setSubpageIndex] = useState(0);

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
            <SubpagesContainer onIndexChange={setSubpageIndex} name={"Maintenance"} subpagesNames={["Maintenance Schedule", "Report Submission"]} />
          </li>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      {subpageIndex === 0 && <MaintenanceSchedule />}
      {subpageIndex === 1 && <ReportSubmission />}
    </div>
  );
}

export default ContractorSidebar;
