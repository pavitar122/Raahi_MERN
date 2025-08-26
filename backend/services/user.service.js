import User from "../models/user.model.js";
import JWT from "../utils/jwt.js";
import validator from "validator";

class UserService {
  // User Register Service
  async register({ name, email, password, phone }) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    if (!validator.isMobilePhone(phone, 'en-IN')) {
      throw new Error("Invalid phone number");
    }

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const user = await User.create({ name, email, password, phone });
    const token = JWT.generateToken({ id: user._id });
    return { user, token };
  }

  // User Login Service
  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = JWT.generateToken({ id: user._id });
    return { user, token };
  }

  // User Profie Service
  async getProfile(userId) {
    return User.findById(userId).select("-password");
  }
}

export default new UserService;
