import db from "../db.js";

/**
 * @param {import('../../../types').Maintenance[]} dataArr
 * @returns {Promise<void>}
 */
export async function updateMaintenances(dataArr) {
  const toUpdate = dataArr.filter((d) => d.id);
  const updateSQL = `
        INSERT maintenances
        SET = title = ?, type = ?, assigned_to_id = ?, maintenance_date = ?
        WHERE id = ?
      `;
  runSQL(updateSQL, toUpdate);

  //

  const toInsert = dataArr.filter((d) => !d.id);
  const insertSQL = `
        INSERT INTO maintenances (title, type, assigned_to_id, maintenance_date)
        VALUES (?, ?, ?, ?)
      `;
  runSQL(insertSQL, toInsert);

  /**
   * @param {string} sql
   * @param {import("../../../types").Maintenance[]} dataArr
   */
  async function runSQL(sql, dataArr) {
    const searchSQL = `
    SELECT id FROM accounts
    WHERE email = ?
  `;

    for (const data of dataArr) {
      const { title, type, assigned_to, maintenance_date } = data;

      const values0 = [assigned_to];
      const [rows] = await db.query(searchSQL, values0);
      const assigned_to_id = rows[0].id;

      const datetime = new Date(maintenance_date).toISOString().slice(0, 19).replace("T", " ");

      const values = [title, type, assigned_to_id, datetime];
      return await db.query(sql, values);
    }
  }
}

/**
 * @returns {Promise<import('../../../types').Maintenance[] | null>}
 */
export async function getMaintenances() {
  const sql = "SELECT * FROM maintenances";

  const [rows] = await db.query(sql);
  // @ts-expect-error
  return rows;
}
