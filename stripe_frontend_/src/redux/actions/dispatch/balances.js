import { createBankAccountService, balanceRetrieveService, customersCreateSourceService, balanceTransactionsListService } from 'services/balances';
import { BALANCES_CREATE_BANK_ACCOUNT, GET_BALANCE_RETRIEVE, CUSTOMERS_CREATE_COURCE, LOADING_GET, GET_BALANCE_TRANSACTION, LOADING_CREATE, ERROR_GET } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const createBankAccountDispatch = (data) => async (dispatch, getState) => {
    // const resCreate = await createBankAccountService(data)
    // dispatch(() => {
    //     return {
    //         type: BALANCES_CREATE_BANK_ACCOUNT,
    //         dataDetail: resCreate
    //     };
    // })

    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCustomersCreate = await createBankAccountService(data)
        dispatch({ type: BALANCES_CREATE_BANK_ACCOUNT, resCustomersCreate: resCustomersCreate })
        successHandle({ dispatch, typeLoading: LOADING_GET, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        console.log(ERROR_GET)
        return false
    }
};

export const balanceRetrieveDispatch = () => async (dispatch, getState) => {
    try {
        dispatch({ type: LOADING_GET, loadingGet: true })
        const resBalanceRetrieveData = await balanceRetrieveService()
        // dispatch({ type: LOADING_GET, loadingGet: false })
        dispatch({ type: GET_BALANCE_RETRIEVE, balanceRetrieveData: resBalanceRetrieveData?.data?.payload })
        successHandle({ dispatch, typeLoading: LOADING_GET, type: "get" })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        return false
    }
};

export const customersCreateSourceDispatch = () => async (dispatch, getState) => {

    const customersCreateSourceData = await customersCreateSourceService()
    // console.log(customersCreateSourceData)
    dispatch({
        type: CUSTOMERS_CREATE_COURCE,
        customersCreateSource: customersCreateSourceData?.data?.payload
    })
    dispatch({
        type: LOADING_GET,
        loadingGet: false
    })
};


export const balanceTransactionsListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resBalanceTransactionsList = await balanceTransactionsListService(data)
        dispatch({ type: GET_BALANCE_TRANSACTION, resBalanceTransactionsList: resBalanceTransactionsList?.data?.payload })
    } catch (error) {
        console.log(error)
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}