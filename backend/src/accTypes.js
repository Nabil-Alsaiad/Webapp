import db from "./db.js";

const AccountTypes = {};

export async function fetchAccountTypes() {
  try {
    const types = await db.query("SELECT * FROM acc_types");
    const accountTypes = types[0].map((t) => {
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
