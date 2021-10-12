'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('events/index')

    router.get('/eventsGetId/:id', controller.eventsGetId)
    router.post('/eventsList', controller.eventsList)

    return router
}