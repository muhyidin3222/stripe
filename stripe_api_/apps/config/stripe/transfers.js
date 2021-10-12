"use strict"

const stripe = require('./core').StripeSecret.transfers

exports.transfersCreate = (data) => stripe.create(data)
exports.transfersGetId = (id) => stripe.retrieve(id)
exports.transfersList = (data) => stripe.list(data)
exports.transfersUpdate = (data) => stripe.update(data)