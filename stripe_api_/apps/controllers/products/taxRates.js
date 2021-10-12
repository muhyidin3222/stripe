"use strict"

const { taxRatesCreate, taxRatesUpdate, taxRatesGetAll, taxRatesGetId, taxRatesDelete } = _config('stripe/products')

exports.taxRatesCreate = async (req, res, next) => {
    try {
        const taxRatesCreateRes = await taxRatesCreate(req.body)
        res.success(taxRatesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.taxRatesUpdate = async (req, res, next) => {
    try {
        const id = req.body.id
        delete req.body.id
        const taxRatesCreateRes = await taxRatesUpdate(id, req.body)
        res.success(taxRatesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.taxRatesGetAll = async (req, res, next) => {
    try {
        const taxRatesCreateRes = await taxRatesGetAll(req.body)
        res.success(taxRatesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.taxRatesGetId = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const taxRatesCreateRes = await taxRatesGetId(req.params.id)
        res.success(taxRatesCreateRes)
    } catch (error) {
        res.error(error)
    }
}