import React from "react";
import "./VisitorRegisterForm.css";

function VisitorRegisterForm() {
  function submitForm() {
    // Store the form data in localStorage
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : [];
    const userObject = {
      userId: document.getElementById("userId")?.value,
      name: document.getElementById("name")?.value,
      contactNumber: document.getElementById("contactNumber")?.value,
      userType: document.getElementById("userType")?.value,
      registerDate: document.getElementById("registerDate")?.value,
      emailAddress: document.getElementById("emailAddress")?.value,
      unitNumber: document.getElementById("unitNumber")?.value,
      licenceId: document.getElementById("licenceId")?.value,
      carPlateNumber: document.getElementById("carPlateNumber")?.value,
      companyName: document.getElementById("companyName")?.value
    };
    userData.push(userObject);
    localStorage.setItem("userData", JSON.stringify(userData));

    // Clear the form after submission
    document.getElementById("RegisterForm")?.reset();
    alert("Form submitted!");
  }

  return (
    <div>
      <h1>User Information</h1>
      <form id="visitorRegisterForm">
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

        <label htmlFor="licenseId">License ID:</label>
        <input type="text" id="licenseId" name="licenseId" required />

        <label htmlFor="carPlateNumber">Car Plate Number:</label>
        <input type="text" id="carPlateNumber" name="carPlateNumber" required />

        <label htmlFor="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" required />

        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default VisitorRegisterForm;
