"use strict"

const stripe = require('./core').StripeSecret

exports.stripeConfig = () => stripe
exports.productsCreate = (data) => stripe.products.create(data)
exports.productsUpdate = (id, data) => stripe.products.update(id, data)
exports.productsGetAll = (data) => stripe.products.list(data)
exports.productsGetId = (data) => stripe.products.retrieve(data)
exports.productsDelete = (data) => stripe.products.del(data)

exports.pricesCreate = (data) => stripe.prices.create(data)
exports.pricesUpdate = (id, data) => stripe.prices.update(id, data)
exports.pricesGetAll = (data) => stripe.prices.list(data)
exports.pricesGetId = (id) => stripe.prices.retrieve(id)

exports.couponsCreate = (data) => stripe.coupons.create(data)
exports.couponsUpdate = (id, data) => stripe.coupons.update(id, data)
exports.couponsGetAll = (data) => stripe.coupons.list(data)
exports.couponsGetId = (data) => stripe.coupons.retrieve(data)
exports.couponsDelete = (data) => stripe.coupons.del(data)

exports.promotionCodesCreate = (data) => stripe.promotion_codes.create(data)
exports.promotionCodesUpdate = (id, data) => stripe.promotion_codes.update(id, data)
exports.promotionCodesGetAll = (data) => stripe.promotion_codes.list(data)
exports.promotionCodesGetId = (data) => stripe.promotion_codes.retrieve(data)
exports.promotionCodesDelete = (data) => stripe.promotion_codes.del(data)

exports.subscriptionsDeleteDiscount = (data) => stripe.subscriptions.deleteDiscount(data)
exports.customersDeleteDiscount = (data) => stripe.customers.deleteDiscount(data)

exports.taxCodesList = (data) => stripe.taxCodes.list(data)
exports.taxCodesUpdate = (data) => stripe.taxCodes.retrieve(data)

exports.taxRatesCreate = (data) => stripe.taxRates.create(data)
exports.taxRatesUpdate = (id, data) => stripe.taxRates.update(id, data)
exports.taxRatesGetAll = (data) => stripe.taxRates.list(data)
exports.taxRatesGetId = (data) => stripe.taxRates.retrieve(data)