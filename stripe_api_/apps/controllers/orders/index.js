"use strict"

const { ordersGetId, ordersUpdate, ordersPay, ordersList, ordersReturn, ordersCreate } = _config('stripe/order')

exports.ordersCreate = async (req, res, next) => {
    try {
        const ordersCreateRes = await ordersCreate(req.body)
        res.success(ordersCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.ordersList = async (req, res, next) => {
    try {
        const ordersListRes = await ordersList(req.body)
        res.success(ordersListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.ordersGetId = async (req, res, next) => {
    try {
        const ordersGetIdRes = await ordersGetId(req.body)
        res.success(ordersGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.ordersUpdate = async (req, res, next) => {
    try {
        const ordersUpdateRes = await ordersUpdate(req.body)
        res.success(ordersUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.ordersPay = async (req, res, next) => {
    try {
        const ordersPayRes = await ordersPay(req.body)
        res.success(ordersPayRes)
    } catch (error) {
        res.error(error)
    }
}
exports.ordersReturn = async (req, res, next) => {
    try {
        const ordersReturnRes = await ordersReturn(req.body)
        res.success(ordersReturnRes)
    } catch (error) {
        res.error(error)
    }
}