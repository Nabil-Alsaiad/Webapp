import React, { useState, useEffect } from "react";
import "./MaintenanceSchedule.css"; // Import the CSS file for styling

function MaintenanceSchedule() {
  const [maintenanceData, setMaintenanceData] = useState(() => {
    // Retrieve data from localStorage on initial load
    const storedData = localStorage.getItem("maintenanceData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    // Update localStorage whenever maintenanceData changes
    localStorage.setItem("maintenanceData", JSON.stringify(maintenanceData));
  }, [maintenanceData]);

  const handleCellEdit = (rowIndex, property, value) => {
    const updatedData = [...maintenanceData];
    updatedData[rowIndex][property] = value;
    setMaintenanceData(updatedData);
  };

  const handleAddRow = () => {
    setMaintenanceData((prevData) => [
      ...prevData,
      {
        reportNo: "",
        reportTitle: "",
        reportType: "",
        assignedTo: "",
        maintenanceTime: "",
        maintenanceDate: ""
      }
    ]);
  };

  const handleSave = () => {
    // You can perform additional logic before saving if needed
    // For now, just update the state and let useEffect handle localStorage
    setMaintenanceData([...maintenanceData]);
  };

  return (
    <div className="maintenance-schedule-container">
      <h2>Maintenance Schedule</h2>
      <table className="maintenance-table">
        <thead>
          <tr>
            <th>Report No</th>
            <th>Report Title</th>
            <th>Report Type</th>
            <th>Assigned To</th>
            <th>Maintenance Time</th>
            <th>Maintenance Date</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td contentEditable="true" onBlur={(e) => handleCellEdit(rowIndex, "reportNo", e.target.innerText)}>
                {row.reportNo}
              </td>
              <td contentEditable="true" onBlur={(e) => handleCellEdit(rowIndex, "reportTitle", e.target.innerText)}>
                {row.reportTitle}
              </td>
              <td contentEditable="true" onBlur={(e) => handleCellEdit(rowIndex, "reportType", e.target.innerText)}>
                {row.reportType}
              </td>
              <td contentEditable="true" onBlur={(e) => handleCellEdit(rowIndex, "assignedTo", e.target.innerText)}>
                {row.assignedTo}
              </td>
              <td contentEditable="true" onBlur={(e) => handleCellEdit(rowIndex, "maintenanceTime", e.target.innerText)}>
                {row.maintenanceTime}
              </td>
              <td contentEditable="true" onBlur={(e) => handleCellEdit(rowIndex, "maintenanceDate", e.target.innerText)}>
                {row.maintenanceDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <tr>
        <td colSpan={6} className="add-row" onClick={handleAddRow}>
          + Add Row
        </td>
      </tr>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default MaintenanceSchedule;
