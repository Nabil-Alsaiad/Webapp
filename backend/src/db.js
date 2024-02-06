import "dotenv/config";
import { createPool } from "mysql2/promise";

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

/**
 * MySQL database connection pool
 */
const db = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: "visitor_management"
});

export default db;
