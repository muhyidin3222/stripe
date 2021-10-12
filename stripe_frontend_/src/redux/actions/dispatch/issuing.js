import { message } from 'antd';
import {
    cardholderCreateService,
    cardholderUpdateService,
    cardholderGetAllService,
    cardholderGetIdService,

    cardCreateService,
    cardUpdateService,
    cardGetAllService,
    cardGetIdService,

    disputesCreateService,
    disputesUpdateService,
    disputesGetAllService,
    disputesGetIdService,

    transactionsCreateService,
    transactionsUpdateService,
    transactionsGetAllService,
    transactionsGetIdService,

    authorizationsApproveService,
    authorizationsUpdateService,
    authorizationsGetAllService,
    authorizationsGetIdService,
    authorizationsDeclineService,
} from 'services/issuing';
import {
    ISSUING_CARDHOLDER_GET,
    ISSUING_CARDHOLDER_CREATE,
    ISSUING_CARDHOLDER_UPDATE,
    ISSUING_CARDHOLDER_GET_ID,

    ISSUING_CARD_GET,
    ISSUING_CARD_CREATE,
    ISSUING_CARD_UPDATE,
    ISSUING_CARD_GET_ID,

    LOADING_GET,
    LOADING_CREATE,
    LOADING_UPDATE,
    LOADING_GET_ID,


    DISPUTES_GET,
    DISPUTES_CREATE,
    DISPUTES_UPDATE,
    DISPUTES_GET_ID,

    TRANSACTIONS_GET,
    TRANSACTIONS_CREATE,
    TRANSACTIONS_UPDATE,
    TRANSACTIONS_GET_ID,

    AUTHORIZATIONS_GET,
    AUTHORIZATIONS_DECLINE,
    AUTHORIZATIONS_APPROVE,
    AUTHORIZATIONS_UPDATE,
    AUTHORIZATIONS_GET_ID,

    ERROR_CREATE
} from 'redux/actions'

import { successHandle, errorHandle } from 'utils/handleRes'

// cardholder
export const cardholderCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resCardholderCreate = await cardholderCreateService(data)
        dispatch({ type: ISSUING_CARDHOLDER_CREATE, resCardholderCreate: resCardholderCreate?.data?.payload })
        dispatch({ type: ERROR_CREATE, errorCreate: {} })
        dispatch({ type: LOADING_CREATE, loadingGet: false })
        message.success("success create")
        return true
    } catch (error) {
        console.log(error)
        message.error(error?.response?.payload?.error?.message)
        dispatch({ type: ERROR_CREATE, errorCreate: error })
        dispatch({ type: LOADING_CREATE, loadingGet: false })
        return false
    }
};
export const cardholderUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resCardholderUpdate = await cardholderUpdateService(data)
        dispatch({ type: ISSUING_CARDHOLDER_UPDATE, resCardholderUpdate: resCardholderUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const cardholderGetAllDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCardholderGetAll = await cardholderGetAllService(data)
        dispatch({ type: ISSUING_CARDHOLDER_GET, resCardholderGetAll: resCardholderGetAll?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const cardholderGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resCardholderGetId = await cardholderGetIdService(data)
        dispatch({ type: ISSUING_CARDHOLDER_GET_ID, resCardholderGetId: resCardholderGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};


//card
export const cardCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resCardCreate = await cardCreateService(data)
        await dispatch({ type: ISSUING_CARD_CREATE, resCardCreate: resCardCreate?.data?.payload })
        await successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
};
export const cardUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resCardUpdate = await cardUpdateService(data)
        dispatch({ type: ISSUING_CARD_UPDATE, resCardUpdate: resCardUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const cardGetAllDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCardGetAll = await cardGetAllService(data)
        dispatch({ type: ISSUING_CARD_GET, resCardGetAll: resCardGetAll?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const cardGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resCardGetId = await cardGetIdService(data)
        dispatch({ type: ISSUING_CARD_GET_ID, resCardGetId: resCardGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};


export const disputesCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resDisputeCreate = await disputesCreateService(data)
        dispatch({ type: DISPUTES_CREATE, resDisputeCreate: resDisputeCreate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: false })
};
export const disputesUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resDisputeUpdate = await disputesUpdateService(data)
        dispatch({ type: DISPUTES_UPDATE, resDisputeUpdate: resDisputeUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const disputesGetAllDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resDisputeGetAll = await disputesGetAllService(data)
        dispatch({ type: DISPUTES_GET, resDisputeGetAll: resDisputeGetAll?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const disputesGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resDisputeGetId = await disputesGetIdService(data)
        dispatch({ type: DISPUTES_GET_ID, resDisputeGetId: resDisputeGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};


export const transactionCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resTransactionsCreate = await transactionsCreateService(data)
        dispatch({ type: TRANSACTIONS_CREATE, resTransactionsCreate: resTransactionsCreate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: false })
};
export const transactionUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resTransactionsUpdate = await transactionsUpdateService(data)
        dispatch({ type: TRANSACTIONS_UPDATE, resTransactionsUpdate: resTransactionsUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const transactionGetAllDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resTransactionsGetAll = await transactionsGetAllService(data)
        dispatch({ type: TRANSACTIONS_GET, resTransactionsGetAll: resTransactionsGetAll?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const transactionGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resTransactionsGetId = await transactionsGetIdService(data)
        dispatch({ type: TRANSACTIONS_GET_ID, resTransactionsGetId: resTransactionsGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};


export const authorizationsApproveDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resAuthorizationsApprove = await authorizationsApproveService(data)
        dispatch({ type: AUTHORIZATIONS_APPROVE, resAuthorizationsApprove: resAuthorizationsApprove?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: false })
};
export const authorizationsUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resAuthorizationsUpdate = await authorizationsUpdateService(data)
        dispatch({ type: AUTHORIZATIONS_UPDATE, resAuthorizationsUpdate: resAuthorizationsUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const authorizationsGetAllDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resAuthorizationsGetAll = await authorizationsGetAllService(data)
        dispatch({ type: AUTHORIZATIONS_GET, resAuthorizationsGetAll: resAuthorizationsGetAll?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const authorizationsGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resAuthorizationsGetId = await authorizationsGetIdService(data)
        dispatch({ type: AUTHORIZATIONS_GET_ID, resAuthorizationsGetId: resAuthorizationsGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};
export const authorizationsDeclineDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resAuthorizationsDecline = await authorizationsDeclineService(data)
        dispatch({ type: AUTHORIZATIONS_DECLINE, resAuthorizationsDecline: resAuthorizationsDecline?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};