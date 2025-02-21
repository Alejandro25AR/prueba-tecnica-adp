import { createPool } from 'mysql2/promise';
import * as dotenv from 'dotenv'; 

dotenv.config();

console.log(process.env.DB_MYSQL_USER)

export const pool = createPool({
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD, 
  port: process.env.DB_MYSQL_PORT,
  database: process.env.DB_MYSQL_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  queueLimit: 0,
});

async function checkConnection() {
  let poolConnection;
  try {
    poolConnection = await pool.getConnection();
    console.log("✅ MySQL connection successful. ");
  } catch (error) {
    console.error("✘ MySQL connection failed:", error);
  } finally {
    if (poolConnection) poolConnection.release();
  }
}

checkConnection();

/* await pool.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Error de conexión:", err);
    } else {
      console.log("✅ Conectado a MySQL");
      connection.release();
    }
  }); */