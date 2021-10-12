import CryptoJS from "crypto-js"

import { privatKey } from 'config/init'

export const cryptoDecrypt = (encryptData) => {
    try {
        var bytes = CryptoJS.AES.decrypt(encryptData, privatKey) || ""
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText)
    } catch (error) {
        return false
    }
}

export const cryptoEncrypt = async (encryptData) => {
    try {
        const resEncrypt = await CryptoJS.AES.encrypt(JSON.stringify(encryptData), privatKey).toString();
        return resEncrypt
    } catch (error) {
        return ''
    }
}