import JWT from "../utils/jwt.js";

function auth(req, res, next) {
  // Get token from cookie OR Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token || token.trim() === "") {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }


  try {
    const decoded = JWT.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

export default auth;