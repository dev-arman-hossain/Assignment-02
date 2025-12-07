import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/v1/auth/signup", authController.signUpUser);
router.post("/v1/auth/login", authController.signInUser);

export const authRouter = router;
