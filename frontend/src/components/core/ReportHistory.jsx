// eslint-disable-next-line no-unused-vars
import React from "react";
import propTypes from "prop-types";
import "./ReportHistory.css";

ReportHistory.propTypes = {
  reports: propTypes.arrayOf(
    propTypes.shape({
      type: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      description: propTypes.string.isRequired
    })
  ).isRequired
};

/**
 * @param {object} data
 * @param {import('../../../../types').Report[]} data.reports
 * @returns {React.JSX.Element}
 */
function ReportHistory({ reports }) {
  function getReports() {
    return (
      reports.map((r, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{r.type}</td>
          <td>{r.title}</td>
          <td>{r.description}</td>
        </tr>
      )) || <></>
    );
  }

  return (
    <div>
      <h2>Report History</h2>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{getReports()}</tbody>
      </table>
    </div>
  );
}

export default ReportHistory;
