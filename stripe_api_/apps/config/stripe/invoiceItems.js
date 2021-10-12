"use strict"

const stripe = require('./core').StripeSecret.invoiceItems

exports.invoiceItemsCreate = (data) => stripe.create(data)
exports.invoiceItemsGetId = (id) => stripe.retrieve(id)
exports.invoiceItemsList = (data) => stripe.list(data)
exports.invoiceItemsUpdate = (data) => stripe.update(data)
exports.invoiceItemsDelete = (data) => stripe.del(data)