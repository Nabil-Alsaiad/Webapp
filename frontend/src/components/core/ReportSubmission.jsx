import React, { useState } from "react";
import "./ReportSubmission.css";

function ReportSubmission() {
  const [reportNo, setReportNo] = useState("");
  const [status, setStatus] = useState("Resolved");
  const [overallReport, setOverallReport] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a new report object with user input
    const newReport = {
      reportNo,
      status,
      overallReport
    };

    // Retrieve existing reports from local storage
    const maintenanceReports = localStorage.getItem("maintenanceReports");
    const existingReports = maintenanceReports ? JSON.parse(maintenanceReports) : [];

    // Add the new report to the existing reports
    const updatedReports = [...existingReports, newReport];

    // Save the updated reports in local storage
    localStorage.setItem("maintenanceReports", JSON.stringify(updatedReports));

    // Clear the form fields after submission
    setReportNo("");
    setStatus("Resolved");
    setOverallReport("");
  };

  return (
    <div className="report-submission-container">
      <h2>Maintenance Report Generation</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="reportNo">Report No:</label>
        <input type="text" id="reportNo" value={reportNo} onChange={(e) => setReportNo(e.target.value)} required />

        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="Resolved">Resolved</option>
          <option value="Not Resolved">Not Resolved</option>
        </select>

        <label htmlFor="overallReport">Overall Report:</label>
        <textarea id="overallReport" value={overallReport} onChange={(e) => setOverallReport(e.target.value)} required />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportSubmission;
