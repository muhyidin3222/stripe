'use strict';

module.exports = (req, res) => {
    const router = require('express').Router();

    const card = _controller('issuing/card')
    const cardholder = _controller('issuing/cardholder')
    const disputes = _controller('issuing/disputes')
    const transactions = _controller('issuing/transactions')
    const authorizations = _controller('issuing/authorizations')


    router.post('/cardholderCreate', cardholder.cardholderCreate)
    router.put('/cardholderUpdate', cardholder.cardholderUpdate)
    router.post('/cardholderGetAll', cardholder.cardholderGetAll)
    router.get('/cardholderGetId', cardholder.cardholderGetId)

    router.post('/cardCreate', card.cardCreate)
    router.put('/cardUpdate', card.cardUpdate)
    router.post('/cardGetAll', card.cardGetAll)
    router.get('/cardGetId', card.cardGetId)

    router.post('/disputesCreate', disputes.disputesCreate)
    router.put('/disputesUpdate', disputes.disputesUpdate)
    router.post('/disputesGetAll', disputes.disputesGetAll)
    router.get('/disputesGetId', disputes.disputesGetId)

    router.post('/transactionsCreate', transactions.transactionsCreate)
    router.put('/transactionsUpdate', transactions.transactionsUpdate)
    router.get('/transactionsGetAll', transactions.transactionsGetAll)
    router.get('/transactionsGetId', transactions.transactionsGetId)

    router.post('/authorizationsApprove', authorizations.authorizationsApprove)
    router.post('/authorizationsDecline', authorizations.authorizationsDecline)
    router.put('/authorizationsUpdate', authorizations.authorizationsUpdate)
    router.post('/authorizationsGetAll', authorizations.authorizationsGetAll)
    router.get('/authorizationsGetId', authorizations.authorizationsGetId)

    return router
}