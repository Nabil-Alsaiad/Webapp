import 'dotenv/config'
import mysql from 'mysql2'

/**
 * MySQL database connection pool
 */
const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'visitor_management'
  })
  .promise()

export default db
