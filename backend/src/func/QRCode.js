import db from "../db.js";

/**
 * @param {{acc_id:import('../../../types').ID}} data
 * @returns {Promise<void>}
 */
export async function createQRCode({ acc_id }) {
  const sql = `
        INSERT INTO qr_codes (acc_id, created_at)
        VALUES (?, NOW())
        ON DUPLICATE KEY UPDATE created_at = NOW()
      `;
  const values = [acc_id];
  await db.query(sql, values);
}

/**
 * @param {import('../../../types').ID} acc_id
 * @returns {Promise<void>}
 */
export async function checkQRCode(acc_id) {
  const sql = `
        SELECT acc_id FROM qr_codes
        WHERE acc_id = ?
      `;
  const values = [acc_id];
  /** @type {{acc_id:import('../../../types').ID}[][]} */
  // @ts-expect-error
  const [rows] = await db.query(sql, values);

  if (!rows[0].acc_id) {
    throw new Error("QR Code not found");
  }
}
