"use strict"

const stripe = require('./core').StripeSecret.issuing

exports.stripeConfig = () => stripe
exports.cardholderCreate = (data) => stripe.cardholders.create(data)
exports.cardholderUpdate = (data) => stripe.cardholders.update(data)
exports.cardholderGetAll = (data) => stripe.cardholders.list(data)
exports.cardholderGetId = (data) => stripe.cardholders.retrieve(data)

exports.cardCreate = (data) => stripe.cards.create(data)
exports.cardUpdate = (data) => stripe.cards.update(data)
exports.cardGetAll = (data) => stripe.cards.list(data)
exports.cardGetId = (data) => stripe.cards.retrieve(data)

exports.disputesCreate = (data) => stripe.disputes.create(data)
exports.disputesUpdate = (data) => stripe.disputes.update(data)
exports.disputesGetAll = (data) => stripe.disputes.list(data)
exports.disputesGetId = (data) => stripe.disputes.retrieve(data)

exports.transactionsCreate = (data) => stripe.transactions.create(data)
exports.transactionsUpdate = (data) => stripe.transactions.update(data)
exports.transactionsGetAll = (data) => stripe.transactions.list(data)
exports.transactionsGetId = (data) => stripe.transactions.retrieve(data)

exports.authorizationsUpdate = (data) => stripe.authorizations.update(data)
exports.authorizationsGetAll = (data) => stripe.authorizations.list(data)
exports.authorizationsGetId = (data) => stripe.authorizations.retrieve(data)
exports.authorizationsApprove = (data) => stripe.authorizations.approve(data)
exports.authorizationsDecline = (data) => stripe.authorizations.decline(data)

