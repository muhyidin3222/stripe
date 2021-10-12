"use strict"

const Stripe = require('stripe');

const { API_STRIPE_SECRET, API_STRIPE } = process.env

const stripe = Stripe(API_STRIPE);
// stripe.charges.retrieve(API_STRIPE_SECRET, { apiKey: API_STRIPE })

exports.stripeConfig = () => stripe
exports.customersCreateBank = () => stripe.customers.createSource(API_STRIPE, { source: API_STRIPE_SECRET })
exports.createBankAccount = (bank_account) => Stripe("cus_K68bxBgzscQv6w").tokens.create({ bank_account });
exports.balanceRetrieve = (cb) => stripe.balance.retrieve(cb)
exports.customersCreateSource = (data) => stripe.customers.createSource(data)
exports.customersCreate = (data) => stripe.customers.create(data)
