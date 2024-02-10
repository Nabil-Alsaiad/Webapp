import React, { useEffect, useState } from "react";
import AccountInformation from "../core/AccountInformation";
import QRVerification from "../core/QRVerification";
import SubpagesContainer from "../core/SubpagesContainer";
import PropTypes from "prop-types";

/**
 * @param {object} options
 * @param {Function} options.onPageChosen
 * @returns {React.JSX.Element}
 */
function VisitorSidebar({ onPageChosen }) {
  const [subpageIndex, setSubpageIndex] = useState(0);

  useEffect(() => {
    if (subpageIndex === 0) {
      onPageChosen(<AccountInformation />);
    } else if (subpageIndex === 1) {
      onPageChosen(<QRVerification />);
    }
  }, [subpageIndex, onPageChosen]);

  return (
    <li>
      <SubpagesContainer onIndexChange={setSubpageIndex} name={"Profile"} subpagesNames={["Account Information", "QR Verification"]} />
    </li>
  );
}

VisitorSidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default VisitorSidebar;
