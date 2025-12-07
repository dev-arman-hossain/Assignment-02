import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/v1/auth/signup", authController.createUser);
router.post("/v1/auth/login", authController.loginUser);

export const authRouter = router;
