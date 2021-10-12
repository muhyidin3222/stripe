"use strict"

const { promotionCodesCreate, promotionCodesUpdate, promotionCodesGetAll, promotionCodesGetId, promotionCodesDelete } = _config('stripe/products')

exports.promotionCodesCreate = async (req, res, next) => {
    try {
        const promotionCodesCreateRes = await promotionCodesCreate(req.body)
        res.success(promotionCodesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.promotionCodesUpdate = async (req, res, next) => {
    try {
        const promotionCodesCreateRes = await promotionCodesUpdate(req.body)
        res.success(promotionCodesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.promotionCodesGetAll = async (req, res, next) => {
    try {
        const promotionCodesCreateRes = await promotionCodesGetAll(req.body)
        res.success(promotionCodesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.promotionCodesGetId = async (req, res, next) => {
    try {
        const promotionCodesCreateRes = await promotionCodesGetId(req.body)
        res.success(promotionCodesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.promotionCodesDelete = async (req, res, next) => {
    try {
        const promotionCodesCreateRes = await promotionCodesDelete(req.body)
        res.success(promotionCodesCreateRes)
    } catch (error) {
        res.error(error)
    }
}