import db from "../db.js";

/**
 * @param {import('../../../types').Announcement} data
 * @returns {Promise<void>}
 */
export async function createAnnouncement({ title, description }) {
  const sql = `
        INSERT INTO announcements (title, description)
        VALUES (?, ?)
      `;
  const values = [title, description];
  await db.query(sql, values);
}

/**
 * @returns {Promise<import('../../../types').Announcement[] | null>}
 */
export async function getAnnouncements() {
  const sql = "SELECT * FROM announcements";

  const [rows] = await db.query(sql);
  // @ts-expect-error
  return rows;
}
