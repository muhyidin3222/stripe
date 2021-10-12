"use strict"

const stripe = require('./core').StripeSecret.reviews

exports.reviewsApprove = (data) => stripe.approve(data)
exports.reviewsGetId = (id) => stripe.retrieve(id)
exports.reviewsList = (data) => stripe.list(data)