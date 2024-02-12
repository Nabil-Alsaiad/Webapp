// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./ReportSubmission.css";

function ReportSubmission() {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("Resolved");
  const [description, setDescription] = useState("");

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  function handleFormSubmit(e) {
    e.preventDefault();

    const savedAccount = localStorage.getItem("LoggedInAccount");
    const { id: loggedInId } = savedAccount ? JSON.parse(savedAccount) : { id: -1 };

    /** @type {Omit<import('../../../../types').MaintenanceReport, "id" | "approved">} */
    const newMaintenanceReport = {
      maintenance_id: parseInt(number) - 1,
      resolved: status === "Resolved" ? 1 : 0,
      description,
      submitted_by: loggedInId,
      submission_date: new Date().toLocaleDateString()
    };

    fetch("http://localhost:8888/maintenance-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMaintenanceReport)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        }
      });

    setNumber("");
    setStatus("Resolved");
    setDescription("");
  }

  return (
    <div className="report-submission-container">
      <h2>Maintenance Report Submissions</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="number">Number</label>
        <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />

        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="Resolved">Resolved</option>
          <option value="Not Resolved">Not Resolved</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportSubmission;
