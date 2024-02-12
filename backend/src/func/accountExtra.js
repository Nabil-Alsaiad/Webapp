import db from "../db.js";

/**
 * @param {import('../../../types').AccountExtra} data
 * @returns {Promise<object | null>}
 */
export async function updateAccountExtra({ acc_id, license_id, company_name, vehicle_plate }) {
  const sql = `
    INSERT INTO accounts_extra (acc_id, license_id, company_name, vehicle_plate)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE license_id = VALUES(license_id), company_name = VALUES(company_name), vehicle_plate = VALUES(vehicle_plate)
  `;
  const values = [license_id, company_name, vehicle_plate, acc_id];
  await db.query(sql, values);
}

/**
 * @param {Partial<import('../../../types').AccountExtra>} data
 * @returns {Promise<import('../../../types').AccountExtra | null>}
 */
export async function getAccountExtra(data) {
  const conditions = [];
  const params = [];

  const keys = ["acc_id", "license_id", "company_id", "vehicle_plate"];
  keys.forEach((key) => {
    if (data[key]) {
      conditions.push(`${key} = ?`);
      params.push(data[key]);
    }
  });

  if (conditions.length === 0) {
    return null;
  }

  const sql = `SELECT * FROM accounts_extra WHERE ${conditions.join(" AND ")}`;

  const [rows] = await db.query(sql, params);
  return rows[0];
}

/**
 * @returns {Promise<import('../../../types').AccountExtra[] | null>}
 */
export async function getAccountsExtra() {
  const sql = "SELECT * FROM accounts_extra";

  /** @type {import('../../../types').AccountExtra[][]} */
  // @ts-expect-error
  const [rows] = await db.query(sql);
  return rows.map((r) => {
    delete r.acc_id;
    return r;
  });
}
