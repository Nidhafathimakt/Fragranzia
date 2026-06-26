const express = require("express");
const router = express.Router();
const {checkAuth} = require("../middleware/checkAuth");

const {
  addToCart,
  getCart,
  removeCartItem,
  updateCartQuantity,
  clearCart,
  verifyPayment
} = require("../controllers/cartController");

router.post("/", checkAuth, addToCart);            // Add item
// router.get("/:accessToken",checkAuth, getCart);  
router.get("/",checkAuth, getCart);       // Get cart
router.delete("/",checkAuth, removeCartItem);     // Remove item
router.put("/",checkAuth,updateCartQuantity);
router.delete("/clear", checkAuth, clearCart);
router.post("/payment/verify-payment", checkAuth, verifyPayment);

module.exports = router;



