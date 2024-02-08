import React, { useState, useEffect } from "react";
import "./Sidebar.css";

/**
 * @returns {React.JSX.Element}
 */
function Sidebar() {
  const savedAccount = localStorage.getItem("loggedInAccount");
  /** @type {{email?: string, accountType?: string}} */
  const { accountType } = savedAccount ? JSON.parse(savedAccount) : {};

  const [contentPage, setContentPage] = useState();
  const [SidebarComponent, setSidebarComponent] = useState(null);

  useEffect(() => {
    if (accountType) {
      const name = accountType.charAt(0).toUpperCase() + accountType.slice(1).toLowerCase();
      import(`./sidebars/${name}.jsx`)
        .then((module) => {
          setSidebarComponent(() => module.default);
        })
        .catch((error) => {
          throw new Error(`Invalid user type: ${error}`);
        });
    }
  }, [accountType]);

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
