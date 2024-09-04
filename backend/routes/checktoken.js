const express = require("express");
const router = express.Router();
const { checking } = require("../controllers/token")
router.post("/check", checking)
module.exports = router;