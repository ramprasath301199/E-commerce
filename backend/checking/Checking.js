const users = require("../models/user")
const { deCrypt } = require("../password/encpass")
const CheckUsers = async (name) => {
    const data = await users.findOne({ name: name });
    return data;
}
const CheckPass = async (encpass, pass) => {
    const result = await deCrypt(encpass, pass);
    return result;
}

module.exports = { CheckUsers, CheckPass };