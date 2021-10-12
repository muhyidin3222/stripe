'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('quote/index')

    router.post('/quoteCreate', controller.quoteCreate)
    router.post('/quoteGetId', controller.quoteGetId)
    router.post('/quoteDelete', controller.quoteDelete)
    router.post('/quoteList', controller.quoteList)
    router.post('/quoteUpdate', controller.quoteUpdate)
    router.post('/quoteFinalizeQuote', controller.quoteFinalizeQuote)
    router.post('/quoteAcceptQuote', controller.quoteAcceptQuote)
    router.post('/quoteCancelQuote', controller.quoteCancelQuote)
    router.post('/quotePdf', controller.quotePdf)
    router.post('/quoteListLineItems', controller.quoteListLineItems)
    router.post('/quoteListComputedUpfrontLineItems', controller.quoteListComputedUpfrontLineItems)

    return router
}