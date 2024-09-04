const express = require("express");
const router = express.Router();
const { registers, login } = require("../controllers/userAuth")
router.post("/register", registers);
router.post("/login", login)
module.exports = router;