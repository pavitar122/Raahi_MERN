import express from "express";
import userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Use the controller methods from the UserController instance
router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.get("/profile", auth, userController.getProfile.bind(userController));


export default router;
