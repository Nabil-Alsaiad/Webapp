import db from "../db.js";
import { updateAccountExtra, getAccountExtra, getAccountsExtra } from "./accountExtra.js";
import { convertAccountType } from "../accTypes.js";

/**
 * @param {import('../../../types').FullAccount} data
 * @returns {Promise<void>}
 */
export async function updateAccount({ id, accType, email, password, name, phone, license_id, company_name, vehicle_plate }) {
  if (license_id || company_name || vehicle_plate) {
    updateAccountExtra({ acc_id: id, license_id, company_name, vehicle_plate });
  }

  const sql = `
    UPDATE accounts
    SET accType = ?, email = ?, password = ?, name = ?, phone = ?
    WHERE id = ?
  `;
  const values = [accType, email, password, name, phone, id];
  await db.query(sql, values);
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
    return null;
  }

  const sql = `SELECT * FROM accounts WHERE ${conditions.join(" AND ")}`;

  /** @type {import('../../../types').Account[][]} */
  // @ts-expect-error
  const [rows] = await db.query(sql, values);
  const account = rows[0];

  const accExtra = await getAccountExtra({ acc_id: account.id });
  return { ...account, ...accExtra };
}

/**
 * @returns {Promise<import('../../../types').Account[] | null>}
 */
export async function getAccounts() {
  const accountsExtra = await getAccountsExtra();

  const sql = "SELECT * FROM accounts";

  /** @type {import('../../../types').Account[][]} */
  // @ts-expect-error
  const [rows] = await db.query(sql);
  return rows.map((r) => {
    r.accType = convertAccountType(r.type_id);
    delete r.password;
    delete r.type_id;

    const extra = accountsExtra?.find((e) => e.acc_id === r.id);
    return { ...r, ...extra };
  });
}
