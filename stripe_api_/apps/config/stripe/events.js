"use strict"

const stripe = require('./core').StripeSecret.events

exports.eventsGetId = (id) => stripe.retrieve(id)
exports.eventsList = (data) => stripe.list(data)