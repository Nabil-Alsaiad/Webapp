import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./AccountInformation.css";

AccountInformation.propTypes = {
  extra: PropTypes.bool
};

/**
 * @param {object} options
 * @param {boolean} [options.extra]
 * @returns {React.JSX.Element}
 */
function AccountInformation({ extra }) {
  useEffect(() => {
    const loggedInAccount = localStorage.getItem("loggedInAccount");
    const { accType, email } = loggedInAccount ? JSON.parse(loggedInAccount) : { accType: "", email: "" };

    fetch("http://localhost:8888/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accType,
        email
      })
    })
      .then((res) => res.json())
      .then(({ email, password, name, phone, licenceId, vehiclePlateNumber, companyName }) => {
        // @ts-expect-error
        document.getElementById("name").value = name;
        // @ts-expect-error
        document.getElementById("contactNumber").value = phone;
        // @ts-expect-error
        document.getElementById("email").value = email;
        // @ts-expect-error
        document.getElementById("password").value = password;

        if (extra) {
          // @ts-expect-error
          document.getElementById("licenceId").value = licenceId;
          // @ts-expect-error
          document.getElementById("vehiclePlateNumber").value = vehiclePlateNumber;
          // @ts-expect-error
          document.getElementById("companyName").value = companyName;
        }
      });
  }, [extra]);

  function submitForm() {
    const accInfo = {
      // @ts-expect-error
      name: document.getElementById("name")?.value,
      // @ts-expect-error
      contactNumber: document.getElementById("contactNumber")?.value,
      // @ts-expect-error
      email: document.getElementById("email")?.value,
      // @ts-expect-error
      password: document.getElementById("password")?.value
    };

    if (extra) {
      // @ts-expect-error
      accInfo.licenceId = document.getElementById("licenceId")?.value;
      // @ts-expect-error
      accInfo.carPlateNumber = document.getElementById("vehiclePlateNumber")?.value;
      // @ts-expect-error
      accInfo.companyName = document.getElementById("companyName")?.value;
    }

    fetch("http://localhost:8888/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accInfo)
    }).then((res) => {
      if (res.status > 200 && res.status < 300) {
        alert("Form submitted!");
      } else if (res.status > 400 && res.status < 600) {
        alert("Error submitting form");
      }
    });
  }

  return (
    <div>
      <h1>Account Information</h1>
      <form id="AccountInformation">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="contactNumber">Contact Number</label>
        <input type="text" id="contactNumber" name="contactNumber" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        {extra && (
          <>
            <label htmlFor="licenseId">License ID</label>
            <input type="text" id="licenseId" name="licenseId" required />

            <label htmlFor="vehiclePlateNumber">Vehicle Plate Number</label>
            <input type="text" id="vehiclePlateNumber" name="vehiclePlateNumber" required />

            <label htmlFor="companyName">Company Name</label>
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

export default AccountInformation;
