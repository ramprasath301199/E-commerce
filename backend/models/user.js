const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Users = mongoose.model('Users', UserSchema)
module.exports = Users;