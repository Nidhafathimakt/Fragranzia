const User = require("../models/user");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role isActive status");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isActive || user.status === false) {
      return res.status(403).json({ message: "Your account has been blocked. Contact support." });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = { isAdmin };
