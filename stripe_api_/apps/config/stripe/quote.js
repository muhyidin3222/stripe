"use strict"

const stripe = require('./core').StripeSecret.quotes

exports.quoteCreate = (data) => stripe.create(data)
exports.quoteGetId = (id) => stripe.retrieve(id)
exports.quoteDelete = (data) => stripe.del(data)
exports.quoteList = (data) => stripe.list(data)
exports.quoteUpdate = (data) => stripe.update(data)
exports.quoteFinalizeQuote = (data) => stripe.finalizeQuote(data)
exports.quoteAcceptQuote = (data) => stripe.acceptQuote(data)
exports.quoteCancelQuote = (data) => stripe.cancelQuote(data)
exports.quotePdf = (data) => stripe.pdf(data)
exports.quoteListLineItems = (data) => stripe.listLineItems(data)
exports.quoteListComputedUpfrontLineItems = (data) => stripe.listComputedUpfrontLineItems(data)