import express from "express";
import pushController from "../controllers/push.controller.js";


const router = express.Router();

// Use the controller methods from the PushController instance
router.post("/saveToken", pushController.saveToken.bind(pushController));

export default router;
