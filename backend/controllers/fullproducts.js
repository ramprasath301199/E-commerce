const Products = require("../models/products")
const fs = require("fs/promises");
const path = require("path")
const { checkToken } = require("../password/encpass")
const Add = async (req, res) => {
    try {
        var read = await fs.readFile(path.join(__dirname, "../json", "products.json"), "utf-8")
        var data = JSON.parse(read);
        // Insert data into MongoDB
        await Products.insertMany(data);
        res.send("insert successfully")
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}
const getProd = async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const check = await checkToken(req.headers.authorization.split(" ")[1]);
        if (check != "expired") {
            const data = await Products.find({});
            res.send(data);
        } else {
            res.status(401).send("token expired");
        }
    } else {
        res.status(401).send("No token provided");
    }
}
const oneprod = async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const check = await checkToken(req.headers.authorization.split(" ")[1]);
        if (check != "expired") {
            const data = await Products.findOne({ _id: req.params.id })
            res.status(201).json(data);
        } else {
            res.status(401).send("token expired");
        }
    }

}
module.exports = { Add, getProd, oneprod }