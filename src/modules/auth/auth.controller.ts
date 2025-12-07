import { Request, Response } from "express";
import { authServices } from "./auth.service";


const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUpUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.signInUser(email, password);

    res.status(201).json({
      success: true,
      message: "User login successfully",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const authController = {
  signUpUser,
  signInUser
};
