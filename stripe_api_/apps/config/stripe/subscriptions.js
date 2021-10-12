"use strict"

const stripe = require('./core').StripeSecret.subscriptions

exports.subscriptionsCreate = (data) => stripe.create(data)
exports.subscriptionsGetId = (id) => stripe.retrieve(id)
exports.subscriptionsList = (data) => stripe.list(data)
exports.subscriptionsUpdate = (data) => stripe.update(data)
exports.subscriptionsDelete = (data) => stripe.del(data)