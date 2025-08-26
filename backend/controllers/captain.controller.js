import captainService from "../services/captain.service.js";
import Cookie from "../utils/cookie.js";

class CaptainController {

  // Register Captain
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const { captain, token } = await captainService.register({ name, email, password, phone });

      Cookie.setTokenCookie(res, token);

      res.status(201).json({ success: true, captain, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Login Captain
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { captain, token } = await captainService.login({ email, password });
      Cookie.setTokenCookie(res, token);
      res.status(200).json({ success: true, captain, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Logout Captain there is no service connected to this controller
  async logout(req, res) {
    try {
      Cookie.clearTokenCookie(res);
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Logout failed", error: error.message });
    }
  }

  // Get Captain Profile
  async getProfile(req, res) {
    try {
      const user = await captainService.getProfile(req.user.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new CaptainController();
