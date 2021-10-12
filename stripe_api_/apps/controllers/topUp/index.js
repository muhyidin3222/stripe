"use strict"

const { topUpCreate, topUpGetId, topUpUpdate, topUpList } = _config('stripe/topUp')

exports.topUpCreate = async (req, res, next) => {
    try {
        const topUpCreateRes = await topUpCreate(req.body)
        res.success(topUpCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.topUpUpdate = async (req, res, next) => {
    try {
        const topUpUpdateRes = await topUpUpdate(req.body)
        res.success(topUpUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.topUpList = async (req, res, next) => {
    try {
        const topUpListRes = await topUpList(req.body)
        res.success(topUpListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.topUpGetId = async (req, res, next) => {
    try {
        const topUpGetIdRes = await topUpGetId(req.params.id)
        res.success(topUpGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.topUpCancel = async (req, res, next) => {
    try {
        const topUpCancelRes = await topUpCancel(req.params.id)
        res.success(topUpCancelRes)
    } catch (error) {
        res.error(error)
    }
}