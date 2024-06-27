import express from "express";
import {
  registrationUser,
  loginUser,
  getUserById,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/isAuth";
const userRouter = express.Router();

userRouter.post("/create", registrationUser);
userRouter.post("/sign-in", loginUser);
userRouter.get("/get-user/:id", getUserById);

export default userRouter;
