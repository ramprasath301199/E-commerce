const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const enCrypt = async (pass) => {
    try {
        const pword = await bcrypt.hash(pass, saltRounds)
        return pword;
    } catch (error) {
        return error;
    }
}
const deCrypt = async (encpass, pass) => {
    try {
        const compare = await bcrypt.compare(pass, encpass)
        return compare;
    } catch (error) {
        return error;
    }
}
const JWT = async (id, pass) => {
    const token = jwt.sign({ userId: id, password: pass }, 'secret', { expiresIn: '24h' })
    return token;
}
const checkToken = async (token) => {
    try {
        const check = jwt.verify(token, 'secret');
        return "valid";
    } catch (error) {
        return "expired";
    }
}
module.exports = { enCrypt, deCrypt, JWT, checkToken };