'use strict';

module.exports = () => {
    const router = require('express').Router();
    const orderReturn = _controller('orderReturns/index')

    // router.put('/orderReturnsUpdate', orderReturn.orderReturnsUpdate)
    // router.post('/orderReturnsList', orderReturn.orderReturnsList)

    return router
}