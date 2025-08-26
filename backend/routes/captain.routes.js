import express from "express";
import captainController from "../controllers/captain.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Use the controller methods from the CaptainController instance
router.post("/register", captainController.register.bind(captainController));
router.post("/login", captainController.login.bind(captainController));
router.post("/logout", captainController.logout.bind(captainController));
router.get("/profile", auth, captainController.getProfile.bind(captainController));


export default router;
