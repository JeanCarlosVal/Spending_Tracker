const mysql = require('mysql2/promise');

// Read environment variables
require('dotenv').config();

// Create connection to MySQL database
const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = mysqlPool;

