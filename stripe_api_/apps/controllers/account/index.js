"use strict"

const { accountCreate, accountGetId, accountCapture, accountList, accountUpdate } = _config('stripe/account')

exports.accountCreate = async (req, res, next) => {
    try {
        const accountCreateRes = await accountCreate(req.body)
        res.success(accountCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.accountUpdate = async (req, res, next) => {
    try {
        const accountUpdateRes = await accountUpdate(req.body)
        res.success(accountUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.accountList = async (req, res, next) => {
    try {
        const accountListRes = await accountList(req.body)
        console.log(accountListRes)
        res.success(accountListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.accountGetId = async (req, res, next) => {
    try {
        const accountGetIdRes = await accountGetId(req.body)
        res.success(accountGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.accountCapture = async (req, res, next) => {
    try {
        const accountCaptureRes = await accountCapture(req.body)
        res.success(accountCaptureRes)
    } catch (error) {
        res.error(error)
    }
}