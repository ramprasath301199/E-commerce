const express = require("express");
const router = express.Router();
const { Add } = require("../controllers/fullproducts")
router.get("/json", Add);
module.exports = router;