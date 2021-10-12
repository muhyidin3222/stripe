'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('charges/index')

    router.post('/chargesCreate', controller.chargesCreate)
    router.get('/chargesGetId/:id', controller.chargesGetId)
    router.post('/chargesCapture', controller.chargesCapture)
    router.post('/chargesList', controller.chargesList)
    router.put('/chargesUpdate', controller.chargesUpdate)

    return router
}