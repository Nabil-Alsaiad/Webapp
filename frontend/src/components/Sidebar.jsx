import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import "./Sidebar.css";

Sidebar.propTypes = {
  accType: propTypes.string.isRequired
};

/**
 * @param {object} data
 * @param {string} data.accType
 * @returns {React.JSX.Element}
 */
function Sidebar({ accType }) {
  const [contentPage, setContentPage] = useState();
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

  if (!SidebarComponent) {
    return <></>;
  }

  return (
    <>
      <nav>
        <ul>
          <SidebarComponent onPageChosen={setContentPage} />
        </ul>
      </nav>
      <div className="content">{contentPage}</div>
    </>
  );
}

export default Sidebar;
