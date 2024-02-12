// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import "./Sidebar.css";

Sidebar.propTypes = {
  accType: propTypes.string.isRequired,
  onContentPageChange: propTypes.func.isRequired
};

/**
 * @param {object} data
 * @param {string} data.accType
 * @param {(content:React.JSX.Element) => void} data.onContentPageChange
 * @returns {React.JSX.Element}
 */
function Sidebar({ accType, onContentPageChange }) {
  const navigate = useNavigate();
  const [SidebarComponent, setSidebarComponent] = useState(null);

  useEffect(() => {
    if (accType) {
      const name = accType.charAt(0).toUpperCase() + accType.slice(1).toLowerCase();
      import(`./sidebars/${name}.jsx`)
        .then((module) => {
          setSidebarComponent(() => module.default);
        })
        .catch((error) => {
          throw new Error(`Invalid user type: ${error}`);
        });
    }
  }, [accType]);

  const onClick = () => {
    localStorage.removeItem("loggedInAccount");
    navigate("/login");
  };

  if (!SidebarComponent) {
    return <></>;
  }

  return (
    <nav>
      <ul>
        <SidebarComponent onPageChosen={(c) => onContentPageChange(c)} />
      </ul>
      <ul>
        <a className="logout" onClick={onClick}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="nav-item">Log out</span>
        </a>
      </ul>
    </nav>
  );
}

export default Sidebar;
