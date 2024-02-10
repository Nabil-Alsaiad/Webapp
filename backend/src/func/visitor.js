import db from "../db.js";

/**
 * @param {object} data
 * @param {string} data.name
 * @param {import('../types.js').Phone} data.phone
 * @returns {Promise<object | null>}
 */
async function createOne(data) {
  const { name, phone } = data;

  const sql = `
  INSERT INTO visitors (name, phone)
  VALUES (?, ?)
  `;

    await db.query(sql, [name, phone]);
  return await getOne(data);
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

    const [rows] = await db.query(sql, params);
  return rows[0];
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

export const createVisitor = createOne;
export const getVisitor = getOne;
export const getVisitors = getMany;
