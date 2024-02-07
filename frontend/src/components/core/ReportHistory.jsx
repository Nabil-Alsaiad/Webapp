// ReportHistory.jsx
import React from "react";
import "./ReportHistory.css";

function ReportHistory({ reports }) {
  return (
    <div>
      <h2>Report History</h2>
      <table>
        <thead>
          <tr>
            <th>Report No</th>
            <th>Report Title</th>
            <th>Report Type</th>
            <th>Report Description</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{report.title}</td>
              <td>{report.type}</td>
              <td>{report.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportHistory;
