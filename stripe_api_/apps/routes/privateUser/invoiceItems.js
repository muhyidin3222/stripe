'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('invoiceItems/index')

    router.post('/invoiceItemsCreate', controller.invoiceItemsCreate)
    router.get('/invoiceItemsGetId/:id', controller.invoiceItemsGetId)
    router.post('/invoiceItemsList', controller.invoiceItemsList)
    router.put('/invoiceItemsUpdate', controller.invoiceItemsUpdate)
    router.delete('/invoiceItemsDelete', controller.invoiceItemsDelete)

    return router
}