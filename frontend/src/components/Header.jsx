import React from "react";
import Logo from "./core/Logo";
import Logout from "./core/Logout";

/**
 * @returns {React.JSX.Element}
 */
function Header() {
  return (
    <header>
      <>
        <Logo />
        <Logout />
      </>
    </header>
  );
}

export default Header;
