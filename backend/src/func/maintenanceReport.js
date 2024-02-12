import db from "../db.js";

/**
 * @param {object} data
 * @param {number} data.id
 * @returns {Promise<void>}
 */
export async function approveMaintenanceReport({ id }) {
  const sql = `
    UPDATE maintenance_reports
    SET approved = 1
    WHERE id = ?
  `;
  const values = [id];
  await db.query(sql, values);
}

/**
 * @param {import('../../../types.js').MaintenanceReport} data
 * @returns {Promise<void>}
 */
export async function createMaintenanceReport({ maintenance_id, description, resolved, submitted_by, submission_date }) {
  const sql = `
        INSERT INTO maintenance_reports (maintenance_id, description, resolved, submitted_by, submission_date)
        VALUES (?, ?, ?, ?, ?)
      `;

  if (submission_date instanceof Date) {
    submission_date = submission_date.toISOString().split("T")[0];
  }

  if (typeof submitted_by === "string") {
    const searchSQL = `
      SELECT id FROM accounts
      WHERE email = ?
    `;
    const values0 = [submitted_by];
    const [rows] = await db.query(searchSQL, values0);
    submitted_by = rows[0].id;
  }

  const values = [maintenance_id, description, resolved, submitted_by, submission_date];
  await db.query(sql, values);
}

/**
 * @returns {Promise<import('../../../types.js').MaintenanceReport[] | null>}
 */
export async function getMaintenanceReports() {
  const sql = "SELECT * FROM maintenance_reports";

  /** @type {import('../../../types.js').MaintenanceReport[][]} */
  // @ts-expect-error
  const [rows] = await db.query(sql);

  if (Array.isArray(rows)) {
    const emailSQL = `
      SELECT email FROM accounts
      WHERE id = ?
    `;

    const titleSQL = `
      SELECT title FROM maintenances
      WHERE id = ?
    `;

    for (let i = 0; i < rows.length; i++) {
      const values2 = [rows[i].submitted_by];
      /** @type {import('../../../types.js').Account[][]} */
      // @ts-expect-error
      const [rows2] = await db.query(emailSQL, values2);
      rows[i].submitted_by = rows2[0].email;

      //

      const values3 = [rows[i].maintenance_id];
      /** @type {import('../../../types.js').Maintenance[][]} */
      // @ts-expect-error
      const [rows3] = await db.query(titleSQL, values3);
      rows[i].title = rows3[0].title;
    }
  }

  return rows;
}
