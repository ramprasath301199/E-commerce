const { checkToken } = require('../password/encpass')
const checking = async (req, res) => {
    try {
        const result = await checkToken(req.body.token);
        res.send({ message: result });
    } catch (error) {
        res.status(401).send(error)
    }

}
module.exports = { checking }