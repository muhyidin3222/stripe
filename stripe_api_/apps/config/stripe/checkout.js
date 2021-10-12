"use strict"

const stripe = require('./core').StripeSecret.checkout.sessions

exports.checkoutList = (data) => stripe.list(data)