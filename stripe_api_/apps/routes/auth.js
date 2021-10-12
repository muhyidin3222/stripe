'use strict';

module.exports = () => {
    const router = require('express').Router();
    const controller = _controller('auth/index')
    
    router.post('/login', controller.login)

    return router
}