'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('subscriptions/index')

    router.post('/subscriptionsCreate', controller.subscriptionsCreate)
    router.get('/subscriptionsGetId/:id', controller.subscriptionsGetId)
    router.post('/subscriptionsList', controller.subscriptionsList)
    router.put('/subscriptionsUpdate', controller.subscriptionsUpdate)
    router.delete('/subscriptionsDelete', controller.subscriptionsDelete)

    return router
}