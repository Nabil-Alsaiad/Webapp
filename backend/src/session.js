// import { hash, compare } from "bcrypt";
import { Router } from "express";
import db from "./db.js";
import { convertAccountType } from "./accTypes.js";

/**
 * @param {import('./types.d.ts').Email} email
 * @param {import('./types.d.ts').AccountTypes} [accountType]
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
    const data = await db.query(sql, values);
    /** @type {import('./types.d.ts').Email} */
    const storedEmail = data[0][0].email;
    let exists = storedEmail === email;

    if (accountTypeId) {
      const storedAccountTypeId = data[0][0].type_id;
      exists &&= storedAccountTypeId === accountTypeId;
    }

    return exists;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const deleteRouter = Router().post("/delete", async (req, res) => {
  const { accType, email, password } = req.body;
  try {
    await deleteAcc(accType, email, password);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

/**
 * @param {import('./types').AccountTypes} accType
 * @param {import('./types').Email} email
 * @param {string} password
 * @returns {Promise<void>}
 */
async function deleteAcc(accType, email, password) {
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

  const packet = await db.query(sql, values);
  /** @type {object} */
  const data = packet[0][0];

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

export const registerRouter = Router().post("/register", async (req, res) => {
  const { accType, email, password } = req.body;
  try {
    await register(accType, email, password);
    res.status(200).json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

/**
 * @param {import('./types').AccountTypes} accType
 * @param {import('./types').Email} email
 * @param {string} password
 * @returns {Promise<void>}
 */
async function register(accType, email, password) {
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

export const loginRouter = Router().post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loggedIn = await login(email, password);
    res.status(200).json(loggedIn);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

/**
 * Logs in the account.
 * @param {import('./types').Email} email
 * @param {string} password
 * @returns {Promise<{} | {email:string, accType: string}>} - True if the login is successful, false otherwise.
 */
async function login(email, password) {
  const exists = await checkAccountExists(email);
  if (!exists) {
    throw new Error("There is no account with that email");
  }

  const sql = `
  SELECT * FROM accounts
  WHERE email = ?
  `;
  const values = [email];

  const packet = await db.query(sql, values);
  /** @type {object[]} */
  // @ts-expect-error
  const data = packet[0];

  let loggedIn = {};

  if (data.length === 0) {
    return loggedIn;
  }

  data.forEach((r) => {
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
