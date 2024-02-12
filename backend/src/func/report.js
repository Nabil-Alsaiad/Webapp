import db from "../db.js";

/**
 * @param {import('../../../types').Report} data
 * @returns {Promise<void>}
 */
export async function createReport({ type, title, description }) {
  const sql = `
        INSERT INTO reports (type, title, description)
        VALUES (?, ?, ?)
      `;
  const values = [type, title, description];
  await db.query(sql, values);
}

/**
 * @returns {Promise<import('../../../types').Report[] | null>}
 */
export async function getReports() {
  const sql = "SELECT * FROM reports";

  const [rows] = await db.query(sql);
  // @ts-expect-error
  return rows;
}
