const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  postOrder,
  getOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", checkAuth, postOrder);
router.get("/", checkAuth, getOrder);
router.get("/admin/all", checkAuth, isAdmin, getAllOrders);
router.get("/:id", checkAuth, getOrderById);
router.put("/status/:id", checkAuth, isAdmin, updateOrderStatus);

module.exports = router;
