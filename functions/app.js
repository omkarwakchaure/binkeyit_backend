import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "../../config/connectDB.js";
import userRouter from "../../routes/user.route.js";
import serverless from "serverless-http";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (request, response) => {
  response.json({
    message: "Server is running ",
  });
});

app.use("/api/user", userRouter);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  console.log("Database connected");
  // app.listen(PORT, () => {
  //   console.log("Server is running on", PORT);
  //   console.log("Link http://localhost:8080/");
  // });
});

export const handler = serverless(app);

// Use the router with the specified path
// app.use("/.netlify/functions/app", router);

// Export the serverless handler
