// higher order function
import Jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import config from "../config";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json({ message: "Your are not allowed" });
      }
      const decoded = Jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;
      console.log({ decoded });
      req.user = decoded;
      //["admin"]
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({ 
          message: "Unauthorized!!!"
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
};
