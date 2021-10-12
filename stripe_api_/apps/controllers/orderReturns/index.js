"use strict"

const { ordersUpdate, ordersList } = _config('stripe/orderReturns')

exports.ordersList = async (req, res, next) => {
    try {
        const ordersListRes = await ordersList(req.body)
        res.success(ordersListRes)
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