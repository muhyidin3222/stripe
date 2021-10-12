'use strict';

module.exports = () => {
    const router = require('express').Router();

    const products = _controller('products/products')
    const prices = _controller('products/prices')
    const coupons = _controller('products/coupons')
    const taxCode = _controller('products/taxCodes')
    const taxRate = _controller('products/taxRates')
    const promotionCodes = _controller('products/promotion')
    const deleteDiscount = _controller('products/deleteDiscount')

    router.post('/productsCreate', products.productsCreate)
    router.put('/productsUpdate', products.productsUpdate)
    router.post('/productsGetAll', products.productsGetAll)
    router.get('/productsGetId/:id', products.productsGetId)
    router.delete('/productsDelete/:id', products.productsDelete)

    router.post('/pricesCreate', prices.pricesCreate)
    router.put('/pricesUpdate', prices.pricesUpdate)
    router.post('/pricesGetAll', prices.pricesGetAll)
    router.get('/pricesGetId/:id', prices.pricesGetId)

    router.post('/couponsCreate', coupons.couponsCreate)
    router.put('/couponsUpdate', coupons.couponsUpdate)
    router.post('/couponsGetAll', coupons.couponsGetAll)
    router.get('/couponsGetId/:id', coupons.couponsGetId)

    router.post('/taxCodesGetAll', taxCode.taxCodesGetAll)
    router.post('/taxCodesUpdate', taxCode.taxCodesUpdate)

    router.post('/taxRatesCreate', taxRate.taxRatesCreate)
    router.put('/taxRatesUpdate', taxRate.taxRatesUpdate)
    router.post('/taxRatesGetAll', taxRate.taxRatesGetAll)
    router.get('/taxRatesGetId/:id', taxRate.taxRatesGetId)

    router.post('/promotionCodesCreate', promotionCodes.promotionCodesCreate)
    router.put('/promotionCodesUpdate', promotionCodes.promotionCodesUpdate)
    router.post('/promotionCodesGetAll', promotionCodes.promotionCodesGetAll)
    router.post('/promotionCodesGetId', promotionCodes.promotionCodesGetId)

    router.delete('/subscriptionsDeleteDiscount', deleteDiscount.subscriptionsDeleteDiscount)
    router.delete('/subscriptionsDeleteDiscount', deleteDiscount.subscriptionsDeleteDiscount)
    
    return router
}

