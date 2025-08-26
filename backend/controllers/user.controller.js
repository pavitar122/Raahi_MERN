import userService from "../services/user.service.js";
import Cookie from "../utils/cookie.js";

class UserController {
  // USER REGISTER CONTROLLER
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const { user, token } = await userService.register({ name, email, password });

      Cookie.setTokenCookie(res, token);

      res.status(201).json({ success: true, user, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // USER LOGIN CONTROLLER
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login({ email, password });
      Cookie.setTokenCookie(res, token);
      res.status(200).json({ success: true, user, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async logoutUser(req, res) {
    try {
      Cookie.clearTokenCookie(res);
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Logout failed", error: error.message });
    }
  }

  // USER PROFILE CONTROLLER
  async getUserProfile(req, res) {
    try {
      const user = await userService.getProfile(req.user.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new UserController();
