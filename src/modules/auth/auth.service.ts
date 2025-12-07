import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (data: any) => {
  const { name, email, password, phone, role } = data;

  //hash password
  const hashedPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name,email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, hashedPass, phone, role]
  );
  return result;
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rows.length === 0) return null;
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  const token = Jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "2M",
    }
  );

  console.log(token);
  return { user, token };
};

export const authServices = {
  loginUser,
  createUser,
};
