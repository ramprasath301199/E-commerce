const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    imgId: { type: Number },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    discountPercentage: { type: Number },
    rating: { type: Number, default: 0 }, // Assuming rating can be 0
    stock: { type: Number, min: 0 }, // Stock should be non-negative
    brand: { type: String },
    category: { type: String },
    thumbnail: { type: String },
    images: [{ type: String }], // Array of image URLs
    deleted: { type: Boolean, default: false }
})
const Products = mongoose.model('Products', ProductSchema)
module.exports = Products;