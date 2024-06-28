import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import connectToDB from "./utils/db";
import userRouter from "./routers/user.router";
import { v2 as cloudinary } from "cloudinary";
import blogRouter from "./routers/blog.route";

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json({ limit: "50mb" }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://article-arc.vercel.app",
];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(port, () => {
  console.log("listening on port " + process.env.PORT);
  connectToDB();
});
