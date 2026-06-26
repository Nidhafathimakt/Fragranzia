const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  requestReturn,
  getUserReturns,
  getAllReturns,
  updateReturnStatus,
} = require("../controllers/returnController");

const router = express.Router();

router.post("/", checkAuth, requestReturn);
router.get("/my", checkAuth, getUserReturns);
router.get("/", checkAuth, isAdmin, getAllReturns);
router.put("/:id", checkAuth, isAdmin, updateReturnStatus);

module.exports = router;
