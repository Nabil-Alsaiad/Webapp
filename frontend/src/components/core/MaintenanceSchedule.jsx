// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

function MaintenanceSchedule() {
  /** @type {[import('../../../../types').Maintenance[], React.Dispatch<React.SetStateAction<import('../../../../types').Maintenance[]>>]} */
  // @ts-expect-error
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/maintenances", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMaintenances(data);
      });
  }, []);

  /**
   * @param {number} row
   * @param {string} key
   * @param {string} value
   */
  function handleCellEdit(row, key, value) {
    const updatedData = [...maintenances];

    if (key === "type") {
      value = value.trim().toLowerCase();
      if (value !== "facility" && value !== "webapp") {
        value = "Facility";
        alert('Type can only be "Facility" or "Webapp"');
      }
    } else if (key === "maintenance_datetime") {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const date = new Date();
        value = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        alert("Invalid date");
      }
    } else if (key === "assigned_to") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        alert("Invalid email");
        return;
      }
    }

    updatedData[row][key] = value;
    setMaintenances(updatedData);
  }

  function handleAddRow() {
    /** @type {import('../../../../types').Maintenance} */
    const emptyMaintenance = {
      title: "",
      type: "",
      assigned_to: "",
      maintenance_datetime: "",
      maintenance_time: ""
    };
    setMaintenances((prevData) => [...prevData, emptyMaintenance]);
  }

  async function handleSave() {
    const res = await fetch("http://localhost:8888/maintenances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(maintenances)
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    }
  }

  /**
   * @return {React.JSX.Element[]}
   */
  function getMaintenances() {
    return maintenances.map((obj, i) => {
      const date = new Date(obj.maintenance_datetime);
      const dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();

      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td contentEditable="true" onBlur={(e) => handleCellEdit(i, "type", e.target.innerText)}>
            {obj.type}
          </td>
          <td contentEditable="true" onBlur={(e) => handleCellEdit(i, "title", e.target.innerText)}>
            {obj.title}
          </td>
          <td contentEditable="true" onBlur={(e) => handleCellEdit(i, "assigned_to", e.target.innerText)}>
            {obj.assigned_to}
          </td>
          <td contentEditable="true" onBlur={(e) => handleCellEdit(i, "maintenance_datetime", e.target.innerText)}>
            {dateStr}
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="maintenance-schedule-container">
      <h2>Maintenance Schedule</h2>
      <table className="maintenance-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Maintenance Date</th>
          </tr>
        </thead>
        <tbody>{getMaintenances()}</tbody>
      </table>
      <button className="add-row" onClick={handleAddRow}>
        + Add Row
      </button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default MaintenanceSchedule;
