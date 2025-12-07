import express from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

//user routes
router.get("/v1/users", auth("admin"), userController.getUser);
router.put("/v1/users/:userId", auth("admin" , "customer"), userController.updateUser);
router.delete("/v1/users/:userId", auth("admin"), userController.deletUser);

export const userRouter = router;
