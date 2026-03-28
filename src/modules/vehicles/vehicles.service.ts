import { prisma } from "../../lib/prisma";

const createVehicle = async (payload: Record<string, unknown>) => {
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
      passenger_capacity: passenger_capacity as number,
      registration_number: registration_number as string,
      daily_rent_price: daily_rent_price as any,
      availability_status: availability_status as any,
      image_url: image_url as string,
    },
  });

  return result;
};

const getAllVehicles = async () => {
  const result = await prisma.vehicle.findMany();
  console.log(result);
  return result;
};

const getVehicleById = async (vehicleId: string) => {
  const result = await prisma.vehicle.findUnique({
    where: { id: parseInt(vehicleId) },
  });
  return result;
};

const updateVehicle = async (
  vehicleId: string,
  payload: Record<string, unknown>
) => {
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
    where: { id: parseInt(vehicleId) },
    data: {
      vehicle_name: vehicle_name as string,
      brand: brand as string,
      description: description as string,
      type: type as string,
      fuel_type: fuel_type as string,
      transmission: transmission as string,
      passenger_capacity: passenger_capacity as number,
      registration_number: registration_number as string,
      daily_rent_price: daily_rent_price as any,
      availability_status: availability_status as any,
      image_url: image_url as string,
    },
  });

  return result;
};

const deleteVehicle = async (vehicleId: string) => {
  const id = parseInt(vehicleId);

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
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
