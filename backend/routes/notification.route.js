import express from "express";
import { sendNotification } from "../utils/fcm.js";

const router = express.Router();

router.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;
  try {
    await sendNotification(token, title, body);
    res.json({ success: true, message: "Notification sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
