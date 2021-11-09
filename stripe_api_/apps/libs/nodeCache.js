"use strict"

const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100 });

module.exports = {
    setData: (key, value) => {
        return myCache.set(key, value)
        // [key] = value
    },
    getData: (key) => {
        return myCache.get(key)
        // return this[key]
    },
    checkData: (key) => {
        return myCache.has(key)
        // return this[key]
    },

    // setpublic_key: () => {
    //     public_key
    // }
}