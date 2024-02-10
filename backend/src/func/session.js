import db from "../db.js";
import { convertAccountType } from "../accTypes.js";

/**
 * @param {import('../../../types').Email} email
 * @param {import('../../../types').AccountTypes} [accType]
 * @returns {Promise<boolean>}
 */
async function checkAccountExists(email, accType) {
  let sql = `
      SELECT * FROM accounts
      WHERE email = ?
    `;
  /** @type {any[]} */
  const values = [email];

  let accountTypeId;
  if (accType) {
    sql += " AND type_id = ?";
    accountTypeId = convertAccountType(accType);
    values.push(accountTypeId);
  }

  try {
    const [rows] = await db.query(sql, values);
    /** @type {import('../../../types').Email} */
    const storedEmail = rows[0].email;
    let exists = storedEmail === email;

    if (accountTypeId) {
      const storedAccountTypeId = rows[0].type_id;
      exists &&= storedAccountTypeId === accountTypeId;
    }

    return exists;
  } catch (err) {
    console.error(err);
    return false;
  }
}
/**
 * @param {import('../../../types').Account} data
 * @returns {Promise<void>}
 */
export async function deleteAcc({ id, accType, email }) {
  const exists = await checkAccountExists(email);
  if (!exists) {
    throw new Error("There is no account with that email");
  }

  const typeId = convertAccountType(accType);

  const sql2 = `
    DELETE FROM accounts
    WHERE id = ?
    AND type_id = ?
    AND email = ?
  `;
  const values2 = [id, typeId, email];
  await db.query(sql2, values2);
}

/**
 * @param {import('../../../types').Account} data
 * @returns {Promise<void>}
 */
export async function register({ accType, email, password }) {
  const exists = await checkAccountExists(email);
  if (exists) {
    throw new Error("The email already exists");
  }

  const typeId = convertAccountType(accType);

  const sql = `
      INSERT INTO accounts (type_id, email, password)
      VALUES (?, ?, ?)
      `;
  const values = [typeId, email, password];
  await db.query(sql, values);
}

/**
 * @param {import('../../../types').Account} data
 * @returns {Promise<{} | import('../../../types').Account>} - True if the login is successful, false otherwise.
 */
export async function login({ email, password }) {
  const exists = await checkAccountExists(email);
  if (!exists) {
    throw new Error("There is no account with that email");
  }

  const sql = `
    SELECT * FROM accounts
    WHERE email = ?
    AND password = ?
  `;
  const values = [email, password];

  const [rows] = await db.query(sql, values);

  // @ts-expect-error
  if (rows.length === 0) {
    return {};
  }

  const r = rows[0];
  return {
    id: r.id,
    email: r.email,
    accType: convertAccountType(r.type_id)
  };
}
