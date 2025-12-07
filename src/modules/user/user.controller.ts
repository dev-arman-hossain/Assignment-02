import { Request, Response } from "express";
import { userServices } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  // Logic to update a user
  try {
    const { userId } = req.params;
    const authUser = (req as any).user;
    const result = await userServices.updateUser(
      userId as string,
      req.body,
      authUser
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const deletUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deletUser(userId as string);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const userController = {
  getUser,
  updateUser,
  deletUser,
};
