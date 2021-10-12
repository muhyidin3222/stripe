"use strict"

const stripe = require('./core').StripeSecret.disputes

exports.disputesCreate = (data) => stripe.create(data)
exports.disputesGetId = (id) => stripe.retrieve(id)
exports.disputesList = (data) => stripe.list(data)
exports.disputesUpdate = (data) => stripe.update(data)