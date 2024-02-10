import db from "../db.js";

/**
 * @param {string} name
 * @param {import('../types').Phone} phone
 * @param {import('../types').Email} email
 * @param {string} license_id
 * @param {import('../types').ID} company_id
 * @returns {Promise<object | null>}
 */
async function registerOne(name, phone, email, license_id, company_id) {
  const sql = `
  INSERT INTO deliveries (name, phone, email, license_id, company_id)
  VALUES (?, ?, ?, ?, ?)
  `;

  await db.query(sql, [name, phone, email, license_id, company_id]);
  return await getOne({ name, phone, email, license_id, company_id });
}

/**
 * @param {object} options
 * @param {import('../types.js').ID} [options.id]
 * @param {string} [options.name]
 * @param {import('../types.js').Phone} [options.phone]
 * @param {import('../types').Email} [options.email]
 * @param {string} [options.license_id]
 * @param {import('../types').ID} [options.company_id]
 * @returns {Promise<object | null>}
 */
async function getOne(options) {
  const conditions = [];
  const params = [];

  const keys = ["id", "name", "phone", "email", "license_id", "company_id"];
  keys.forEach((key) => {
    if (options[key]) {
      conditions.push(`${key} = ?`);
      params.push(options[key]);
    }
  });

  if (conditions.length === 0) {
    return null;
  }

  const sql = `SELECT * FROM deliveries WHERE ${conditions.join(" AND ")}`;

  const [rows] = await db.query(sql, params);
  return rows[0];
}

/**
 * @returns {Promise<object[] | null>}
 */
async function getMany() {
  const sql = "SELECT * FROM deliveries";

  const [rows] = await db.query(sql);
  // @ts-expect-error
  return rows;
}

export const registerDelivery = registerOne;
export const getDelivery = getOne;
export const getDeliveries = getMany;
