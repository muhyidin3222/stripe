"use strict"

const stripe = require('./core').StripeSecret.invoices

exports.invoicesCreate = (data) => stripe.create(data)
exports.invoicesGetId = (id) => stripe.retrieve(id)
exports.invoicesDelete = (data) => stripe.del(data)
exports.invoicesList = (data) => stripe.list(data)
exports.invoicesUpdate = (data) => stripe.update(data)
exports.invoicesFinalizeInvoice = (data) => stripe.finalizeInvoice(data)
exports.invoicesPay = (data) => stripe.pay(data)
exports.invoicesSendInvoice = (data) => stripe.sendInvoice(data)
exports.invoicesVoidInvoice = (data) => stripe.voidInvoice(data)
exports.invoicesMarkUncollectible = (data) => stripe.markUncollectible(data)
exports.invoicesListLineItems = (data) => stripe.listLineItems(data)
exports.invoicesRetrieveUpcoming = (data) => stripe.retrieveUpcoming(data)
exports.invoicesListUpcomingLineItems = (data) => stripe.listUpcomingLineItems(data)