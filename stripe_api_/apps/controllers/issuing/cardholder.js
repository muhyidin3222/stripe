"use strict"

const { cardholderCreate, cardholderUpdate, cardholderGetAll, cardholderGetId } = _config('stripe/issuing')

exports.cardholderCreate = async (req, res, next) => {
    try {
        const cardholderCreateRes = await cardholderCreate(req.body)
        res.success(cardholderCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.cardholderUpdate = async (req, res, next) => {
    try {
        const cardholderCreateRes = await cardholderUpdate(req.body)
        res.success(cardholderCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.cardholderGetAll = async (req, res, next) => {
    try {
        const cardholderCreateRes = await cardholderGetAll(req.body)
        res.success(cardholderCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.cardholderGetId = async (req, res, next) => {
    try {
        const cardholderCreateRes = await cardholderGetId(req.body)
        res.success(cardholderCreateRes)
    } catch (error) {
        res.error(error)
    }
}