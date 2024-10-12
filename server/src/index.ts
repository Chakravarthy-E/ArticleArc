import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import connectToDB from "./utils/db";
import userRouter from "./routers/user.router";
import { v2 as cloudinary } from "cloudinary";
import blogRouter from "./routers/blog.route";
import https from "https";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json({ limit: "50mb" }));

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://article-arc.vercel.app",
];

// Updated CORS options
const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    // Allow requests with no origin, such as server-to-server or Postman requests
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include all methods you are using
  allowedHeaders: ["Content-Type", "Authorization"], // Include the headers you expect
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Routers
app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);

// Handle 404 errors
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
});

function pingApp() {
  https
    .get("https://articlearc.onrender.com/", (res) => {
      console.log(`Pinging app: ${res.statusCode}`);
    })
    .on("error", (e) => {
      console.error(`Error pinging app: ${e.message}`);
    });
}

setInterval(pingApp, 600000);

// Start the server
app.listen(port, () => {
  console.log("listening on port " + port);
  connectToDB();
});
