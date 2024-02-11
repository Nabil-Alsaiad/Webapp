// eslint-disable-next-line no-unused-vars
import React from "react";

function MaintenanceApproval() {
  const maintenanceReports = [];

  return (
    <div className="maintenance-approval-container">
      <h2>Maintenance Reports</h2>
      <table className="maintenance-approval-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceReports.length === 0 ? (
            <tr>
              <td colSpan={5}>No maintenance reports received.</td>
            </tr>
          ) : (
            maintenanceReports.map((report, index) => (
              <tr key={index}>
                <td>{report.reportNo}</td>
                <td>{report.reportTitle}</td>
                <td>{report.status}</td>
                <td>{report.assignedTo}</td>
                <td>{report.submissionDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MaintenanceApproval;
