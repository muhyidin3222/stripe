"use strict"

const { payOutCreate, payOutGetId, payOutUpdate, payOutList } = _config('stripe/payOut')

exports.payOutCreate = async (req, res, next) => {
    try {
        const payOutCreateRes = await payOutCreate(req.body)
        res.success(payOutCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.payOutUpdate = async (req, res, next) => {
    try {
        const payOutUpdateRes = await payOutUpdate(req.body)
        res.success(payOutUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.payOutList = async (req, res, next) => {
    try {
        const payOutListRes = await payOutList(req.body)
        res.success(payOutListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.payOutGetId = async (req, res, next) => {
    try {
        const payOutGetIdRes = await payOutGetId(req.params.id)
        res.success(payOutGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.payOutCancel = async (req, res, next) => {
    try {
        const payOutCancelRes = await payOutCancel(req.params.id)
        res.success(payOutCancelRes)
    } catch (error) {
        res.error(error)
    }
}