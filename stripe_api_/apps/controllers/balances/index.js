"use strict"

const { customersCreateBank, balanceRetrieve, customersCreateSource, balanceTransactionsList, balanceTransactionsGetId } = _config('stripe/balances')

exports.createBankAccount = async (req, res, next) => {
    const {
        country,
        currency,
        account_holder_name,
        account_holder_type,
        routing_number,
        account_number,
    } = req.body
    console.log({
        country,
        currency,
        account_holder_name,
        account_holder_type,
        routing_number,
        account_number
    })
    try {
        const resApiCall = await customersCreateBank({
            country,
            currency,
            account_holder_name,
            account_holder_type,
            routing_number,
            account_number
        })
        res.success(resApiCall)
    } catch (error) {
        res.error(error)
    }
}

exports.balanceRetrieveCtl = async (req, res, next) => {
    await balanceRetrieve((error, resBalance) => {
        console.log(resBalance)
        if (error)
            res.error(error)
        res.success(resBalance)
    })
}

exports.customersCreateSourcCtl = async (req, res, next) => {
    // const {
    //     country,
    //     currency,
    //     account_holder_name,
    //     account_holder_type,
    //     routing_number,
    //     account_number,
    // } = req.body

    try {
        // console.log(req.body)
        // const resApiCall = await customersCreateSource(
        //     'cus_K67C7ZQcIu28xD',
        //     {
        //         source: 'bank_account',
        //         ...req.body
        //     }
        // )
        res.success(resApiCall)
    } catch (error) {
        res.error(error)
    }
}

exports.balanceTransactionsList = async (req, res, next) => {
    try {
        const balanceTransactionsListRes = await balanceTransactionsList(req.params.id)
        res.success(balanceTransactionsListRes)
    } catch (error) {
        res.error(error)
    }
}

exports.balanceTransactionsGetId = async (req, res, next) => {
    try {
        const balanceTransactionsGetIdRes = await balanceTransactionsGetId(req.params.id)
        res.success(balanceTransactionsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}