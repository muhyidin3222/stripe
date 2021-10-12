'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('invoices/index')

    router.post('/invoicesCreate', controller.invoicesCreate)
    router.post('/invoicesGetId', controller.invoicesGetId)
    router.post('/invoicesDelete', controller.invoicesDelete)
    router.post('/invoicesList', controller.invoicesList)
    router.post('/invoicesUpdate', controller.invoicesUpdate)
    router.post('/invoicesFinalizeInvoice', controller.invoicesFinalizeInvoice)
    router.post('/invoicesPay', controller.invoicesPay)
    router.post('/invoicesSendInvoice', controller.invoicesSendInvoice)
    router.post('/invoicesVoidInvoice', controller.invoicesVoidInvoice)
    router.post('/invoicesMarkUncollectible', controller.invoicesMarkUncollectible)
    router.post('/invoicesListLineItems', controller.invoicesListLineItems)
    router.post('/invoicesRetrieveUpcoming', controller.invoicesRetrieveUpcoming)
    router.post('/invoicesListUpcomingLineItems', controller.invoicesListUpcomingLineItems)

    return router
}