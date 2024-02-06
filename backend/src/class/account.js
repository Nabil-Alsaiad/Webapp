import User from "./data/user";

/**
 * @class
 * @extends User
 * @property {import('../types').Email} email
 * @property {string} password
 * @property {import('../types').AccountTypes} type
 * @property {'success' | 'fail'} loginStatus
 * @property {Date} registerDate
 */
export default class Account extends User {
  /**
   * @param {import('../types').AccountTypes} type
   * @param {import('../types').ID} id
   * @param {string} name
   * @param {import('../types').Email} email
   * @param {string} password
   * @param {import('../types').Phone} phone
   */
  constructor(type, id, name, email, password, phone) {
    super(id, name, phone);
    this.type = type;
    this.email = email;
    this.password = password;
  }

  /**
   * Logs in the account.
   */
  login() {
    try {
      this.loginStatus = "success";
    } catch (err) {
      this.loginStatus = "fail";
    }
  }

  /**
   * Verifies the login status of the account.
   * @returns {boolean} - True if the login is successful, false otherwise.
   */
  verifyLogin() {
    return this.loginStatus === "success";
  }

  /**
   * Logs out the account.
   */
  logout() {
    // this.loginStatus = 'logout'
  }
}
