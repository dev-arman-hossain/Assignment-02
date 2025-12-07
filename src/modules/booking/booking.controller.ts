import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  // Logic to create a booking
  try {
    const result = await bookingServices.createBooking(req.body);

    console.log(result);
    // Send the response once
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBooking();
    res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      data: result.rows,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "No vehicles found",
      data: [],
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const result = await bookingServices.updateBooking(
      bookingId as string,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const bookingController = {
 createBooking,
  getAllBooking,
  updateBooking
};
