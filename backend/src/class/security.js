import Account from "./account";

/**
 * Represents a Security class that extends the Account class.
 * @class
 * @augments Account
 */
export default class Security extends Account {
  /**
   * Creates an instance of the Security class.
   * @param {import('../types').ID} id - The ID of the security account.
   * @param {string} name - The name of the security account.
   * @param {import('../types').Email} email - The email of the security account.
   * @param {string} password - The password of the security account.
   * @param {import('../types').Phone} phone - The phone number of the security account (optional).
   */
  constructor(id, name, email, password, phone) {
    super("security", id, name, email, password, phone);
  }

  /**
   * Registers a visitor.
   */
  registerVisitor() {}

  /**
   * Checks the type of visitor.
   */
  checkVisitorType() {}

  /**
   * Files complaints.
   */
  fileComplaints() {}

  /**
   * Submits reports.
   */
  submitReports() {}

  /**
   * Generates a QR pass.
   */
  generateQRPass() {}
}
