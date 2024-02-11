import db from "../db.js";
import { convertAccountType } from "../accTypes.js";

/**
 * @param {import('../../../types').FullAccount} data
 * @returns {Promise<void>}
 */
export async function updateAccount(data) {
  const toUpdate = [];
  const values = [];

  const keys = ["accType", "email", "password", "name", "phone"];
  keys.forEach((key) => {
    if (data[key]) {
      if (key === "accType") {
        toUpdate.push("type_id = ?");
        values.push(convertAccountType(data[key]));
      } else {
        toUpdate.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
  });

  if (toUpdate.length === 0) {
    throw new Error("No data to update");
  }

  const sql = `
    UPDATE accounts
    SET ${toUpdate.join(", ")}
    WHERE id = ?
  `;

  await db.query(sql, [...values, data.id]);
}

/**
 * @param {Partial<import('../../../types').Account>} data
 * @returns {Promise<import('../../../types').Account | null>}
 */
export async function getAccount(data) {
  const conditions = [];
  const values = [];

  const keys = ["id", "accType", "email", "name", "phone"];
  keys.forEach((key) => {
    if (data[key]) {
      conditions.push(`${key} = ?`);
      values.push(data[key]);
    }
  });

  if (conditions.length === 0) {
    throw new Error("No data to get");
  }

  const sql = `SELECT * FROM accounts WHERE ${conditions.join(" AND ")}`;

  const [rows] = await db.query(sql, values);
  return rows[0];
}

/**
 * @returns {Promise<import('../../../types').Account[] | null>}
 */
export async function getAccounts() {
  const sql = "SELECT * FROM accounts";

  const [rows] = await db.query(sql);
  // @ts-expect-error
  return rows.map((r) => {
    r.accType = convertAccountType(r.type_id);
    delete r.password;
    delete r.type_id;
    return r;
  });
}
