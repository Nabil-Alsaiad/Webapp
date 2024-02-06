// import { hash, compare } from "bcrypt";
import db from "./db.js";
import { Router } from "express";

/**
 * @param {import('./types.d.ts').Email} email
 * @returns {Promise<boolean>}
 */
export async function checkEmailExists(email) {
  const sql = `
      SELECT * FROM accounts WHERE email = ?
    `;
  const values = [email];

  try {
    const data = await db.query(sql, values);
    /** @type {import('./types.d.ts').Email} */
    const storedEmail = data[0][0].email;
    return storedEmail === email;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const registerRouter = Router().post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    await register(email, password);
    res.status(200).json({});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Logs in the account.
 * @param {import('./types').Email} email
 * @param {string} password
 * @returns {Promise<void>}
 */
async function register(email, password) {
  const exists = await checkEmailExists(email);
  if (exists) {
    throw new Error("The email already exists.");
  }

  try {
    // const hashedPassword = await hash(password, 10);
    const hashedPassword = password;

    const sql = `
      INSERT INTO accounts (email, password)
      VALUES (?, ?)
      `;
    const values = [email, hashedPassword];

    await db.query(sql, values);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to register the account.");
  }
}

export const loginRouter = Router().post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loggedIn = await login(email, password);
    res.status(200).json({ loggedIn });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Logs in the account.
 * @param {import('./types').Email} email
 * @param {string} password
 * @returns {Promise<boolean>} - True if the login is successful, false otherwise.
 */
async function login(email, password) {
  const exists = await checkEmailExists(email);
  if (!exists) {
    throw new Error("The given email does not exist.");
  }

  const sql = `
  SELECT a.password
  FROM accounts a 
  WHERE a.email = ?
  `;
  const values = [email];

  try {
    const data = await db.query(sql, values);
    /** @type {string} */
    const hashedPassword = data[0][0].password;
    if (!hashedPassword) {
      throw new Error("Failed to retrieve the password");
    }

    // const isPasswordCorrect = await compare(password, hashedPassword);
    const isPasswordCorrect = password === hashedPassword;
    return isPasswordCorrect;
  } catch (err) {
    console.error(err);
    return false;
  }
}
