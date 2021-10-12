'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('disputes/index')

    router.post('/disputesCreate', controller.disputesCreate)
    router.get('/disputesGetId/:id', controller.disputesGetId)
    router.post('/disputesList', controller.disputesList)
    router.put('/disputesUpdate', controller.disputesUpdate)

    return router
}