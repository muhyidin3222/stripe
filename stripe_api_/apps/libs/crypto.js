const CryptoJS = require("crypto-js");

const PRIVATKEY = process.env.PRIVATKEY

exports.cryptoDecrypt = (encryptData) => {
    try {
        var bytes = CryptoJS.AES.decrypt(encryptData, PRIVATKEY) || ""
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText)
    } catch (error) {
        return false
    }
}

exports.cryptoEncrypt = (encryptData) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(encryptData), PRIVATKEY).toString();
    } catch (error) {
        return ''
    }
}