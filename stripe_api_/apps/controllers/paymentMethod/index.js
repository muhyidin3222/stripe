"use strict"

const { paymentMethodCreate, paymentMethodGetId, paymentMethodUpdate, paymentMethodList } = _config('stripe/paymentMethod')


exports.paymentMethodCreate = async (req, res, next) => {
    try {
        const paymentMethodCreateRes = await paymentMethodCreate(req.body)
        res.success(paymentMethodCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentMethodGetId = async (req, res, next) => {
    try {
        const paymentMethodGetIdRes = await paymentMethodGetId(req.body)
        res.success(paymentMethodGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentMethodUpdate = async (req, res, next) => {
    try {
        const paymentMethodUpdateRes = await paymentMethodUpdate(req.body)
        res.success(paymentMethodUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentMethodList = async (req, res, next) => {
    try {
        const paymentMethodListRes = await paymentMethodList(req.body)
        res.success(paymentMethodListRes)
    } catch (error) {
        res.error(error)
    }
}