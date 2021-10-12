import { topUpCreateService, topUpGetIdService, topUpListService, topUpUpdateService } from 'services/topUp';
import { TOPUP_CREATE, TOPUP_UPDATE, TOPUP_GET, TOPUP_GET_ID, LOADING_GET, LOADING_CREATE, LOADING_UPDATE, ERROR_GET } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const topUpCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resTopUpCreate = await topUpCreateService(data)
        dispatch({ type: TOPUP_CREATE, resTopUpCreate: resTopUpCreate })
        successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_CREATE })
        return false
    }

}
export const topUpGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resTopUpGetId = await topUpGetIdService(id)
        dispatch({ type: TOPUP_GET_ID, resTopUpGetId: resTopUpGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}
export const topUpListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resTopUpList = await topUpListService(data)
        dispatch({ type: TOPUP_GET, resTopUpList: resTopUpList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}
export const topUpUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resTopUpUpdate = await topUpUpdateService(data)
        dispatch({ type: TOPUP_UPDATE, resTopUpUpdate: resTopUpUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}