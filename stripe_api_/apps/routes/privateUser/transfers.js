'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('transfers/index')

    router.post('/transfersCreate', controller.transfersCreate)
    router.get('/transfersGetId/:id', controller.transfersGetId)
    router.post('/transfersList', controller.transfersList)
    router.put('/transfersUpdate', controller.transfersUpdate)

    return router
}