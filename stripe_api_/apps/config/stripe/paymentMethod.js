"use strict"

const stripe = require('./core').StripeSecret.paymentMethods

exports.paymentMethodCreate = (data) => stripe.create(data)
exports.paymentMethodGetId = (id) => stripe.retrieve(id)
exports.paymentMethodUpdate = (data) => stripe.update(data)
exports.paymentMethodList = (data) => stripe.list(data)