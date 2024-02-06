import { v4 } from "uuid";
import Account from "./account.js";

/**
 * Represents an Admin account.
 * @module Admin
 * @augments Account
 */
export default class Admin extends Account {
  /**
   * Creates a new `Admin` instance.
   * @param {import('../types').ID} id - The ID of the admin.
   * @param {string} name - The name of the admin.
   * @param {import('../types.js').Email} email - The email of the admin.
   * @param {string} password - The password of the admin.
   * @param {import('../types').Phone} phone - The phone number of the admin.
   */
  constructor(id, name, email, password, phone) {
    super("admin", id, name, email, password, phone);
  }

  /**
   * Registers a new account.
   * @param {import('../types.js').AccountTypes} type - The type of the user account.
   * @param {string} name - The name of the user.
   * @param {import('../types.js').Email} email - The email of the user.
   * @param {import('../types').Phone} phone - The phone number of the user.
   * @returns {Account} The newly created account.
   */
  registerAccount(type, name, email, phone) {
    /** @type {import('../types').ID} */
    // @ts-expect-error
    const id = v4();
    console.log(id); // Outputs something like '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

    const tempPassword = "123456";
    const account = new Account(type, id, name, email, tempPassword, phone);
    return account;
  }

  /**
   * Manages the admin's profile.
   */
  manageProfile() {}

  /**
   * Arranges maintenance tasks.
   */
  arrangeMaintenance() {}

  /**
   * Makes an announcement.
   */
  makeAnnouncement() {}
}
