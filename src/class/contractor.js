import Account from './account'

/**
 * Represents a Contractor account.
 * @class
 * @augments Account
 */
export default class Contractor extends Account {
  /**
   * Creates a new `Contractor` instance.
   * @param {import('../types').ID} id - The ID of the contractor.
   * @param {string} name - The name of the contractor.
   * @param {import('../types').Email} email - The email of the contractor.
   * @param {string} password - The password of the contractor.
   * @param {import('../types').Phone} phone - The phone number of the contractor (optional).
   */
  constructor(id, name, email, password, phone) {
    super('contractor', id, name, email, password, phone)
  }

  /**
   * Performs maintenance on facilities.
   */
  maintainFacilities() {}
}
