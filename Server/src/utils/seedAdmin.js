const bcrypt = require("bcryptjs");
const User = require("../models/user");

const ADMIN_EMAIL = "admin@fragranzia.com";
const ADMIN_PASSWORD = "Admin@123";

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await User.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        name: "Admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        status: true,
        isActive: true,
      },
      { upsert: true, new: true }
    );

    console.log(`Admin ready: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    return admin;
  } catch (error) {
    console.error("Admin seed error:", error.message);
  }
};

module.exports = seedAdmin;
