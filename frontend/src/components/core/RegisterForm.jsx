import React from "react";
import PropTypes from "prop-types";
import "./RegisterForm.css";

/**
 * @param {object} options
 * @param {boolean} [options.extra]
 * @returns
 */
function RegisterForm({ extra }) {
  function submitForm() {
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : [];

    const userObject = {
      // @ts-expect-error
      userId: document.getElementById("userId")?.value,
      // @ts-expect-error
      name: document.getElementById("name")?.value,
      // @ts-expect-error
      contactNumber: document.getElementById("contactNumber")?.value,
      // @ts-expect-error
      userType: document.getElementById("userType")?.value,
      // @ts-expect-error
      registerDate: document.getElementById("registerDate")?.value,
      // @ts-expect-error
      emailAddress: document.getElementById("emailAddress")?.value,
      // @ts-expect-error
      unitNumber: document.getElementById("unitNumber")?.value
    };

    if (extra) {
      // @ts-expect-error
      userObject.licenceId = document.getElementById("licenceId")?.value;
      // @ts-expect-error
      userObject.carPlateNumber = document.getElementById("carPlateNumber")?.value;
      // @ts-expect-error
      userObject.companyName = document.getElementById("companyName")?.value;
    }

    userData.push(userObject);
    localStorage.setItem("userData", JSON.stringify(userData));

    // Clear the form after submission
    // @ts-expect-error
    document.getElementById("RegisterForm")?.reset();
    alert("Form submitted!");
  }

  return (
    <div>
      <h1>User Information</h1>
      <form id="RegisterForm">
        <label htmlFor="userId">User ID:</label>
        <input type="text" id="userId" name="userId" required />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="text" id="contactNumber" name="contactNumber" required />

        <label htmlFor="userType">User Type:</label>
        <input type="text" id="userType" name="userType" required />

        <label htmlFor="registerDate">Register Date:</label>
        <input type="date" id="registerDate" name="registerDate" required />

        <label htmlFor="emailAddress">Email Address:</label>
        <input type="email" id="emailAddress" name="emailAddress" required />

        <label htmlFor="unitNumber">Unit Number:</label>
        <input type="text" id="unitNumber" name="unitNumber" required />

        {extra && (
          <>
            <label htmlFor="licenseId">License ID:</label>
            <input type="text" id="licenseId" name="licenseId" required />

            <label htmlFor="carPlateNumber">Car Plate Number:</label>
            <input type="text" id="carPlateNumber" name="carPlateNumber" required />

            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" required />
          </>
        )}

        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  extra: PropTypes.bool
};

export default RegisterForm;
