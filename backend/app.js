import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import pushTokenRoutes from "./routes/push.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Home Route
app.get("/", (req, res) => {
  res.send("The backend of Raahi app is running.");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api", pushTokenRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

export default app;
