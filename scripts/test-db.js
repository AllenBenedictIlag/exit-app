require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log("Testing database connection with these settings:");
  console.log(`Host: ${process.env.DATABASE_HOST}`);
  console.log(`Database: ${process.env.DATABASE_NAME}`);
  console.log(`User: ${process.env.DATABASE_USER}`);
  console.log(`Password: [SET]`);
  
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  });
  
  try {
    // Test a simple query
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM exit_app');
    console.log('Connection successful!');
    console.log(`Found ${rows[0].count} exit interview records.`);
  } catch (error) {
    console.error('Error connecting to database:', error);
    console.log("Troubleshooting tips:");
    console.log("1. Check if your MySQL server is running");
    console.log("2. Verify the database name is correct");
    console.log("3. Check username and password");
    console.log("4. Make sure the table name is correct");
  } finally {
    connection.end();
  }
}

testConnection();