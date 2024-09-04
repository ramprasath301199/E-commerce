const express = require("express");
const connect = require("./connections/connection");
const dotenv = require("dotenv").config()
const routes = require("./routes/authroutes")
const products = require("./routes/fullproducts")
const allprod = require("./routes/prod")
const checktoken = require("./routes/checktoken")
const addcart = require("./routes/addcart")
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3011;
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }))
connect().then(() => {
    console.log("db connected")
    app.use("/api/add/", products)
    app.use("/api/", routes)
    app.use("/api/", allprod)
    app.use("/api/", checktoken)
    app.use("/api/", addcart);
    app.use((req, res) => {
        res.status(404).send('404 - Not Found');
    });
    app.listen(port, () => {
        console.log("server running http://localhost:" + port + "")
    })
}).catch(err => {
    console.log(err);
});
