const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized: black Invalid or expired token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { authMiddleware };
