"use strict"

const { taxCodesList, taxCodesUpdate } = _config('stripe/products')

exports.taxCodesGetAll = async (req, res, next) => {
    try {
        const taxCodesRes = await taxCodesList(req.body)
        res.success(taxCodesRes)
    } catch (error) {
        res.error(error)
    }
}
exports.taxCodesUpdate = async (req, res, next) => {
    try {
        const taxCodesRes = await taxCodesUpdate(req.body)
        res.success(taxCodesRes)
    } catch (error) {
        res.error(error)
    }
}