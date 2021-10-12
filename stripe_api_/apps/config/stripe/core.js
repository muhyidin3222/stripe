"use strict"

const Stripe = require('stripe');

const { API_STRIPE_SECRET, API_STRIPE } = process.env

exports.StripePublic = Stripe(API_STRIPE);
exports.StripeSecret = Stripe(API_STRIPE_SECRET);
