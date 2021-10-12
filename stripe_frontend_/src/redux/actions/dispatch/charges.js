import { chargesCreateService, chargesGetIdService, chargesCaptureService, chargesListService, chargesUpdateService } from 'services/CHARGES';
import { CHARGES_CREATE, CHARGES_UPDATE, CHARGES_GET, CHARGES_GET_ID, CHARGES_CAPTURE, LOADING_GET, LOADING_CREATE, LOADING_UPDATE, ERROR_GET, ERROR_CREATE, ERROR_UPDATE } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const chargesCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resCreate = await chargesCreateService(data)
        dispatch({ type: CHARGES_CREATE, dataDetail: resCreate })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
    }
};

export const chargesGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const reschargesGetIdData = await chargesGetIdService(data)
        dispatch({ type: CHARGES_GET_ID, chargesGetIdData: reschargesGetIdData?.data?.payload })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
    }
};

export const chargesCaptureDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const chargesCaptureData = await chargesCaptureService(data)
        dispatch({ type: CHARGES_CAPTURE, chargesCapture: chargesCaptureData?.data?.payload })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};

export const chargesListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const chargesListData = await chargesListService(data)
        dispatch({ type: CHARGES_GET, chargesList: chargesListData?.data?.payload })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};

export const chargesUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const chargesUpdateData = await chargesUpdateService(data)
        dispatch({ type: CHARGES_UPDATE, chargesUpdate: chargesUpdateData?.data?.payload })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_UPDATE, dispatch, typeLoading: LOADING_UPDATE })
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};