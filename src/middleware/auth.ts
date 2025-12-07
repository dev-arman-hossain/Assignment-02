import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

interface CustomRequest extends Request {
  user: JwtPayload;
}

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token || token.startsWith("Bearer ")) {
       return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const bearerToken = token.split(" ")[1];

      const decoded = Jwt.verify(
        bearerToken as string,
        config.jwt_secret as string
      ) as JwtPayload;
      console.log({ decoded });
      (req as CustomRequest).user = decoded;
      //["admin"]
      if (roles.length && !roles.includes(decoded.role as string)) {
         return res.status(403).json({
          success: false,
          message:
            "Forbidden: You don't have enough permission to access this resource",
        });
      }

      next();
    } catch (err: any) {
       res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    }
  };
};
