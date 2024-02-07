import React, { useEffect, useState } from "react";
import RegisterForm from "../core/RegisterForm";
import QRVerification from "../core/QRVerification";
import SubpagesContainer from "../core/SubpagesContainer";
import PropTypes from "prop-types";

/**
 * @param {object} options
 * @param {Function} options.onPageChosen
 * @returns {React.JSX.Element}
 */
function DeliverySidebar({ onPageChosen }) {
  const [subpageIndex, setSubpageIndex] = useState(0);

  useEffect(() => {
    if (subpageIndex === 0) {
      onPageChosen(<RegisterForm />);
    } else if (subpageIndex === 1) {
      onPageChosen(<QRVerification />);
    }
  }, [subpageIndex, onPageChosen]);

  return (
    <li>
      <SubpagesContainer onIndexChange={setSubpageIndex} name={"Profile"} subpagesNames={["Register User", "QR Verification"]} />
    </li>
  );
}

DeliverySidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default DeliverySidebar;
