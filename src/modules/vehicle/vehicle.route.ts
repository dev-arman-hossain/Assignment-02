import express from "express";
import { vehicleController } from "./vehicle.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

//vehicle routes
router.post("/v1/vehicles", vehicleController.createVehicle);
router.get("/v1/vehicles", vehicleController.getAllVehicles);
router.get("/v1/vehicles/:vehicleId", vehicleController.getVehicleById);
router.put("/v1/vehicles/:vehicleId", vehicleController.updateVehicle);

export const vehicleRouter = router;
