// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const accTypes = ["admin", "agent", "contractor", "delivery", "security", "developer", "tenant", "visitor"];
const columnNames = ["accType", "name", "email", "phone", "register_date"];

/**
 * @returns {React.JSX.Element}
 */
function ViewAccounts() {
  /** @type {[object[], React.Dispatch<any>]} */
  const [accounts, setAccounts] = useState([]);
  /** @type {[Map<number, object>, React.Dispatch<any>]} */
  const [changes, setChanges] = useState(new Map());
  const [editMode, setEditMode] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ row: 0, column: 0 });

  useEffect(() => {
    fetch("http://localhost:8888/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
      });
  }, []);

  /**
   * @param {number} row
   * @param {number} column
   */
  function handleCellClick(row, column) {
    if (editMode) {
      setSelectedCell({ row: row, column: column });
    }
  }

  /**
   * @param {number} row
   * @param {number} column
   * @param {string} newValue
   */
  function handleCellValueChange(row, column, newValue) {
    const accChange = changes.get(row) || {};
    accChange[column] = newValue;
    changes.set(row, accChange);
  }

  function handleEditModeToggle() {
    setEditMode(!editMode);
    if (!editMode) {
      return;
    }

    changes.forEach((accChange, row) => {
      for (const [column, newValue] of Object.entries(accChange)) {
        const columnName = columnNames[column];

        if (columnName === "accType") {
          if (!accTypes.includes(newValue)) {
            alert("Invalid account type");
            continue;
          }
        } else if (columnName === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(newValue)) {
            alert("Invalid email");
            continue;
          }
        } else if (columnName === "phone") {
          const phonePattern = /^\+?\d{10,11}$/;
          if (!phonePattern.test(newValue)) {
            alert("Invalid contact number");
            continue;
          }
        }

        // @ts-ignore
        const updatedAccount = { ...accounts[row], [columnName]: newValue };

        fetch("http://localhost:8888/account", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedAccount)
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(`Error(${row}, ${column}): ` + data.error);
            } else {
              const updated = [...accounts];
              updated[row] = updatedAccount;
              setAccounts(updated);
            }
          });
      }
    });

    setChanges(new Map());
  }

  function getAccountsHTML() {
    return accounts.map((/** @type {{ [x: string]: any; }} */ acc, /** @type {number} */ row) => {
      const accountRow = columnNames.map((key, column) => {
        if (key === "register_date") {
          return <td key={column}>{new Date(acc[key]).toLocaleDateString()}</td>;
        }

        const oldChange = changes.get(row);
        /** @type {string} */
        let value = oldChange?.[column] || acc[key] || "-";

        const asInput = editMode && selectedCell.row === row && selectedCell.column === column;
        const inside = asInput ? <input type="text" defaultValue={value} onChange={(e) => handleCellValueChange(row, column, e.target.value)} /> : value;

        return (
          <td key={column} onClick={() => handleCellClick(row, column)}>
            {inside}
          </td>
        );
      });

      return (
        <tr key={row}>
          <td>{row + 1}</td>
          {accountRow}
        </tr>
      );
    });
  }

  return (
    <div>
      <h1>Account Profiles</h1>
      <button onClick={handleEditModeToggle}>{editMode ? "Done Editing" : "Edit"}</button>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Account Type</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Register Date</th>
          </tr>
        </thead>
        <tbody>{getAccountsHTML()}</tbody>
      </table>
    </div>
  );
}

export default ViewAccounts;
