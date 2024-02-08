import React, { useState, useEffect } from "react";
import "./Sidebar.css";

/**
 * @returns {React.JSX.Element}
 */
function Sidebar() {
  const savedAccount = localStorage.getItem("loggedInAccount");
  /** @type {{email?: string, userType?: string}} */
  const { userType } = savedAccount ? JSON.parse(savedAccount) : {};

  const [contentPage, setContentPage] = useState();
  const [SidebarComponent, setSidebarComponent] = useState(null);

  useEffect(() => {
    if (userType) {
      const name = userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
      import(`./sidebars/${name}.jsx`)
        .then((module) => {
          setSidebarComponent(() => module.default);
        })
        .catch((error) => {
          throw new Error(`Invalid user type: ${error}`);
        });
    }
  }, [userType]);

  if (!SidebarComponent) {
    return <></>; // Or a loading spinner, etc.
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
