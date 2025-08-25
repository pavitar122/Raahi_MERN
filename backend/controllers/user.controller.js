import userService from "../services/user.service.js";
import JWT from "../utils/jwt.js";

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const { user, token } = await userService.register({
        name,
        email,
        password,
      });
      res.status(201).json({ success: true, user, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login({ email, password });
      res.status(200).json({ success: true, user, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async profile(req, res) {
    try {
      const user = await userService.getProfile(req.user.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default UserController;
