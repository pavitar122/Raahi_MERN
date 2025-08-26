import express from "express";
import userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Use the controller methods from the UserController instance
router.post("/register", userController.registerUser.bind(userController));
router.post("/login", userController.loginUser.bind(userController));
router.post("/logout", userController.logoutUser.bind(userController));
router.get("/profile", auth, userController.getUserProfile.bind(userController));


export default router;
