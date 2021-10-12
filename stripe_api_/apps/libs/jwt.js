var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATKEY

exports.signToken = async ({ payload }) => {
    const token = await jwt.sign(payload, privateKey, { algorithm: "HS256", expiresIn: "365d" });
    return token
}

exports.verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, privateKey, { algorithm: "HS256", expiresIn: "365d" })
        return decoded
    } catch (error) {
        console.log(error)
    }
}