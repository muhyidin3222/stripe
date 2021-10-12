'use strict';

const path = require('path');

module.exports = (req, res) => {
    const router = require('express').Router();
    router.use('/auth', _router('auth')())
    return router
}

function _router (name) {
    return require(`./${name}`)
}