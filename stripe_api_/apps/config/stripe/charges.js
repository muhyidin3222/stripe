"use strict"

const stripe = require('./core').StripeSecret.charges

exports.chargesCreate = (data) => stripe.create(data)
exports.chargesGetId = (id) => stripe.retrieve(id)
exports.chargesCapture = (data) => stripe.capture(data)
exports.chargesList = (data) => stripe.list(data)
exports.chargesUpdate = (data) => stripe.update(data)