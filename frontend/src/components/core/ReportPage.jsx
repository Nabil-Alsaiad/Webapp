import React, { useState, useEffect } from "react";
import ReportHistory from "./ReportHistory";
import "./ReportPage.css";

function ReportForm({ submitForm }) {
  const [reportType, setReportType] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleReportTitleChange = (event) => {
    setReportTitle(event.target.value);
  };

  const handleReportDescriptionChange = (event) => {
    setReportDescription(event.target.value);
  };

  const handleCreateReport = () => {
    submitForm(reportType, reportTitle, reportDescription);

    // Clear the form after creating the report
    setReportType("");
    setReportTitle("");
    setReportDescription("");
  };

  return (
    <form>
      <label>
        Report Type:
        <select value={reportType} onChange={handleReportTypeChange}>
          <option value="">Select Report Type</option>
          <option value="Facility">Facility Report</option>
          <option value="Web">Web Report</option>
        </select>
      </label>
      <br />

      <label>
        Report Title:
        <input type="text" value={reportTitle} onChange={handleReportTitleChange} />
      </label>
      <br />

      <label>
        Report Description:
        <textarea value={reportDescription} onChange={handleReportDescriptionChange} />
      </label>
      <br />

      <button type="button" onClick={handleCreateReport}>
        Create Report
      </button>
    </form>
  );
}

const ReportPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Load data from local storage when component mounts
    const reportData = localStorage.getItem("reportData");
    const storedReports = reportData ? JSON.parse(reportData) : [];
    setReports(storedReports);
  }, []);

  const handleCreateReport = (type, title, description) => {
    // Check if both Report Type and Report Title are provided
    if (type && title) {
      // Create a new report object
      const newReport = {
        type,
        title,
        description
      };

      // Update the reports array
      setReports([...reports, newReport]);

      // Store the updated data in local storage
      localStorage.setItem("reportData", JSON.stringify([...reports, newReport]));
    }
  };

  return (
    <div>
      <h1>Report Page</h1>
      <h2>Create New Report</h2>
      <ReportForm submitForm={handleCreateReport} />
      <ReportHistory reports={reports} />
    </div>
  );
};

export default ReportPage;
