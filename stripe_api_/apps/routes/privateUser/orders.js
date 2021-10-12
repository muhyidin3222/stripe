'use strict';

module.exports = () => {
    const router = require('express').Router();
    const orders = _controller('orders/index')

    router.post('/ordersCreate', orders.ordersCreate)
    router.put('/ordersUpdate', orders.ordersUpdate)
    router.post('/ordersList', orders.ordersList)
    router.get('/ordersGetId/:id', orders.ordersGetId)
    router.post('/ordersPay', orders.ordersPay)
    router.post('/ordersReturn', orders.ordersReturn)

    return router
}