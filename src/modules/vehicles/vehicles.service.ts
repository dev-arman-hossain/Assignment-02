import { prisma } from "../../lib/prisma";

const createVehicle = async (payload: Record<string, unknown>, ownerId: number) => {
  const {
    vehicle_name,
    brand,
    description,
    type,
    fuel_type,
    transmission,
    passenger_capacity,
    registration_number,
    daily_rent_price,
    availability_status,
    image_url,
  } = payload;

  const result = await prisma.vehicle.create({
    data: {
      vehicle_name: vehicle_name as string,
      brand: brand as string,
      description: description as string,
      type: type as string,
      fuel_type: fuel_type as string,
      transmission: transmission as string,
      passenger_capacity: (passenger_capacity as number) || 4,
      registration_number: registration_number as string,
      daily_rent_price: daily_rent_price as any,
      availability_status: availability_status as any,
      image_url: image_url as string,
      owner_id: ownerId,
    },
  });

  return result;
};

const getAllVehicles = async () => {
  return await prisma.vehicle.findMany();
};

const getMyVehicles = async (ownerId: number) => {
  return await prisma.vehicle.findMany({
    where: { owner_id: ownerId },
  });
};

const getVehicleById = async (vehicleId: string) => {
  return await prisma.vehicle.findUnique({
    where: { id: parseInt(vehicleId) },
  });
};

const updateVehicle = async (
  vehicleId: string,
  payload: Record<string, unknown>,
  authUser: any
) => {
  const id = parseInt(vehicleId);
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  // Ownership check: Only owner or admin can update
  if (authUser.role !== "admin" && vehicle.owner_id !== authUser.id) {
    throw new Error("You are not authorized to update this vehicle.");
  }

  const {
    vehicle_name,
    brand,
    description,
    type,
    fuel_type,
    transmission,
    passenger_capacity,
    registration_number,
    daily_rent_price,
    availability_status,
    image_url,
  } = payload;

  const result = await prisma.vehicle.update({
    where: { id },
    data: {
      vehicle_name: vehicle_name as string,
      brand: brand as string,
      description: description as string,
      type: type as string,
      fuel_type: fuel_type as string,
      transmission: transmission as string,
      passenger_capacity: (passenger_capacity as number) || 4,
      registration_number: registration_number as string,
      daily_rent_price: daily_rent_price as any,
      availability_status: availability_status as any,
      image_url: image_url as string,
    },
  });

  return result;
};

const deleteVehicle = async (vehicleId: string, authUser: any) => {
  const id = parseInt(vehicleId);

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  // Ownership check
  if (authUser.role !== "admin" && vehicle.owner_id !== authUser.id) {
    throw new Error("You are not authorized to delete this vehicle.");
  }

  // Check for active bookings
  const activeBooking = await prisma.booking.findFirst({
    where: {
      vehicle_id: id,
      status: "active",
    },
  });

  if (activeBooking) {
    throw new Error("Cannot delete vehicle with active bookings");
  }

  const result = await prisma.vehicle.delete({
    where: { id },
  });

  return result;
};

export const vehiclesService = {
  createVehicle,
  getAllVehicles,
  getMyVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
