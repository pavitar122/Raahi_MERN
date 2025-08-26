import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";



dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
  res.send("The backend of Raahi app is running.");
});

// Routes
app.use("/api/users", userRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

export default app;
