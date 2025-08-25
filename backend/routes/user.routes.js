import express from "express";
import userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/profile", auth, (req, res) => userController.profile(req, res));

export default router;
