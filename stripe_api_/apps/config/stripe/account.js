"use strict"

const stripe = require('./core').StripeSecret.accounts

exports.accountCreate = (data) => stripe.create(data)
exports.accountGetId = (id) => stripe.retrieve(id)
exports.accountList = (data) => stripe.list(data)
exports.accountUpdate = (data) => stripe.update(data)