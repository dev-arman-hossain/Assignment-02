import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
    // console.log(result.rows[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      data: result.rows,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "No vehicles found",
      data: [],
    });
  }
};

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicleById(
      req.params.vehicleId as string
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleServices.updateVehicle(
      vehicleId as string,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  // Logic to delete a vehicle
  try{
    const {vehicleId} = req.params;
    const result = await vehicleServices.deleteVehicle(vehicleId as string);
    if(!result){
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result,
    })
  }catch(err: any){
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
