'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    
    router.use('/privateUser/balances', _router('/balances')())
    router.use('/privateUser/issuing', _router('/issuing')())
    router.use('/privateUser/products', _router('/products')())
    router.use('/privateUser/events', _router('/events')())
    router.use('/privateUser/charges', _router('/charges')())
    router.use('/privateUser/customers', _router('/customers')())
    router.use('/privateUser/payment', _router('/payment')())
    router.use('/privateUser/orders', _router('/orders')())
    router.use('/privateUser/orderReturns', _router('/orderReturns')())
    router.use('/privateUser/invoices', _router('/invoices')())
    router.use('/privateUser/refunds', _router('/refunds')())
    router.use('/privateUser/disputes', _router('/disputes')())
    router.use('/privateUser/topUp', _router('/topUp')())
    router.use('/privateUser/payOut', _router('/payOut')())
    router.use('/privateUser/transfers', _router('/transfers')())
    router.use('/privateUser/subscriptions', _router('/subscriptions')())
    router.use('/privateUser/quote', _router('/quote')())
    router.use('/privateUser/paymentMethod', _router('/paymentMethod')())
    router.use('/privateUser/invoiceItems', _router('/invoiceItems')())
    router.use('/privateUser/checkout', _router('/checkout')())
    router.use('/privateUser/account', _router('/account')())
    
    return router
}

function _router(name) {
    return require(`./${name}`)
}