'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('refunds/index')

    router.post('/refundsCreate', controller.refundsCreate)
    router.get('/refundsGetId/:id', controller.refundsGetId)
    router.post('/refundsList', controller.refundsList)
    router.put('/refundsUpdate', controller.refundsUpdate)

    return router
}