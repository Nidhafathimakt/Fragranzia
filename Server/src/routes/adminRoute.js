const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { isAdmin } = require("../middleware/adminMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", checkAuth, isAdmin, getDashboardStats);

module.exports = router;
