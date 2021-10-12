"use strict"

const { transfersCreate, transfersGetId, transfersUpdate, transfersList } = _config('stripe/transfers')

exports.transfersCreate = async (req, res, next) => {
    try {
        const transfersCreateRes = await transfersCreate(req.body)
        res.success(transfersCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.transfersUpdate = async (req, res, next) => {
    try {
        const transfersUpdateRes = await transfersUpdate(req.body)
        res.success(transfersUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.transfersList = async (req, res, next) => {
    try {
        const transfersListRes = await transfersList(req.body)
        res.success(transfersListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.transfersGetId = async (req, res, next) => {
    try {
        const transfersGetIdRes = await transfersGetId(req.params.id)
        res.success(transfersGetIdRes)
    } catch (error) {
        res.error(error)
    }
}