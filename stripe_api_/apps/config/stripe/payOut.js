"use strict"

const stripe = require('./core').StripeSecret.payouts

exports.payOutCreate = (data) => stripe.create(data)
exports.payOutGetId = (id) => stripe.retrieve(id)
exports.payOutUpdate = (data) => stripe.del(data)
exports.payOutCancel = (data) => stripe.cancel(data)
exports.payOutList = (data) => stripe.list(data)