import { payOutCreateService, payOutGetIdService, payOutCancelService, payOutListService, payOutUpdateService } from 'services/payOut';
import { PAYOUT_CREATE, PAYOUT_UPDATE, PAYOUT_GET, PAYOUT_GET_ID, PAYOUT_CANCEL, LOADING_GET, LOADING_CREATE, LOADING_UPDATE, ERROR_GET } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const payOutCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resPayOutCreate = await payOutCreateService(data)
        dispatch({ type: PAYOUT_CREATE, resPayOutCreate: resPayOutCreate })
        successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
}

export const payOutGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPayOutGetId = await payOutGetIdService(id)
        dispatch({ type: PAYOUT_GET_ID, resPayOutGetId: resPayOutGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const payOutCancelDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const respayOutCancel = await payOutCancelService(data)
        dispatch({ type: PAYOUT_CANCEL, resPayOutCancel: respayOutCancel?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const payOutListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPayOutList = await payOutListService(data)
        dispatch({ type: PAYOUT_GET, resPayOutList: resPayOutList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const payOutUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resPayOutUpdate = await payOutUpdateService(data)
        dispatch({ type: PAYOUT_UPDATE, resPayOutUpdate: resPayOutUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}