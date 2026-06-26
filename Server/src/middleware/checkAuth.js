const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return authHeader;
};

const checkAuth = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokenValid = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenValid.id;

    const user = await User.findById(req.userId).select("isActive status role");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!user.isActive || user.status === false) {
      return res.status(403).json({
        message: "Your account has been blocked. Contact support.",
      });
    }

    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "You are unauthorized" });
  }
};

module.exports = { checkAuth, getToken };
