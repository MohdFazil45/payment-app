import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");

    const token = req.cookies?.token;

    if (!token) {
      return res.status(404).json({
        error: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded) {
      return res.status(403).json({
        error: "Invalid token payload",
      });
    }

    req.user = {
      _id: decoded._id,
      name: decoded.name,
      number: decoded.number,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.error("authMiddleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
