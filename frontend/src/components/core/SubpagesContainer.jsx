import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} options
 * @param {Function} options.onIndexChange
 * @param {string} options.name
 * @param {string[]} options.subpagesNames
 * @param {string} [options.iconName]
 * @returns {React.JSX.Element}
 */
function SubpagesContainer({ onIndexChange, name, subpagesNames, iconName = "user" }) {
  const [visible, toggleVisibility] = useState(false);

  const onMainButtonClick = () => {
    toggleVisibility(!visible);
  };

  return (
    <>
      <a className="container-button" onClick={onMainButtonClick}>
        <i className={`fas fa-${iconName}`}></i>
        <span className="nav-item">{name}</span>
      </a>

      <div className={`sub-pages-container ${visible ? "visible" : ""}`}>
        {subpagesNames.map((/** @type {string} */ subpageName, /** @type {number} */ index) => {
          return (
            <a key={index} id={`${subpageName} Button`} className="sub-page-button" onClick={() => onIndexChange(index)}>
              {subpageName}
            </a>
          );
        })}
      </div>
    </>
  );
}

SubpagesContainer.propTypes = {
  name: PropTypes.string.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  subpagesNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  iconName: PropTypes.string
};

export default SubpagesContainer;
