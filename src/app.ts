import express, { Request, Response } from "express";

import initDB from "./config/db";
import morgan from "morgan";
import { userRouter } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { vehicleRouter } from "./modules/vehicle/vehicle.route";
import { bookingRouter } from "./modules/booking/booking.route";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

initDB();

// routes
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", vehicleRouter);
app.use("/api", bookingRouter);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello! Next Level Developer!");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
