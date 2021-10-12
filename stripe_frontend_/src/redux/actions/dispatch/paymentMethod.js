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
} from 'redux/actions'

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
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingCreate: false })
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
