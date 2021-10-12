"use strict"

const { authorizationsApprove, authorizationsDecline, authorizationsUpdate, authorizationsGetAll, authorizationsGetId } = _config('stripe/issuing')

exports.authorizationsUpdate = async (req, res, next) => {
    try {
        const authorizationsCreateRes = await authorizationsUpdate(req.body)
        res.success(authorizationsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.authorizationsGetAll = async (req, res, next) => {
    try {
        const authorizationsCreateRes = await authorizationsGetAll(req.body)
        res.success(authorizationsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.authorizationsGetId = async (req, res, next) => {
    try {
        const authorizationsCreateRes = await authorizationsGetId(req.body)
        res.success(authorizationsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.authorizationsApprove = async (req, res, next) => {
    try {
        const authorizationsCreateRes = await authorizationsApprove(req.body)
        res.success(authorizationsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.authorizationsDecline = async (req, res, next) => {
    try {
        const authorizationsCreateRes = await authorizationsDecline(req.body)
        res.success(authorizationsCreateRes)
    } catch (error) {
        res.error(error)
    }
}