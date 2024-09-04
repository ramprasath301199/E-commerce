const Users = require("../models/user")
const { CheckUsers, CheckPass } = require("../checking/Checking")
const { enCrypt, JWT } = require("../password/encpass");
const registers = async (req, res) => {
    try {
        // Create a new user instance
        const checkusers = await CheckUsers(req.body.name)
        if (!checkusers) {
            const hash = await enCrypt(req.body.password);
            const user = new Users({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            });
            // Save the user to the database
            const savedUser = await user.save();
            // Respond with the saved user data
            res.status(201).json({message:"suceess"});
        } else {
            res.status(201).json({ message: "Users is Already Register" });
        }
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message });
    }
}
const login = async (req, res) => {
    try {
        const checkusers = await CheckUsers(req.body.name);
        if (checkusers) {
            const result = await CheckPass(checkusers.password, req.body.password);
            if (!result) {
                res.status(400).json({ message: "Password is incorrect" });
            } else {
                var token = await JWT(checkusers.id, req.body.password);
                res.status(201).json({ user: checkusers, token: token });
            }
        } else {
            res.status(201).json({ message: "User not Found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = { registers, login }