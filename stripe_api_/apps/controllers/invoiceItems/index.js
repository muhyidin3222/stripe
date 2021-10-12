"use strict"

const { invoiceItemsCreate, invoiceItemsGetId, invoiceItemsList, invoiceItemsUpdate, invoiceItemsDelete } = _config('stripe/invoiceItems')

exports.invoiceItemsCreate = async (req, res, next) => {
    try {
        const invoiceItemsCreateRes = await invoiceItemsCreate(req.body)
        res.success(invoiceItemsCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoiceItemsUpdate = async (req, res, next) => {
    try {
        const invoiceItemsUpdateRes = await invoiceItemsUpdate(req.body)
        res.success(invoiceItemsUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoiceItemsList = async (req, res, next) => {
    try {
        const invoiceItemsListRes = await invoiceItemsList(req.body)
        res.success(invoiceItemsListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoiceItemsGetId = async (req, res, next) => {
    try {
        const invoiceItemsGetIdRes = await invoiceItemsGetId(req.params.id)
        res.success(invoiceItemsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoiceItemsDelete = async (req, res, next) => {
    try {
        const invoiceItemsGetIdRes = await invoiceItemsDelete(req.params.id)
        res.success(invoiceItemsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}