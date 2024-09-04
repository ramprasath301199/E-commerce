const mongoose = require("mongoose")

const CartSchema = mongoose.Schema({
    userName: {
        type: String
    },
    cartdatas: []
})
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;