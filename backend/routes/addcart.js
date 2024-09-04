const express = require("express");
const router = express.Router();
const { cartcontroller, getcart , updatecart} = require("../controllers/addcart")
router.post("/addcart", cartcontroller);
router.get("/cart/:name", getcart);
router.post("/updatecart",updatecart)
module.exports = router;