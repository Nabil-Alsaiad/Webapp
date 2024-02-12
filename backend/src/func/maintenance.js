import db from "../db.js";

/**
 * @param {import('../../../types').Maintenance[]} dataArr
 * @returns {Promise<void>}
 */
export async function updateMaintenances(dataArr) {
  const toUpdate = dataArr.filter((d) => d.id);
  const updateSQL = `
        INSERT maintenances
        SET = title = ?, type = ?, assigned_to = ?, maintenance_datetime = ?
        WHERE id = ?
      `;
  runSQL(updateSQL, toUpdate);

  //

  const toInsert = dataArr.filter((d) => !d.id);
  const insertSQL = `
        INSERT INTO maintenances (title, type, assigned_to, maintenance_datetime)
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
      let { title, type, assigned_to, maintenance_datetime } = data;

      if (typeof assigned_to === "string") {
        const values0 = [assigned_to];
        const [rows] = await db.query(searchSQL, values0);
        assigned_to = rows[0].id;
      }

      maintenance_datetime = new Date(maintenance_datetime).toISOString().slice(0, 19).replace("T", " ");

      const values = [title, type, assigned_to, maintenance_datetime];
      return await db.query(sql, values);
    }
  }
}

/**
 * @returns {Promise<import('../../../types').Maintenance[] | null>}
 */
export async function getMaintenances() {
  const sql = "SELECT * FROM maintenances";

  /** @type {import('../../../types.js').Maintenance[][]} */
  // @ts-expect-error
  const [rows] = await db.query(sql);

  if (Array.isArray(rows)) {
    const sql2 = `
      SELECT email FROM accounts
      WHERE id = ?
    `;

    for (let i = 0; i < rows.length; i++) {
      const values2 = [rows[i].assigned_to];
      /** @type {import('../../../types.js').Account[][]} */
      // @ts-expect-error
      const [rows2] = await db.query(sql2, values2);
      rows[i].assigned_to = rows2[0].email;
    }
  }

  return rows;
}
