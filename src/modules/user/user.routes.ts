import express from "express";
import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const router = express.Router();

//user routes
router.get("/v1/users", userController.getUser);
router.get("/v1/users/:userId", userController.getSingleUser);
router.put("/v1/users/:userId", userController.updateUser);
router.delete("/v1/users/:userId", userController.deletUser);

export const userRouter = router;
