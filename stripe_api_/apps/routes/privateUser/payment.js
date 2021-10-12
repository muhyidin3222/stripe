'use strict';

module.exports = () => {
    const router = require('express').Router();
    const payment = _controller('payment/index')

    router.post('/paymentCreate', payment.paymentCreate)
    router.put('/paymentUpdate', payment.paymentUpdate)
    router.post('/paymentList', payment.paymentList)
    router.get('/paymentGetId/:id', payment.paymentGetId)
    router.post('/paymentConfirm', payment.paymentConfirm)
    router.post('/paymentCapture', payment.paymentCapture)
    router.post('/paymentCancel', payment.paymentCancel)
    router.post('/reviewsApprove', payment.reviewsApprove)
    router.get('/reviewsGetId', payment.reviewsGetId)
    router.post('/reviewsList', payment.reviewsList)
    router.post('/applicationFeesList', payment.applicationFeesList)
    router.post('/applicationFeesGetId', payment.applicationFeesGetId)

    return router
}