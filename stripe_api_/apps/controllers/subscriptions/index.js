"use strict"

const { subscriptionsCreate, subscriptionsGetId, subscriptionsList, subscriptionsUpdate, subscriptionsDelete } = _config('stripe/subscriptions')

exports.subscriptionsCreate = async (req, res, next) => {
    try {
        const subscriptionsCreateRes = await subscriptionsCreate(req.body)
        res.success(subscriptionsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.subscriptionsUpdate = async (req, res, next) => {
    try {
        const subscriptionsUpdateRes = await subscriptionsUpdate(req.body)
        res.success(subscriptionsUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.subscriptionsList = async (req, res, next) => {
    try {
        const subscriptionsListRes = await subscriptionsList(req.body)
        res.success(subscriptionsListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.subscriptionsGetId = async (req, res, next) => {
    try {
        const subscriptionsGetIdRes = await subscriptionsGetId(req.params.id)
        res.success(subscriptionsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.subscriptionsDelete = async (req, res, next) => {
    try {
        const subscriptionsGetIdRes = await subscriptionsDelete(req.params.id)
        res.success(subscriptionsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}