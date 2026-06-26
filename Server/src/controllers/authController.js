const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
};

let singup = async (req, res) => {
  try {
    const { name, email, password, lastName, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role: "user",
    });
    res.status(201).json({
      message: "Registered Successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (!user.isActive || user.status === false) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

let home = (req, res) => {
  res.json({ message: "Welcome to Home Page" });
};

const getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, lastName, email, password, phone, address, status } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      image: req.file ? req.file.filename : null,
      status: status === "inactive" ? false : true,
      isActive: status !== "inactive",
    });
    res.status(201).json({
      message: "User created successfully",
      data: sanitizeUser(userData),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.userId !== req.params.id && req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const updatedData = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    };
    if (req.file) updatedData.image = req.file.filename;
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot block admin account" });
    }
    user.isActive = !user.isActive;
    user.status = user.isActive;
    await user.save();
    res.status(200).json({
      message: user.isActive ? "User unblocked" : "User blocked",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  singup,
  login,
  home,
  getUser,
  postUser,
  deleteUser,
  getSingleUser,
  updateUser,
  toggleBlockUser,
};
