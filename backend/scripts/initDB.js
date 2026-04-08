require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDB() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    const dbName = process.env.DB_NAME || 'schooldb';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database '${dbName}' ensured.`);

    await connection.query(`USE \`${dbName}\`;`);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      ) ENGINE=InnoDB;
    `;
    await connection.query(createTableQuery);
    console.log("Table 'schools' ensured.");

  } catch (error) {
    console.error("Error initializing database:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit();
  }
}

initDB();
