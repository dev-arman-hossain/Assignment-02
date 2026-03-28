import {  Router } from 'express';
import { vehiclesController } from './vehicles.controller';
import auth from '../../middleware/auth';


const router = Router();

router.post("/v1/vehicles" , auth("admin", "provider") , vehiclesController.createVehicle);
router.get("/v1/vehicles/my-vehicles" , auth("admin", "provider") , vehiclesController.getMyVehicles);
router.get("/v1/vehicles" ,  vehiclesController.getAllVehicles);
router.get("/v1/vehicles/:vehicleId" , vehiclesController.getVehicleById);
router.put("/v1/vehicles/:vehicleId" ,auth("admin", "provider"), vehiclesController.updateVehicle);
router.delete("/v1/vehicles/:vehicleId" ,auth("admin", "provider") ,vehiclesController.deleteVehicle);

export const vehiclesRouter = router;