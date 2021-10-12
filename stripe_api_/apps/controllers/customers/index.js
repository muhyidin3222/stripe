"use strict"

const { customersCreate, customersGetId, customersUpdate, customersList, customersDelete, customersBank } = _config('stripe/customers')

exports.customersCreate = async (req, res, next) => {
    try {
        const customersCreateRes = await customersCreate(req.body)
        res.success(customersCreateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.customersUpdate = async (req, res, next) => {
    // const { id } = req.body
    const id = req.body.id
    delete req.body.id
    try {
        console.log(req.body)
        const customersUpdateRes = await customersUpdate(id, req.body)
        res.success(customersUpdateRes)
    } catch (error) {
        res.error(error)
    }
}
exports.customersList = async (req, res, next) => {
    try {
        console.log(req.body)
        const customersListRes = await customersList(req.body)
        res.success(customersListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.customersGetId = async (req, res, next) => {
    try {
        const customersGetIdRes = await customersGetId(req.params.id)
        res.success(customersGetIdRes)
    } catch (error) {
        res.error(error)
    }
}
exports.customersDelete = async (req, res, next) => {
    try {
        const customersDeleteRes = await customersDelete(req.body)
        res.success(customersDeleteRes)
    } catch (error) {
        res.error(error)
    }
}
exports.customersBank = async (req, res, next) => {
    try {
        console.log(req.body)
        const customersBankRes = await customersBank(req.body)
        res.success(customersBankRes)
    } catch (error) {
        res.error(error)
    }
}

