"use strict"

const { customersCreate } = _config('stripe')

exports.login = async (req, res, next) => {
    // const {
    //     country,
    //     currency,
    //     account_holder_name,
    //     account_holder_type,
    //     routing_number,
    //     account_number,
    // } = req.body

    try {
        const resApiCall = await customersCreate(req.body || {})
        res.success(resApiCall)
    } catch (error) {
        res.error(error)
    }
}