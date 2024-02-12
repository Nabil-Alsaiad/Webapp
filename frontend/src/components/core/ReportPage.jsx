// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ReportHistory from "./ReportHistory";
import PropTypes from "prop-types";
import "./ReportPage.css";

function ReportPage() {
  /** @type {[import('../../../../types').Report[], React.Dispatch<React.SetStateAction<import('../../../../types').Report[]>>]} */
  // @ts-expect-error
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/reports", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
      });
  }, []);

  return (
    <div>
      <h1>Report Page</h1>
      <h2>Create New Report</h2>
      <ReportForm onCreateReport={(r) => setReports([...reports, r])} />
      <ReportHistory reports={reports} />
    </div>
  );
}

ReportForm.propTypes = {
  onCreateReport: PropTypes.func.isRequired
};

/**
 * @param {object} data
 * @param {Function} data.onCreateReport
 * @returns
 */
function ReportForm({ onCreateReport }) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreateReport() {
    const types = ["facility", "webapp", "other"];
    if (!types.includes(type)) {
      alert("Must select a type");
      return;
    }

    if (!title) {
      alert("Must enter a title");
      return;
    }

    const newReport = {
      type,
      title,
      description
    };

    const res = await fetch("http://localhost:8888/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReport)
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    onCreateReport(newReport);

    setType("");
    setTitle("");
    setDescription("");
  }

  return (
    <form>
      <label>
        Type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="facility">Facility</option>
          <option value="webapp">Webapp</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Title
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="button" onClick={handleCreateReport}>
        Create
      </button>
    </form>
  );
}

export default ReportPage;
