import Captain from "../models/captain.model.js"
import JWT from "../utils/jwt.js";
import validator from "validator";

class CaptainService {
  // Captain Register Service
  async register({ name, email, password, phone }) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    const captainExists = await Captain.findOne({ email });
    if (captainExists) throw new Error("Captain already exists");

    const captain = await Captain.create({ name, email, password, phone });
    const token = JWT.generateToken({ id: user._id });
    return { captain, token };
  }

  // Captain Login Service
  async login({ email, password }) {
    const captain = await Captain.findOne({ email });
    if (!captain) throw new Error("Invalid Email");

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) throw new Error("Invalid Password");

    const token = JWT.generateToken({ id: captain._id });
    return { captain, token };
  }

  // Captain Profie Service
  async getProfile(userId) {
    return Captain.findById(userId).select("-password");
  }
}

export default new CaptainService;
