const express = require("express");
const router = express.Router();
const {checkAuth} = require("../middleware/checkAuth");
const {addToWishlist, getWishlist, removeWishlistItem} = require("../controllers/wishlistController")


router.post("/", checkAuth, addToWishlist);
router.get("/", checkAuth, getWishlist);
router.delete("/", checkAuth, removeWishlistItem);

module.exports = router;