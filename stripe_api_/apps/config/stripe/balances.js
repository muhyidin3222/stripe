"use strict"

const stripe = require('./core').StripeSecret

exports.customersCreateBank = () => stripe.customers.createSource(API_STRIPE, { source: API_STRIPE_SECRET })
exports.createBankAccount = (bank_account) => { }
exports.balanceRetrieve = (cb) => stripe.balance.retrieve(cb)
exports.customersCreateSource = (data) => stripe.customers.createSource(data)
exports.customersCreate = (data) => stripe.customers.create(data)

exports.balanceTransactionsList = (data) => stripe.balanceTransactions.list(data)
exports.balanceTransactionsGetId = (data) => stripe.balanceTransactions.retrieve(data)