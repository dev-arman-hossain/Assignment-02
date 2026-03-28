import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { prisma } from "../../lib/prisma";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await prisma.user.create({
    data: {
      name: name as string,
      email: email as string,
      password: hashedPass,
      phone: phone as string,
      role: role as any,
    },
  });

  return result;
};

const signInUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    }
  );

  return { token, user };
};
export const AuthService = {
  createUser,
  signInUser,
};
