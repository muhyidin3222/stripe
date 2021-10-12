"use strict"

const stripe = require('./core').StripeSecret.topups

exports.topUpCreate = (data) => stripe.create(data)
exports.topUpGetId = (id) => stripe.retrieve(id)
exports.topUpList = (data) => stripe.list(data)
exports.topUpUpdate = (data) => stripe.update(data)
exports.topUpCancel = (data) => stripe.cancel(data)