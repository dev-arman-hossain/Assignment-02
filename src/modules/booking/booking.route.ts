import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

//booking routes
router.post("/v1/bookings", bookingController.createBooking);
router.get("/v1/bookings", bookingController.getAllBooking);
router.get("/v1/bookings/:bookingId", bookingController.getAllBooking);
router.put("/v1/bookings/:bookingId", bookingController.updateBooking);

export const bookingRouter = router;
