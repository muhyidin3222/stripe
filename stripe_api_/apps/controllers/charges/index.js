"use strict"

const { chargesCreate, chargesGetId, chargesCapture, chargesList, chargesUpdate } = _config('stripe/charges')

exports.chargesCreate = async (req, res, next) => {
    try {
        const chargesCreateRes = await chargesCreate(req.body)
        res.success(chargesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.chargesUpdate = async (req, res, next) => {
    try {
        const chargesUpdateRes = await chargesUpdate(req.body)
        res.success(chargesUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.chargesList = async (req, res, next) => {
    try {
        const chargesListRes = await chargesList(req.body)
        res.success(chargesListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.chargesGetId = async (req, res, next) => {
    try {
        const chargesGetIdRes = await chargesGetId(req.body)
        res.success(chargesGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.chargesCapture = async (req, res, next) => {
    try {
        const chargesCaptureRes = await chargesCapture(req.body)
        res.success(chargesCaptureRes)
    } catch (error) {
        res.error(error)
    }
}