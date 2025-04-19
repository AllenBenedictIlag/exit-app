import mysql from 'mysql2/promise';

// Connection pool configuration
const poolConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  database: process.env.DATABASE_NAME || 'exit-app',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(poolConfig);

// Export the pool for use in other files
export default pool; 