/**
 * @class
 * @property {import('../../types').ID} id
 * @property {string} name
 * @property {import('../../types').Phone} phone
 */
export default class User {
  /**
   * @param {import('../../types').ID} id - The user's ID.
   * @param {string} name - The user's name.
   * @param {import('../../types').Phone} phone - The user's phone number.
   */
  constructor(id, name, phone) {
    this.id = id;
    this.name = name;
    this.phone = phone;
  }
}
