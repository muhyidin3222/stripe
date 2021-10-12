"use strict"

const stripe = require('./core').StripeSecret.customers

exports.customersCreate = (data) => stripe.create(data)
exports.customersGetId = (id) => stripe.retrieve(id)
exports.customersDelete = (data) => stripe.del(data)
exports.customersList = (data) => stripe.list(data)
exports.customersUpdate = (id, data) => stripe.update(id, data)

exports.customersBank = (data) => stripe.listSources(data)


