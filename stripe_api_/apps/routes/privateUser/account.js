'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('account/index')

    router.post('/accountCreate', controller.accountCreate)
    router.get('/accountGetId/:id', controller.accountGetId)
    router.post('/accountList', controller.accountList)
    router.put('/accountUpdate', controller.accountUpdate)

    return router
}