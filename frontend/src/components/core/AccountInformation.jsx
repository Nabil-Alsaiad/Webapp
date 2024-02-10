// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
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
  const loggedInAccount = localStorage.getItem("loggedInAccount");
  let { id } = loggedInAccount ? JSON.parse(loggedInAccount) : { id: -1 };

  useEffect(() => {
    fetch(`http://localhost:8888/account/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setValue("email", data.email);
        setValue("password", data.password);
        setValue("name", data.name);
        setValue("phone", data.phone);

        setValue("register-date", new Date(data.register_date).toString());

        if (extra) {
          setValue("licenseId", data.license_id);
          setValue("companyName", data.company_name);
          setValue("vehiclePlateNumber", data.vehicle_plate);
        }
      });
  }, [extra, id]);

  function submitForm() {
    const accInfo = {
      id: id,
      name: getValue("name"),
      phone: getValue("phone").trim().replace(/-/g, ""),
      email: getValue("email"),
      password: getValue("password")
    };

    if (extra) {
      accInfo.license_id = getValue("license-id");
      accInfo.vehicle_plate = getValue("vehicle-plate-number");
      accInfo.company_name = getValue("company-name");
    }

    fetch("http://localhost:8888/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accInfo)
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert("Account Updated!");
      } else if (res.status >= 400 && res.status < 600) {
        res.json().then((data) => {
          alert("Error: " + data?.error);
        });
      }
    });
  }

  return (
    <div>
      <h1>Account Information</h1>
      <form id="account-information">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="phone">Contact Number</label>
        <input type="text" id="phone" name="phone" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        {extra && (
          <>
            <label htmlFor="license-id">License ID</label>
            <input type="text" id="license-id" name="license-id" required />

            <label htmlFor="vehicle-plate-number">Vehicle Plate Number</label>
            <input type="text" id="vehicle-plate-number" name="vehicle-plate-number" required />

            <label htmlFor="company-name">Company Name</label>
            <input type="text" id="company-name" name="company-name" required />
          </>
        )}

        <label htmlFor="register-date">Register Date</label>
        <input type="register-date" id="register-date" name="register-date" required />

        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
}

/**
 * @param {string} id
 * @param {string | undefined} value
 */
function setValue(id, value) {
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  // @ts-expect-error
  const el = document.getElementById(id);
  if (el) {
    el.value = value || "";
  }
}

/**
 * @param {string} id
 * @returns {string}
 */
function getValue(id) {
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  // @ts-expect-error
  const el = document.getElementById(id);
  return el.value || "";
}

export default AccountInformation;
