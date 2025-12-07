import express from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

//booking routes
router.post("/v1/bookings", auth("admin","customer"), bookingController.createBooking);
router.get("/v1/bookings", auth("admin", "customer"), bookingController.getAllBooking);
router.put("/v1/bookings/:bookingId", auth("admin", "customer"), bookingController.updateBooking);

export const bookingRouter = router;
