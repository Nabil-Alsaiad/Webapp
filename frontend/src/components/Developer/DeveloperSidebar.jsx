import React, { useState } from "react";
import ReportSubmission from "./ReportSubmission";
import MaintenanceSchedule from "./MaintenanceSchedule";
import "./DeveloperSidebar.css";
import Logout from "../../Logout";
import SubpagesContainer from "../SubpagesContainer";
import Logo from "../Logo";

function DeveloperSidebar() {
  const [subpageIndex, setSubpageIndex] = useState(0);

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Logo />
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

export default DeveloperSidebar;
