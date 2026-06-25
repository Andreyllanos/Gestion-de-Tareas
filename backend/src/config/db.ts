import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async (): Promise<void> => {
  try {
    const client = await pool.connect();

    console.log("✅ PostgreSQL conectado correctamente");

    client.release();
  } catch (error) {
    console.error("❌ Error conectando PostgreSQL");

    console.error(error);

    process.exit(1);
  }
};