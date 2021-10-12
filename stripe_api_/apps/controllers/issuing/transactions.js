"use strict"

const { transactionsCreate, transactionsUpdate, transactionsGetAll, transactionsGetId } = _config('stripe/issuing')

exports.transactionsCreate = async (req, res, next) => {
    try {
        const transactionsCreateRes = await transactionsCreate(req.body)
        res.success(transactionsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.transactionsUpdate = async (req, res, next) => {
    try {
        const transactionsCreateRes = await transactionsUpdate(req.body)
        res.success(transactionsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.transactionsGetAll = async (req, res, next) => {
    try {
        const transactionsCreateRes = await transactionsGetAll(req.body)
        res.success(transactionsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.transactionsGetId = async (req, res, next) => {
    try {
        const transactionsCreateRes = await transactionsGetId(req.body)
        res.success(transactionsCreateRes)
    } catch (error) {
        res.error(error)
    }
}