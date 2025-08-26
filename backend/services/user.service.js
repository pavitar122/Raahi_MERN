import User from "../models/user.model.js";
import JWT from "../utils/jwt.js";
import validator from "validator";

class UserService {
  // USER REGISTER SERVICE
  async register({ name, email, password }) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const user = await User.create({ name, email, password });
    const token = JWT.generateToken({ id: user._id });
    return { user, token };
  }

  // USER LOGIN SERVICE
  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = JWT.generateToken({ id: user._id });
    return { user, token };
  }
  // USER PROFILE SERVICE
  async getProfile(userId) {
    return User.findById(userId).select("-password");
  }
}

export default new UserService;
