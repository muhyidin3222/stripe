'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('checkout/index')

    router.post('/checkoutGetAll', controller.checkoutList)

    return router
}