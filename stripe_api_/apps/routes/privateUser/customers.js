'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('customers/index')

    router.post('/customersCreate', controller.customersCreate)
    router.get('/customersGetId/:id', controller.customersGetId)
    router.delete('/customersDelete', controller.customersDelete)
    router.post('/customersList', controller.customersList)
    router.put('/customersUpdate', controller.customersUpdate)
    router.get('/customersBank', controller.customersBank)
    
    return router
}

