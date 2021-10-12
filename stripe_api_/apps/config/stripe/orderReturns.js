"use strict"

const stripe = require('./core').StripeSecret.orderReturns

exports.orderReturnsUpdate = (id) => stripe.retrieve(id)
exports.orderReturnsList = (data) => stripe.list(data)