"use strict"

const { cardCreate, cardUpdate, cardGetAll, cardGetId } = _config('stripe/issuing')

exports.cardCreate = async (req, res, next) => {
    try {
        const cardCreateRes = await cardCreate(req.body)
        res.success(cardCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.cardUpdate = async (req, res, next) => {
    try {
        const cardCreateRes = await cardUpdate(req.body)
        res.success(cardCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.cardGetAll = async (req, res, next) => {
    try {
        const cardCreateRes = await cardGetAll(req.body)
        res.success(cardCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.cardGetId = async (req, res, next) => {
    try {
        const cardCreateRes = await cardGetId(req.body)
        res.success(cardCreateRes)
    } catch (error) {
        res.error(error)
    }
}