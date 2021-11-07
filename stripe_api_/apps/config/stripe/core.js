"use strict"

const Stripe = require('stripe');
// const { getData } = _lib("nodeCache")
const { API_STRIPE_SECRET, API_STRIPE } = process.env

// const secret_key = getData("secret_key");
// console.log(secret_key)
// const public_key = getData("public_key");
// console.log(public_key)

exports.StripePublic = Stripe(API_STRIPE)
exports.StripeSecret = Stripe(API_STRIPE_SECRET)