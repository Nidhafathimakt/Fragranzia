const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { isAdmin } = require("../middleware/adminMiddleware");
const photoUpload = require("../middleware/photoUpload");
const {
  singup,
  home,
  login,
  getUser,
  postUser,
  deleteUser,
  getSingleUser,
  updateUser,
  toggleBlockUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/singup", singup);
router.post("/login", login);
router.get("/home", checkAuth, home);
router.get("/", checkAuth, isAdmin, getUser);
router.post("/", checkAuth, isAdmin, photoUpload.single("image"), postUser);
router.delete("/:id", checkAuth, isAdmin, deleteUser);
router.put("/:id/block", checkAuth, isAdmin, toggleBlockUser);
router.get("/:id", checkAuth, getSingleUser);
router.put("/:id", checkAuth, photoUpload.single("image"), updateUser);

module.exports = router;
