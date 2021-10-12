"use strict"

const { disputesCreate, disputesUpdate, disputesGetAll, disputesGetId } = _config('stripe/issuing')

exports.disputesCreate = async (req, res, next) => {
    try {
        const disputesCreateRes = await disputesCreate(req.body)
        res.success(disputesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.disputesUpdate = async (req, res, next) => {
    try {
        const disputesCreateRes = await disputesUpdate(req.body)
        res.success(disputesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.disputesGetAll = async (req, res, next) => {
    try {
        const disputesCreateRes = await disputesGetAll(req.body)
        res.success(disputesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.disputesGetId = async (req, res, next) => {
    try {
        const disputesCreateRes = await disputesGetId(req.body)
        res.success(disputesCreateRes)
    } catch (error) {
        res.error(error)
    }
}