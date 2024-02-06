import Account from "./account";

/**
 * Represents a Developer.
 * @class
 * @augments Account
 */
export default class Developer extends Account {
  /**
   * Creates a new `Developer` instance.
   * @param {import('../types').ID} id - The ID of the developer.
   * @param {string} name - The name of the developer.
   * @param {import('../types').Email} email - The email of the developer.
   * @param {string} password - The password of the developer.
   * @param {import('../types').Phone} phone - The phone number of the developer (optional).
   */
  constructor(id, name, email, password, phone) {
    super("dev", id, name, email, password, phone);
  }

  maintainSoftware() {}
  improveSoftware() {}
}
