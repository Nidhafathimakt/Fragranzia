const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategory);
router.post("/", checkAuth, isAdmin, postCategory);
router.put("/:id", checkAuth, isAdmin, putCategory);
router.delete("/:id", checkAuth, isAdmin, deleteCategory);

module.exports = router;
