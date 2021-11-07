"use strict"

const NodeCache = require("node-cache");
const myCache = new NodeCache();

var public_key
var secret_key

module.exports = {
    setData: (key, value) => {
        // myCache.set(key, value)
        [key] = value
    },
    getData: (key) => {
        // myCache.get(key)
        return this[key]
    },


    // setpublic_key: () => {
    //     public_key
    // }
}