"use strict"

const { couponsCreate, couponsUpdate, couponsGetAll, couponsGetId } = _config('stripe/products')

exports.couponsCreate = async (req, res, next) => {
    try {
        const couponsCreateRes = await couponsCreate(req.body)
        res.success(couponsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.couponsUpdate = async (req, res, next) => {
    try {
        const couponsCreateRes = await couponsUpdate(req.body)
        res.success(couponsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.couponsGetAll = async (req, res, next) => {
    try {
        const couponsCreateRes = await couponsGetAll(req.body)
        res.success(couponsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.couponsGetId = async (req, res, next) => {
    try {
        const couponsCreateRes = await couponsGetId(req.params.id)
        res.success(couponsCreateRes)
    } catch (error) {
        res.error(error)
    }
}