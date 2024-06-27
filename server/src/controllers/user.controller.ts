import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const registrationUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(401)
        .json({ success: true, message: "Enter the required fields" });
    }

    if (name.length < 3) {
      res.status(401).json({ success: true, message: "Name is too short" });
    }

    if (password.length < 6) {
      res.status(401).json({ success: true, message: "Password is too short" });
    }

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      res.status(401).json({ success: true, message: "Email Already Exist" });
    }
    const newUser = await new userModel({ name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Enter the required fields" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
