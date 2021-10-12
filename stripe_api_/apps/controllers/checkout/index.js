"use strict"

const { checkoutList } = _config('stripe/checkout')

exports.checkoutList = async (req, res, next) => {
    try {
        const checkoutListRes = await checkoutList(req.body)
        res.success(checkoutListRes)
    } catch (error) {
        res.error(error)
    }
}