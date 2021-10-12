"use strict"

const stripe = require('./core').StripeSecret.refunds

exports.refundsCreate = (data) => stripe.create(data)
exports.refundsGetId = (id) => stripe.retrieve(id)
exports.refundsList = (data) => stripe.list(data)
exports.refundsUpdate = (data) => stripe.update(data)