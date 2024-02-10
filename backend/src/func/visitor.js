import db from "../db.js";

/**
 * @param {string} name
 * @param {import('../types.js').Phone} phone
 * @returns {Promise<object | null>}
 */
async function registerOne(name, phone) {
  const sql = `
  INSERT INTO visitors (name, phone)
  VALUES (?, ?)
  `;

  try {
    await db.query(sql, [name, phone]);
    return await getOne({ name, phone });
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

/**
 * @param {object} options
 * @param {import('../types.js').ID} [options.id]
 * @param {string} [options.name]
 * @param {import('../types.js').Phone} [options.phone]
 * @returns {Promise<object | null>}
 */
async function getOne(options) {
  const conditions = [];
  const params = [];

  const keys = ["id", "name", "phone"];
  keys.forEach((key) => {
    if (options[key]) {
      conditions.push(`${key} = ?`);
      params.push(options[key]);
    }
  });

  if (conditions.length === 0) {
    return null;
  }

  const sql = `SELECT * FROM visitors WHERE ${conditions.join(" AND ")}`;

  try {
    const [rows] = await db.query(sql, params);
  return rows[0];
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

/**
 * @returns {Promise<object[] | null>}
 */
async function getMany() {
  const sql = "SELECT * FROM visitors";

  const [rows] = await db.query(sql);
  // @ts-expect-error
  return rows;
}

export const registerVisitor = registerOne;
export const getVisitor = getOne;
export const getVisitors = getMany;
