"use strict"

const { productsCreate, productsUpdate, productsGetAll, productsGetId, productsDelete } = _config('stripe/products')

exports.productsCreate = async (req, res, next) => {
    try {
        const productsCreateRes = await productsCreate(req.body)
        res.success(productsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.productsUpdate = async (req, res, next) => {
    try {
        const id = req.body.id
        delete req.body.id
        const productsCreateRes = await productsUpdate(id, req.body)
        res.success(productsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.productsGetAll = async (req, res, next) => {
    try {
        console.log(req.body)
        const productsCreateRes = await productsGetAll(req.body)
        res.success(productsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.productsGetId = async (req, res, next) => {
    try {
        const productsCreateRes = await productsGetId(req.params.id)
        res.success(productsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.productsDelete = async (req, res, next) => {
    try {
        const productsCreateRes = await productsDelete(req.params.id)
        res.success(productsCreateRes)
    } catch (error) {
        res.error(error)
    }
}