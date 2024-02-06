import React, { useEffect, useState } from "react";

const ViewUser = () => {
  const [userData, setUserData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedData);
  }, []);

  const handleEditClick = () => {
    setEditMode(!editMode);
    setSelectedCell(null);
  };

  const handleCellClick = (rowIndex, columnIndex) => {
    if (editMode) {
      setSelectedCell({ row: rowIndex, column: columnIndex });
    }
  };

  const handleCellValueChange = (event) => {
    const newValue = event.target.value;
    const updatedData = [...userData];

    if (selectedCell) {
      const { row, column } = selectedCell;
      updatedData[row] = {
        ...updatedData[row],
        [Object.keys(updatedData[row])[column]]: newValue
      };
      setUserData(updatedData);
    }
  };

  const renderTableCell = (rowIndex, columnIndex, value) => {
    if (editMode && selectedCell && selectedCell.row === rowIndex && selectedCell.column === columnIndex) {
      return <input type="text" value={value} onChange={handleCellValueChange} />;
    }

    return <div onClick={() => handleCellClick(rowIndex, columnIndex)}>{value}</div>;
  };

  return (
    <div>
      <h1>User Profiles</h1>
      <button onClick={handleEditClick}>{editMode ? "Done Editing" : "Edit"}</button>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>User Type</th>
            <th>Register Date</th>
            <th>Email Address</th>
            <th>Unit Number</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {Object.values(user).map((value, columnIndex) => (
                <td key={columnIndex}>{renderTableCell(rowIndex, columnIndex, value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
