// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

function MaintenanceApproval() {
  /** @type {[import('../../../../types').MaintenanceReport[], React.Dispatch<React.SetStateAction<import('../../../../types').MaintenanceReport[]>>]} */
  // @ts-expect-error
  const [maintenanceReports, setMaintenanceReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/maintenance-reports", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMaintenanceReports(data);
      });
  }, []);

  /**
   * @param {number} id
   */
  async function approveReport(id) {
    const res = await fetch("http://localhost:8888/maintenance-report", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    }

    const mr = maintenanceReports.find((mr) => mr.id === id);
    if (!mr) {
      throw new Error("couldn't find maintenance report");
    }

    mr.approved = true;
    setMaintenanceReports([...maintenanceReports]);
  }

  /**
   * @param {boolean} approved
   */
  function getMaintenanceReports(approved) {
    if (maintenanceReports.length === 0) {
      return (
        <tr>
          <td colSpan={5}>No reports available</td>
        </tr>
      );
    }

    return maintenanceReports
      .filter((m) => m.approved == approved)
      .map((m, i) => {
        const date = new Date(m.submission_date);

        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{m.title}</td>
            <td>{m.resolved}</td>
            <td>{m.submitted_by || "-"}</td>
            <td>{date.toLocaleDateString()}</td>
            {!approved && (
              <td>
                <button onClick={() => approveReport(m.id)}>Approve</button>
              </td>
            )}
          </tr>
        );
      });
  }

  return (
    <div className="maintenance-approval-container">
      <div>
        <h2>Pending Reports</h2>
        <table className="maintenance-approval-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Resolved</th>
              <th>Submitted by</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>{getMaintenanceReports(false)}</tbody>
        </table>
      </div>
      <div>
        <h2>Resolved Reports</h2>
        <table className="maintenance-approval-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Type</th>
              <th>Title</th>
              <th>Resolved</th>
              <th>Submitted by</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>{getMaintenanceReports(true)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceApproval;
