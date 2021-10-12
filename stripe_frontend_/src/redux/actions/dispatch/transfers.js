import { transfersCreateService, transfersGetIdService, transfersListService, transfersUpdateService } from 'services/transfers';
import { TRANSFERS_CREATE, TRANSFERS_UPDATE, TRANSFERS_GET, TRANSFERS_GET_ID, LOADING_GET, LOADING_CREATE, LOADING_UPDATE, ERROR_CREATE } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const transfersCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resTransfersCreate = await transfersCreateService(data)
        dispatch({ type: TRANSFERS_CREATE, resTransfersCreate: resTransfersCreate })
        successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
}

export const transfersGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resTransfersGetId = await transfersGetIdService(id)
        dispatch({ type: TRANSFERS_GET_ID, resTransfersGetId: resTransfersGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const transfersListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resTransfersList = await transfersListService(data)
        dispatch({ type: TRANSFERS_GET, resTransfersList: resTransfersList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const transfersUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resTransfersUpdate = await transfersUpdateService(data)
        dispatch({ type: TRANSFERS_UPDATE, resTransfersUpdate: resTransfersUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}