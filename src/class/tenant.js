import Account from './account'

/**
 * Represents a Tenant account.
 * @class
 * @augments Account
 */
export default class Tenant extends Account {
  /**
   * Creates a new Tenant instance.
   * @param {import('../types').ID} id - The ID of the tenant.
   * @param {string} name - The name of the tenant.
   * @param {import('../types').Email} email - The email of the tenant.
   * @param {string} password - The password of the tenant.
   * @param {string} unitNum - The unit number of the tenant.
   * @param {import('../types').Phone} phone - The phone number of the tenant (optional).
   */
  constructor(id, name, email, password, unitNum, phone) {
    super('tenant', id, name, email, password, phone)
    this.unitNum = unitNum
  }
}
