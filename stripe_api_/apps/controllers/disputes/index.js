"use strict"

const { disputesCreate, disputesGetId, disputesList, disputesUpdate } = _config('stripe/disputes')

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
        const disputesUpdateRes = await disputesUpdate(req.body)
        res.success(disputesUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.disputesList = async (req, res, next) => {
    try {
        const disputesListRes = await disputesList(req.body)
        res.success(disputesListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.disputesGetId = async (req, res, next) => {
    try {
        const disputesGetIdRes = await disputesGetId(req.params.id)
        res.success(disputesGetIdRes)
    } catch (error) {
        res.error(error)
    }
}