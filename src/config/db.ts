import { Pool } from "pg";
import config from ".";

//DB
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL CHECK (char_length(password) >= 6),
            phone VARCHAR(14) UNIQUE NOT NULL,
            role VARCHAR(100) NOT NULL DEFAULT 'customer'
        );
    `);
  console.log("Database initialized");

  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name TEXT NOT NULL,
            type VARCHAR(100) NOT NULL,
            registration_number VARCHAR(100) UNIQUE NOT NULL,
            daily_rent_price DECIMAL NOT NULL CHECK (daily_rent_price > 0),
            availability_status TEXT NOT NULL CHECK (availability_status IN ('available', 'Not available'))
        );
    `);
  console.log("Vehicle table initialized");

  await pool.query(`
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date TIMESTAMP NOT NULL,
    rent_end_date TIMESTAMP NOT NULL CHECK (rent_end_date > rent_start_date),  -- Ensuring rent_end_date is after rent_start_date
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price > 0),  -- Ensuring total_price is positive
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
  );
`);
  console.log("Booking table initialized");
};

export default initDB;
