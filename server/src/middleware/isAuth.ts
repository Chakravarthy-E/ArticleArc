import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
