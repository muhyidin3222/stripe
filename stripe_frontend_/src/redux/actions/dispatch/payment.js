import {
    paymentCreateService,
    paymentUpdateService,
    paymentGetIdService,
    paymentListService,
    paymentConfirmService,
    paymentCaptureService,
    paymentCancelService,

    paymentMethodGetIdService,
    paymentMethodUpdateService,
    paymentMethodCreateService,
    paymentMethodListService,

    reviewListService,
    reviewGetIdService,
    reviewApproveService,

    applicationFeesGetIdService,
    applicationFeesListService
} from 'services/payment';

import {
    PAYMENT_CREATE,
    PAYMENT_UPDATE,
    PAYMENT_GET,
    PAYMENT_GET_ID,
    PAYMENT_CONFIRM,
    PAYMENT_CAPTURE,
    PAYMENT_CANCEL,

    PAYMENT_METHOD_CREATE,
    PAYMENT_METHOD_UPDATE,
    PAYMENT_METHOD_GET,
    PAYMENT_METHOD_GET_ID,

    LOADING_GET,
    LOADING_CREATE,
    LOADING_UPDATE,
    LOADING_GET_ID,
    LOADING_DELETE,

    REVIEW_APPROVE,
    REVIEW_GET_ID,
    REVIEW_LIST,

    APPLICATION_LIST,
    APPLICATION_GET_ID,
    ERROR_GET

} from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'
import { ERROR_CREATE } from '../type';

export const paymentGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resPaymentGetId = await paymentGetIdService(data)
        dispatch({ type: PAYMENT_GET_ID, resPaymentGetId: resPaymentGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
}

export const paymentUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingUpdate: true })
    try {
        const resPaymentUpdate = await paymentUpdateService(data)
        dispatch({ type: PAYMENT_UPDATE, resPaymentUpdate: resPaymentUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingUpdate: false })
}

export const paymentCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingCreate: true })
    try {
        const resPaymentCreate = await paymentCreateService(data)
        dispatch({ type: PAYMENT_CREATE, resPaymentCreate: resPaymentCreate?.data?.payload })
        successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
}

export const paymentListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPaymentList = await paymentListService(data)
        dispatch({ type: PAYMENT_GET, resPaymentList: resPaymentList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const paymentConfirmDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPaymentConfirm = await paymentConfirmService(data)
        dispatch({ type: PAYMENT_CONFIRM, resPaymentConfirm: resPaymentConfirm?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const paymentCancelDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_DELETE, loadingDelete: true })
    try {
        const resPaymentCancel = await paymentCancelService(data)
        dispatch({ type: PAYMENT_CANCEL, resPaymentCancel: resPaymentCancel?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_DELETE, loadingDelete: false })
}

export const paymentCaptureDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingUpdate: true })
    try {
        const resPaymentCapture = await paymentCaptureService(data)
        dispatch({ type: PAYMENT_CAPTURE, resPaymentCapture: resPaymentCapture?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingUpdate: false })
}

//review
export const reviewGetAllDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resReviewList = await reviewListService(data)
        dispatch({ type: REVIEW_LIST, resReviewList: resReviewList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const reviewGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resReviewGetId = await reviewGetIdService(data)
        dispatch({ type: REVIEW_GET_ID, resReviewGetId: resReviewGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
}

export const reviewApproveDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingUpdate: true })
    try {
        const resReviewApprove = await reviewApproveService(data)
        dispatch({ type: REVIEW_APPROVE, resReviewApprove: resReviewApprove?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingUpdate: false })
}


export const paymentMethodGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resPaymentMethodGetId = await paymentMethodGetIdService(data)
        dispatch({ type: PAYMENT_METHOD_GET_ID, resPaymentMethodGetId: resPaymentMethodGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
}

export const paymentMethodUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingUpdate: true })
    try {
        const resPaymentMethodUpdate = await paymentMethodUpdateService(data)
        dispatch({ type: PAYMENT_METHOD_UPDATE, resPaymentMethodUpdate: resPaymentMethodUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingUpdate: false })
}

export const paymentMethodCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingCreate: true })
    try {
        const resPaymentMethodCreate = await paymentMethodCreateService(data)
        dispatch({ type: PAYMENT_METHOD_CREATE, resPaymentMethodCreate: resPaymentMethodCreate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingCreate: false })
}

export const paymentMethodListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPaymentMethodList = await paymentMethodListService(data)
        dispatch({ type: PAYMENT_METHOD_GET, resPaymentMethodList: resPaymentMethodList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}
export const applicationFeesGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resApplicationFeesGetId = await applicationFeesGetIdService(data)
        dispatch({ type: APPLICATION_GET_ID, resApplicationFeesGetId: resApplicationFeesGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}
export const applicationFeesListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resApplicationFeesList = await applicationFeesListService(data)
        dispatch({ type: APPLICATION_LIST, resApplicationFeesList: resApplicationFeesList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}