import React from "react";

function MaintenanceApproval() {
  const maintenanceReportData = [];

  return (
    <div className="maintenance-approval-container">
      <h2>Maintenance Report Received</h2>
      <table className="maintenance-approval-table">
        <thead>
          <tr>
            <th>Report No</th>
            <th>Report Title</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceReportData.length === 0 ? (
            <tr>
              <td colSpan={5}>No maintenance reports received.</td>
            </tr>
          ) : (
            maintenanceReportData.map((report, index) => (
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
