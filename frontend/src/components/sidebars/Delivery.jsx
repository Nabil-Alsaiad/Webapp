// eslint-disable-next-line no-unused-vars
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
function DeliverySidebar({ onPageChosen }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [<AccountInformation key={0} extra={true} />, <QRVerification key={1} />];

  useEffect(
    () => onPageChosen(pages[pageIndex]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex]
  );

  return (
    <li>
      <SubpagesContainer onIndexChange={setPageIndex} name={"Profile"} subpagesNames={["Account Information", "QR Verification"]} />
    </li>
  );
}

DeliverySidebar.propTypes = {
  onPageChosen: PropTypes.func.isRequired
};

export default DeliverySidebar;
