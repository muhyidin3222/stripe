const { cryptoDecrypt } = _lib('crypto')
const { signToken } = _lib('jwt')
const fs = require('fs')
const path =`../../../.env` 

exports.login = async (req, res, next) => {
    try {
        const { dataEncrypt } = req.body
        const { public_key, email, secret_key } = await cryptoDecrypt(dataEncrypt)
        // console.log(cryptoDecrypt(dataEncrypt))
        const errorshowpublickey = public_key.length > 80 && (public_key.includes("pk_live_51") || public_key.includes("pk_test_51"))
        const errorshowsecretkey = secret_key.length > 100 && (secret_key.includes("sk_live_51") || secret_key.includes("sk_test_51"))
        const emailshowsecretkey = email.length && email.includes(".com")

        if (errorshowpublickey && errorshowsecretkey && emailshowsecretkey) {

            console.log(fs.existsSync(path))
            if (fs.existsSync(path)) {
            }


            const user_token = await signToken({ payload: { email } })
            res.success({
                token: user_token
            })
        } else {
            res.notAccessToken("invalid request")
        }
    } catch (err) {
        res.success(err)
        console.log(err)
    }
}