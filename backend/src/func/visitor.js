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
 * @param {object} data
 * @param {import('../types.js').ID} [data.id]
 * @param {string} [data.name]
 * @param {import('../types.js').Phone} [data.phone]
 * @returns {Promise<object | null>}
 */
async function getOne(data) {
  const conditions = [];
  const values = [];

  const keys = ["id", "name", "phone"];
  keys.forEach((key) => {
    if (data[key]) {
      conditions.push(`${key} = ?`);
      values.push(data[key]);
    }
  });

  if (conditions.length === 0) {
    return null;
  }

  const sql = `SELECT * FROM visitors WHERE ${conditions.join(" AND ")}`;

  const [rows] = await db.query(sql, values);
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
