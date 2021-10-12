"use strict"

const { invoicesCreate, invoicesGetId, invoicesDelete, invoicesList, invoicesUpdate, invoicesFinalizeInvoice, invoicesPay, invoicesSendInvoice, invoicesVoidInvoice, invoicesMarkUncollectible, invoicesListLineItems, invoicesRetrieveUpcoming, invoicesListUpcomingLineItems } = _config('stripe/invoices')

exports.invoicesCreate = async (req, res, next) => {
    try {
        const invoicesCreateRes = await invoicesCreate(req.body)
        res.success(invoicesCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesGetId = async (req, res, next) => {
    try {
        const invoicesGetIdRes = await invoicesGetId(req.body)
        res.success(invoicesGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesDelete = async (req, res, next) => {
    try {
        const invoicesDeleteRes = await invoicesDelete(req.body)
        res.success(invoicesDeleteRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesList = async (req, res, next) => {
    try {
        const invoicesListRes = await invoicesList(req.body)
        res.success(invoicesListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesUpdate = async (req, res, next) => {
    try {
        const invoicesUpdateRes = await invoicesUpdate(req.body)
        res.success(invoicesUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesFinalizeInvoice = async (req, res, next) => {
    try {
        const invoicesFinalizeInvoiceRes = await invoicesFinalizeInvoice(req.body)
        res.success(invoicesFinalizeInvoiceRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesPay = async (req, res, next) => {
    try {
        const invoicesPayRes = await invoicesPay(req.body)
        res.success(invoicesPayRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesSendInvoice = async (req, res, next) => {
    try {
        const invoicesSendInvoiceRes = await invoicesSendInvoice(req.body)
        res.success(invoicesSendInvoiceRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesVoidInvoice = async (req, res, next) => {
    try {
        const invoicesVoidInvoiceRes = await invoicesVoidInvoice(req.body)
        res.success(invoicesVoidInvoiceRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesMarkUncollectible = async (req, res, next) => {
    try {
        const invoicesMarkUncollectibleRes = await invoicesMarkUncollectible(req.body)
        res.success(invoicesMarkUncollectibleRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesListLineItems = async (req, res, next) => {
    try {
        const invoicesListLineItemsRes = await invoicesListLineItems(req.body)
        res.success(invoicesListLineItemsRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesRetrieveUpcoming = async (req, res, next) => {
    try {
        const invoicesRetrieveUpcomingRes = await invoicesRetrieveUpcoming(req.body)
        res.success(invoicesRetrieveUpcomingRes)
    } catch (error) {
        res.error(error)
    }
}
exports.invoicesListUpcomingLineItems = async (req, res, next) => {
    try {
        const invoicesListUpcomingLineItemsRes = await invoicesListUpcomingLineItems(req.body)
        res.success(invoicesListUpcomingLineItemsRes)
    } catch (error) {
        res.error(error)
    }
}