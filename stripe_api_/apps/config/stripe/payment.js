"use strict"

const stripe = require('./core').StripeSecret.paymentIntents
const reviews = require('./core').StripeSecret.reviews
const applicationFees = require('./core').StripeSecret.applicationFees

exports.paymentCreate = (data) => stripe.create(data)
exports.paymentGetId = (id) => stripe.retrieve(id)
exports.paymentUpdate = (data) => stripe.del(data)
exports.paymentConfirm = (data) => stripe.confirm(data)
exports.paymentCapture = (data) => stripe.capture(data)
exports.paymentCancel = (data) => stripe.cancel(data)
exports.paymentList = (data) => stripe.list(data)

exports.reviewsApprove = (data) => reviews.approve(data)
exports.reviewsGetId = (id) => reviews.retrieve(id)
exports.reviewsList = (data) => reviews.list(data)

exports.applicationFeesList = (data) => applicationFees.list(data)
exports.applicationFeesGetId = (id) => applicationFees.retrieve(id)