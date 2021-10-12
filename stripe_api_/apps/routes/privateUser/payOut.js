'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('payOut/index')

    router.post('/payOutCreate', controller.payOutCreate)
    router.get('/payOutGetId/:id', controller.payOutGetId)
    router.post('/payOutList', controller.payOutList)
    router.put('/payOutUpdate', controller.payOutUpdate)
    router.post('/payOutCancel', controller.payOutCancel)

    return router
}