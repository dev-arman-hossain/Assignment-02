import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });
  return result;
};

const updateUser = async (
  userId: string,
  payload: Record<string, unknown>,
  authUser: any
) => {
  const { name, email, phone, role } = payload;
  const id = parseInt(userId);

  if (authUser.role === "admin" || authUser.id === id) {
    try {
      const updatedRole = authUser.role === "admin" ? (role as any) : authUser.role;

      const result = await prisma.user.update({
        where: { id },
        data: {
          name: name as string,
          email: email as string,
          phone: phone as string,
          role: updatedRole,
        },
      });

      return result;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error("The email is already in use by another user.");
      }
      console.error(error);
      throw new Error(error.message);
    }
  } else {
    throw new Error(
      "Unauthorized action. Customers can only update their own profile."
    );
  }
};

const deleteUser = async (userId: string) => {
  const id = parseInt(userId);

  const activeBooking = await prisma.booking.findFirst({
    where: {
      customer_id: id,
      status: "active",
    },
  });

  if (activeBooking) {
    throw new Error("Cannot delete user with active bookings");
  }

  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
