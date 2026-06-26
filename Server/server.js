const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const ProductRoute = require("./src/routes/ProductRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const authRoute = require("./src/routes/authRoute");
const cartRoute = require("./src/routes/cartRoute");
const wishlistRoute = require("./src/routes/wishlistRoute");
const addressRoute = require("./src/routes/addressRoute");
const orderRoute = require("./src/routes/orderRoute");
const adminRoute = require("./src/routes/adminRoute");
const returnRoute = require("./src/routes/returnRoute");
const seedAdmin = require("./src/utils/seedAdmin");

require("dotenv").config();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Sanitize $ and . in req.body for MongoDB injection protection (Express 5 compatible)
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj)) {
        if (key.startsWith("$") || key.includes(".")) {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          sanitize(obj[key]);
        }
      }
    }
  };
  sanitize(req.body);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many login attempts, please try again later." },
});
app.use("/api/user/login", authLimiter);
app.use("/api/user/singup", authLimiter);

app.use("/api/products", ProductRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/user", authRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/address", addressRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin", adminRoute);
app.use("/api/returns", returnRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Fragranzia API is running...");
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await seedAdmin();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err.message);
    console.error("Make sure MongoDB is running at:", process.env.MONGO_URI);
    process.exit(1);
  }
};

startServer();
