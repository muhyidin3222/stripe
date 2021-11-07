'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();
    const controller = _controller('balances/index')
    

    router.post('/createBankAccount', controller.createBankAccount)
    router.get('/balanceRetrieve', controller.balanceRetrieveCtl)
    router.post('/customersCreateSource', controller.customersCreateSourcCtl)
    router.post('/balanceTransactionsList', controller.balanceTransactionsList)
    router.post('/balanceTransactionsGetId', controller.balanceTransactionsGetId)
    
    return router
}