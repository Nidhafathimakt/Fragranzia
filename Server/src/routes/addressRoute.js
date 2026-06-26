const express = require('express')
const router = express.Router();
const {checkAuth} = require("../middleware/checkAuth");
const {getAddress, postAddress, deleteAddress, editAddress} = require("../controllers/addressController")

router.get("/", checkAuth, getAddress);
router.post("/", checkAuth, postAddress);
router.delete("/:id", checkAuth, deleteAddress);
router.put("/:id", checkAuth, editAddress);

module.exports = router;