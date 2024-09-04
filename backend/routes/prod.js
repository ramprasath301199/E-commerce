const express = require("express");
const router = express.Router();
const { getProd, oneprod } = require("../controllers/fullproducts")
router.get("/getproducts", getProd)
router.get("/prod/:id", oneprod)
module.exports = router;