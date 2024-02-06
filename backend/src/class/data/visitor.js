import User from "./user.js";

/**
 * @class
 * @extends User
 */
export default class Visitor extends User {
  /**
   * @param {import('../../types.js').ID} id
   * @param {string} name
   * @param {import('../../types.js').Phone} phone
   */
  constructor(id, name, phone) {
    super(id, name, phone);
  }

  /**
   * @param {object} data
   * @param {import('../../types').ID} data.id
   * @param {string} data.name
   * @param {import('../../types').Phone} data.phone
   */
  static Construct(data) {
    return new Visitor(data.id, data.name, data.phone);
  }
}
