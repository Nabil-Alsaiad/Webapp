// import { hash, compare } from "bcrypt";
import db from "../db.js";
import { convertAccountType } from "../accTypes.js";

/**
 * @param {import('../types').Email} email
 * @param {import('../types').AccountTypes} [accountType]
 * @returns {Promise<boolean>}
 */
async function checkAccountExists(email, accountType) {
  let sql = `
      SELECT * FROM accounts
      WHERE email = ?
    `;
  /** @type {any[]} */
  const values = [email];

  let accountTypeId;
  if (accountType) {
    sql += " AND type_id = ?";
    accountTypeId = convertAccountType(accountType);
    values.push(accountTypeId);
  }

  try {
    const [rows] = await db.query(sql, values);
    /** @type {import('../types').Email} */
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
 * @param {object} data
 * @param {import('../types').AccountTypes} data.accType
 * @param {import('../types').Email} data.email
 * @param {string} data.password
 * @returns {Promise<void>}
 */
export async function deleteAcc({ accType, email, password }) {
  const exists = await checkAccountExists(email);
  if (!exists) {
    throw new Error("There is no account with that email");
  }

  const typeId = convertAccountType(accType);

  const sql = `
  SELECT * FROM accounts
  WHERE type_id = ?
  AND email = ?
  `;
  const values = [typeId, email];

  const [rows] = await db.query(sql, values);
  /** @type {object} */
  const data = rows[0];

  /** @type {string} */
  const hashedPassword = data.password;
  if (!hashedPassword) {
    throw new Error("Failed to retrieve the password");
  }

  // if (!(await compare(password, hashedPassword))) {
  if (password !== hashedPassword) {
    throw new Error("Could not delete the account. The password is incorrect");
  }

  // await delete from database
  const sql2 = `
    DELETE FROM accounts
    WHERE type_id = ?
    AND email = ?
    AND password = ?
  `;
  const values2 = [typeId, email, hashedPassword];
  await db.query(sql2, values2);
}

/**
 * @param {object} data
 * @param {import('../types').AccountTypes} data.accType
 * @param {import('../types').Email} data.email
 * @param {string} data.password
 * @returns {Promise<void>}
 */
export async function register({ accType, email, password }) {
  const exists = await checkAccountExists(email);
  if (exists) {
    throw new Error("The email already exists");
  }

  const typeId = convertAccountType(accType);

  // const hashedPassword = await hash(password, 10);
  const hashedPassword = password;

  const sql = `
      INSERT INTO accounts (type_id, email, password)
      VALUES (?, ?, ?)
      `;
  const values = [typeId, email, hashedPassword];

  await db.query(sql, values);
}

/**
 * @param {object} data
 * @param {import('../types').Email} data.email
 * @param {string} data.password
 * @returns {Promise<{} | {email:string, accType: string}>} - True if the login is successful, false otherwise.
 */
export async function login({ email, password }) {
  const exists = await checkAccountExists(email);
  if (!exists) {
    throw new Error("There is no account with that email");
  }

  const sql = `
  SELECT * FROM accounts
  WHERE email = ?
  `;
  const values = [email];

  const [rows] = await db.query(sql, values);

  let loggedIn = {};

  // @ts-expect-error
  if (rows.length === 0) {
    return loggedIn;
  }

  // @ts-expect-error
  rows.forEach((r) => {
    /** @type {string} */
    const hashedPassword = r.password;
    if (!hashedPassword) {
      throw new Error("Failed to retrieve the password");
    }

    // if (await compare(password, hashedPassword)) {
    if (password === hashedPassword) {
      loggedIn = {
        email: r.email,
        accType: convertAccountType(r.type_id)
      };
      return; // Stop the loop
    }
  });

  return loggedIn;
}
