import {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "Token requerido",
      });

      return;
    }

    const token =
      authHeader.split(" ")[1];

    console.log("HEADER:", authHeader);
    console.log("TOKEN:", token);

    const decoded =
      verifyToken(token);

      console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Token inválido",
    });
  }
};