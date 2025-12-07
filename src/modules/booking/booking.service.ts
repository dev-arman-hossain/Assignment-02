import { pool } from "../../config/db";

interface BookingPayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (payload: BookingPayload) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const dailyRentResult = await pool.query(
    `SELECT daily_rent_price, availability_status, vehicle_name FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (dailyRentResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const daily_rent_price = dailyRentResult.rows[0].daily_rent_price;
  const availability_status = dailyRentResult.rows[0].availability_status;
  const vehicle_name = dailyRentResult.rows[0].vehicle_name || "Unknown";

  if (availability_status === "unavailable") {
    throw new Error("Vehicle is not available for booking");
  }

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  const rent_duration_in_days =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const total_price = rent_duration_in_days * daily_rent_price;

  const status = availability_status === "available" ? "active" : "cancelled";

  try {
    const result = await pool.query(
      `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [customer_id, vehicle_id, startDate, endDate, total_price, status]
    );

    console.log(dailyRentResult.rows);

    return {
      ...result.rows[0],
      vehicle: {
        vehicle_name,
        daily_rent_price,
      },
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Error creating booking");
  }
};

const getAllBooking = async () => {
  const result = await pool.query("SELECT * FROM vehicles");
  return result;
};

const updateBooking = async (
  vehicleId: string,
  payload: Record<string, unknown>
) => {
  console.log(vehicleId);
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBooking,
  updateBooking,
};
