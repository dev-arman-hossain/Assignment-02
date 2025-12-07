import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { auth } from "../../middleware/auth";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);
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
     const authUser = (req as any).user;
    const result = await bookingServices.getAllBooking(authUser);
    res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      data: result,
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
   const authUser = (req as any).user; 
   try{
    const { bookingId } = req.params;
    const result = await bookingServices.updateBooking(bookingId as string, req.body , authUser);

    if(!result){
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: result,
    })

  }catch(err: any){
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const bookingController = {
 createBooking,
  getAllBooking,
  updateBooking
};
