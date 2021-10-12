'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('paymentMethod/index')

    router.post('/paymentMethodCreate', controller.paymentMethodCreate)
    router.get('/paymentMethodGetId/:id', controller.paymentMethodGetId)
    router.post('/paymentMethodList', controller.paymentMethodList)
    router.put('/paymentMethodUpdate', controller.paymentMethodUpdate)

    return router
}