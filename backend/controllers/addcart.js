const Cart = require("../models/cart");
const Products = require("../models/products")
const { checkToken } = require("../password/encpass")
const cartcontroller = async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const check = await checkToken(req.headers.authorization.split(" ")[1]);
        if (check != "expired") {
            const collection = req.body.cartdatas;
            try {
                const one = await Products.find({ _id: collection })
                const user = await Cart.find({ userName: req.body.userName })
                if (user.length == 0) {
                    const newCart = new Cart({
                        userName: req.body.userName,
                        cartdatas: one
                    });
                    await newCart.save();
                    res.status(201).json({ message: "Success" });
                } else {
                    // Update existing cart
                    const existingProductIds = user[0].cartdatas.map(product => product._id.toString());

                    const newProducts = one.filter(product => !existingProductIds.includes(product._id.toString()));
                    if (newProducts.length > 0) {
                        await Cart.updateOne(
                            { userName: req.body.userName },
                            { $push: { cartdatas: { $each: newProducts } } } // $push with $each appends multiple items to the array
                        );
                    }

                    res.status(200).json({ message: "Updated" });
                }
            } catch (error) {
                res.status(401).send(error);
            }

        } else {
            res.status(401).send("token expired");
        }
    } else {
        res.status(401).send("No token provided");
    }

    //const savecart = await cart.save();

}
const getcart = async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const check = await checkToken(req.headers.authorization.split(" ")[1]);
        if (check != "expired") {
            const name = req.params.name;
            const data = await Cart.find({ userName: name })
            res.send(data);
        } else {
            res.status(401).send("token expired");
        }
    } else {
        res.status(401).send("No token provided");
    }
}
const updatecart = async (req, res) => {
    // Check for the Bearer token
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const check = await checkToken(req.headers.authorization.split(" ")[1]);
        if (check != "expired") {
            const { userName, cartdatas } = req.body;
            // Update the cart for the user
            const result = await Cart.updateOne(
                {
                    userName: userName,
                    $set: { cartdatas: cartdatas }
                }, // Update the cartdatas field
            );
            res.status(200).json({ message: "updated" });
        } else {
            res.status(401).send("Token expired");
        }
    } else {
        res.status(401).send("No token provided");
    }
};
module.exports = { cartcontroller, getcart, updatecart }