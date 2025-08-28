import PushToken from "../models/pushToken.model.js"


class PushController {
  // Save Token
  async saveToken(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ success: false, message: "Token not provided" });
      }

      const existingToken = await PushToken.findOne({ token });
      if (existingToken) {
        return res.status(200).json({ message: "Token already exists", token: existingToken });
      }

      const newToken = await PushToken.create({
        token
      });
      res.status(201).json({ message: "Token saved successfully", token: newToken });

    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

}

export default new PushController();
