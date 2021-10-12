import { customersCreateService, customersGetIdService, customersDeleteService, customersListService, customersUpdateService, customersBankService } from 'services/customers';
import { CUSTOMERS_CREATE, CUSTOMERS_UPDATE, CUSTOMERS_GET, CUSTOMERS_GET_ID, CUSTOMERS_DELETE, ERROR_GET, LOADING_GET, LOADING_CREATE, LOADING_UPDATE, ERROR_CREATE, CUSTOMERS_BANK } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const customersCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resCustomersCreate = await customersCreateService(data)
        dispatch({ type: CUSTOMERS_CREATE, resCustomersCreate: resCustomersCreate })
        await successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
}

export const customersGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCustomersGetId = await customersGetIdService(id)
        // console.log("customersGetIdDispatch", resCustomersGetId)
        dispatch({ type: CUSTOMERS_GET_ID, resCustomersGetId: resCustomersGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const customersDeleteDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resCustomeelete = await customersDeleteService(data)
        dispatch({ type: CUSTOMERS_DELETE, resCustomersDelete: resCustomeelete?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const customersListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCustomersList = await customersListService(data)
        dispatch({ type: CUSTOMERS_GET, resCustomersList: resCustomersList?.data?.payload })
    } catch (error) {
        console.log(error)
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const customersUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resCustomersUpdate = await customersUpdateService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resCustomersUpdate: resCustomersUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}

export const customersBankDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCustomersBank = await customersBankService(data)
        dispatch({ type: CUSTOMERS_BANK, resCustomersBank: resCustomersBank?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}