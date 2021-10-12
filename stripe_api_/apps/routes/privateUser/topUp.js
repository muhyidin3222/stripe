'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('topUp/index')

    router.post('/topUpCreate', controller.topUpCreate)
    router.get('/topUpGetId/:id', controller.topUpGetId)
    router.post('/topUpList', controller.topUpList)
    router.put('/topUpUpdate', controller.topUpUpdate)
    router.post('/topUpCancel', controller.topUpCancel)

    return router
}