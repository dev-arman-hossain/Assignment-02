import { prisma } from "../../lib/prisma";

interface BookingPayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (payload: BookingPayload) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicle_id },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (vehicle.availability_status === "booked") {
    throw new Error("Vehicle is not available for booking");
  }

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  if (startDate >= endDate) {
    throw new Error("End date must be after start date");
  }

  if (startDate < new Date()) {
    throw new Error("Start date must be in the future");
  }

  // Overlap Check
  const overlapCheck = await prisma.booking.findFirst({
    where: {
      vehicle_id: vehicle_id,
      status: "active",
      OR: [
        {
          rent_start_date: { lte: endDate },
          rent_end_date: { gte: startDate },
        },
      ],
    },
  });

  if (overlapCheck) {
    throw new Error("Vehicle is already booked for these dates");
  }

  const rent_duration_in_days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const total_price = rent_duration_in_days * Number(vehicle.daily_rent_price);

  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        customer_id,
        vehicle_id,
        rent_start_date: startDate,
        rent_end_date: endDate,
        total_price: total_price as any,
        status: "active",
      },
    });

    await tx.vehicle.update({
      where: { id: vehicle_id },
      data: { availability_status: "booked" },
    });

    return booking;
  });

  return {
    ...result,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getAllBookings = async (authUser: any) => {
  if (authUser.role === "admin") {
    return await prisma.booking.findMany({
      include: {
        vehicle: true,
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { rent_start_date: "desc" },
    });
  }

  if (authUser.role === "provider") {
    return await prisma.booking.findMany({
      where: {
        vehicle: {
          owner_id: authUser.id,
        },
      },
      include: {
        vehicle: true,
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { rent_start_date: "desc" },
    });
  }

  return await prisma.booking.findMany({
    where: { customer_id: authUser.id },
    include: { vehicle: true },
    orderBy: { rent_start_date: "desc" },
  });
};

const updateBooking = async (
  bookingId: string,
  payload: Record<string, unknown>,
  authUser: any
) => {
  const { status } = payload;
  const id = parseInt(bookingId);

  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const currentDate = new Date();
  const rentStartDate = new Date(booking.rent_start_date);

  // Logic for Customer
  if (authUser.role === "customer" && currentDate < rentStartDate && booking.customer_id === authUser.id) {
    if (status === "cancelled") {
      return await prisma.booking.update({
        where: { id },
        data: { status: "cancelled" },
      });
    }
    throw new Error("Customers can only cancel bookings before the start date.");
  }

  // Pick Up Logic: Transition to 'ongoing'
  if (
    (authUser.role === "admin" || (authUser.role === "provider" && booking.vehicle_id)) &&
    status === "ongoing" &&
    booking.status === "active"
  ) {
    // Only allow if the provider owns the vehicle
    if (authUser.role === "provider") {
      const vehicle = await prisma.vehicle.findUnique({ where: { id: booking.vehicle_id } });
      if (vehicle?.owner_id !== authUser.id) throw new Error("Unauthorized");
    }

    return await prisma.booking.update({
      where: { id },
      data: { status: "ongoing" },
    });
  }

  // Return Logic: Transition to 'returned'
  if (
    (authUser.role === "admin" || (authUser.role === "provider" && booking.vehicle_id)) &&
    status === "returned" &&
    booking.status === "ongoing"
  ) {
    // Only allow if the provider owns the vehicle
    if (authUser.role === "provider") {
      const vehicle = await prisma.vehicle.findUnique({ where: { id: booking.vehicle_id } });
      if (vehicle?.owner_id !== authUser.id) throw new Error("Unauthorized");
    }

    return await prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id },
        data: { status: "returned" },
      });

      await tx.vehicle.update({
        where: { id: booking.vehicle_id },
        data: { availability_status: "available" },
      });

      return updatedBooking;
    });
  }

  throw new Error("Unauthorized action or invalid status change.");
};


export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
};
