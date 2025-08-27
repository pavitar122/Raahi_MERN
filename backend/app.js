import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import admin from "./firebase.js"

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Home Route
app.get("/", (req, res) => {
  res.send("The backend of Raahi app is running.");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);

app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    token,
    notification: {
      title,
      body,
      image: "/default-icon.png"
    },
  };

  try {
    const response = await admin.messaging().send(message);
    res.json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});




// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

export default app;
