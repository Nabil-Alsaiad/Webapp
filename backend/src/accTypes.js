import db from "./db.js";

const AccountTypes = {};

export async function fetchAccountTypes() {
  try {
    /** @type {{id:number,name:string}[][]} */
    // @ts-expect-error
    const [rows] = await db.query("SELECT * FROM acc_types");
    rows.map((t) => {
      AccountTypes[t.id] = t.name;
      AccountTypes[t.name] = t.id;
    });
  } catch (err) {
    console.error(err);
  }
}

export function convertAccountType(type) {
  return AccountTypes[type];
}
