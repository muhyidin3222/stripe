"use strict"

const { paymentCreate, paymentGetId, paymentUpdate, paymentConfirm, paymentCapture, paymentCancel, paymentList, applicationFeesList, applicationFeesGetId } = _config('stripe/payment')
const { reviewsApprove, reviewsGetId, reviewsList } = _config('stripe/review')

exports.paymentCreate = async (req, res, next) => {
    try {
        const paymentCreateRes = await paymentCreate(req.body)
        res.success(paymentCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentGetId = async (req, res, next) => {
    try {
        const paymentGetIdRes = await paymentGetId(req.body)
        res.success(paymentGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentUpdate = async (req, res, next) => {
    try {
        const paymentUpdateRes = await paymentUpdate(req.body)
        res.success(paymentUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentConfirm = async (req, res, next) => {
    try {
        const paymentConfirmRes = await paymentConfirm(req.body)
        res.success(paymentConfirmRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentCapture = async (req, res, next) => {
    try {
        const paymentCaptureRes = await paymentCapture(req.body)
        res.success(paymentCaptureRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentCancel = async (req, res, next) => {
    try {
        const paymentCancelRes = await paymentCancel(req.body)
        res.success(paymentCancelRes)
    } catch (error) {
        res.error(error)
    }
}
exports.paymentList = async (req, res, next) => {
    try {
        const paymentListRes = await paymentList(req.body)
        res.success(paymentListRes)
    } catch (error) {
        res.error(error)
    }
}

exports.reviewsApprove = async (req, res, next) => {
    try {
        const reviewsApproveRes = await reviewsApprove(req.body)
        res.success(reviewsApproveRes)
    } catch (error) {
        res.error(error)
    }
}
exports.reviewsGetId = async (req, res, next) => {
    try {
        const reviewsGetIdRes = await reviewsGetId(req.body)
        res.success(reviewsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.reviewsList = async (req, res, next) => {
    try {
        const reviewsListRes = await reviewsList(req.body)
        res.success(reviewsListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.applicationFeesList = async (req, res, next) => {
    try {
        const applicationFeesListRes = await applicationFeesList(req.body)
        res.success(applicationFeesListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.applicationFeesGetId = async (req, res, next) => {
    try {
        const applicationFeesGetIdRes = await applicationFeesGetId(req.body)
        res.success(applicationFeesGetIdRes)
    } catch (error) {
        res.error(error)
    }
}