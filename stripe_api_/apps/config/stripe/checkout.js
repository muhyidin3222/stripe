"use strict"

const stripe = require('./core').StripeSecret.checkout

exports.checkoutList = (data) => stripe.list(data)