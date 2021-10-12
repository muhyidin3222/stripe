"use strict"

const { subscriptionsDeleteDiscount, customersDeleteDiscount } = _config('stripe/products')

exports.subscriptionsDeleteDiscount = async (req, res, next) => {
    try {
        const resDeleteDiscount = await subscriptionsDeleteDiscount(req.body)
        res.success(resDeleteDiscount)
    } catch (error) {
        res.error(error)
    }
}
exports.customersDeleteDiscount = async (req, res, next) => {
    try {
        const resDeleteDiscount = await customersDeleteDiscount(req.body)
        res.success(resDeleteDiscount)
    } catch (error) {
        res.error(error)
    }
}