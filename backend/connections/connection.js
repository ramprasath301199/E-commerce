const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const DB = process.env.DBURL;
const connect = () => {
    return mongoose.connect(DB);
}
module.exports = connect;