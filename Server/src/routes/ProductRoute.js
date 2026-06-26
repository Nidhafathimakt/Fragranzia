const express = require("express");
const router = express.Router();
const photoUpload = require("../middleware/photoUpload");
const { checkAuth } = require("../middleware/checkAuth");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  getProductSingle,
} = require("../controllers/productController");

router.get("/", getProduct);
router.get("/:id", getProductSingle);
router.post("/", checkAuth, isAdmin, photoUpload.single("image"), postProduct);
router.put("/:id", checkAuth, isAdmin, photoUpload.single("image"), putProduct);
router.delete("/:id", checkAuth, isAdmin, deleteProduct);

module.exports = router;
