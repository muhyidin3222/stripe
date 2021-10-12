"use strict"

const { quoteCreate, quoteGetId, quoteDelete, quoteList, quoteUpdate, quoteFinalizeQuote, quoteAcceptQuote, quoteCancelQuote, quotePdf, quoteListLineItems, quoteListComputedUpfrontLineItems } = _config('stripe/quote')

exports.quoteCreate = async (req, res, next) => {
    try {
        const quoteCreateRes = await quoteCreate(req.body)
        res.success(quoteCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteGetId = async (req, res, next) => {
    try {
        const quoteGetIdRes = await quoteGetId(req.body)
        res.success(quoteGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteDelete = async (req, res, next) => {
    try {
        const quoteDeleteRes = await quoteDelete(req.body)
        res.success(quoteDeleteRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteList = async (req, res, next) => {
    try {
        const quoteListRes = await quoteList(req.body)
        res.success(quoteListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteUpdate = async (req, res, next) => {
    try {
        const quoteUpdateRes = await quoteUpdate(req.body)
        res.success(quoteUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteFinalizeQuote = async (req, res, next) => {
    try {
        const quoteFinalizeQuoteRes = await quoteFinalizeQuote(req.body)
        res.success(quoteFinalizeQuoteRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteAcceptQuote = async (req, res, next) => {
    try {
        const quoteAcceptQuoteRes = await quoteAcceptQuote(req.body)
        res.success(quoteAcceptQuoteRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteCancelQuote = async (req, res, next) => {
    try {
        const quoteCancelQuoteRes = await quoteCancelQuote(req.body)
        res.success(quoteCancelQuoteRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quotePdf = async (req, res, next) => {
    try {
        const quotePdfRes = await quotePdf(req.body)
        res.success(quotePdfRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteListLineItems = async (req, res, next) => {
    try {
        const quoteListLineItemsRes = await quoteListLineItems(req.body)
        res.success(quoteListLineItemsRes)
    } catch (error) {
        res.error(error)
    }
}
exports.quoteListComputedUpfrontLineItems = async (req, res, next) => {
    try {
        const quoteListComputedUpfrontLineItemsRes = await quoteListComputedUpfrontLineItems(req.body)
        res.success(quoteListComputedUpfrontLineItemsRes)
    } catch (error) {
        res.error(error)
    }
}