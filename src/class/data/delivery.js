import User from './user.js'

// register_date DATETIME NOT NULL

/**
 * @class
 * @extends User
 * @property {number} _ic
 * @property {import('../../types').ID} _company_id
 */
export default class Delivery extends User {
  /**
   * @param {import('../../types').ID} id
   * @param {string} name
   * @param {import('../../types').Phone} phone
   * @param {import('../../types').Email} email
   * @param {string} license_id
   * @param {import('../../types').ID} company_id
   */
  constructor(id, name, phone, email, license_id, company_id) {
    super(id, name, phone)
    this.email = email
    this.license_id = license_id
    this.company_id = company_id
  }

  /**
   * @param {object} data
   * @param {import('../../types').ID} data.id
   * @param {string} data.name
   * @param {import('../../types').Phone} data.phone
   * @param {import('../../types').Email} data.email
   * @param {string} data.license_id
   * @param {import('../../types').ID} data.company_id
   */
  static Construct(data) {
    return new Delivery(
      data.id,
      data.name,
      data.phone,
      data.email,
      data.license_id,
      data.company_id
    )
  }
}
