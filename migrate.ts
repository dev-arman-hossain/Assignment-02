import { pool } from "./src/config/db";

const migrate = async () => {
  try {
    console.log("Starting DB migration...");
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS brand VARCHAR(100);`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS description TEXT;`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS fuel_type VARCHAR(50);`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS transmission VARCHAR(50);`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS passenger_capacity INTEGER DEFAULT 4;`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS image_url TEXT;`);
    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrate();
