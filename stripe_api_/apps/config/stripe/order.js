"use strict"

const stripe = require('./core').StripeSecret.orders

exports.ordersGetId = (id) => stripe.retrieve(id)
exports.ordersUpdate = (data) => stripe.update(data)
exports.ordersPay = (data) => stripe.pay(data)
exports.ordersList = (data) => stripe.list(data)
exports.ordersReturn = (data) => stripe.returnOrder(data)
exports.ordersCreate = (data) => stripe.create(data)