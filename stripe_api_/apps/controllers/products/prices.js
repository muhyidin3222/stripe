"use strict"

const { pricesCreate, pricesUpdate, pricesGetAll, pricesGetId } = _config('stripe/products')

exports.pricesCreate = async (req, res, next) => {
    try {
        console.log(req.body)
        const pricesCreateRes = await pricesCreate(req.body)
        res.success(pricesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.pricesUpdate = async (req, res, next) => {
    try {
        const id = req.body.id
        delete req.body.id
        const pricesCreateRes = await pricesUpdate(id, req.body)
        res.success(pricesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.pricesGetAll = async (req, res, next) => {
    try {
        const pricesCreateRes = await pricesGetAll(req.body)
        res.success(pricesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.pricesGetId = async (req, res, next) => {
    try {
        const pricesCreateRes = await pricesGetId(req.params.id)
        res.success(pricesCreateRes)
    } catch (error) {
        res.error(error)
    }
}