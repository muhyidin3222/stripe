"use strict"

const { refundsCreate, refundsGetId, refundsUpdate, refundsList } = _config('stripe/refunds')

exports.refundsCreate = async (req, res, next) => {
    try {
        const refundsCreateRes = await refundsCreate(req.body)
        res.success(refundsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.refundsUpdate = async (req, res, next) => {
    try {
        const refundsUpdateRes = await refundsUpdate(req.body)
        res.success(refundsUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.refundsList = async (req, res, next) => {
    try {
        const refundsListRes = await refundsList(req.body)
        res.success(refundsListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.refundsGetId = async (req, res, next) => {
    try {
        const refundsGetIdRes = await refundsGetId(req.params.id)
        res.success(refundsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}