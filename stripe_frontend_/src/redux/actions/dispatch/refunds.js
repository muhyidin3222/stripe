import { refundsCreateService, refundsGetIdService, refundsListService, refundsUpdateService } from 'services/refunds';
import { REFUNDS_CREATE, REFUNDS_UPDATE, REFUNDS_GET, REFUNDS_GET_ID, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const refundsCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resRefundsCreate = await refundsCreateService(data)
        dispatch({ type: REFUNDS_CREATE, resRefundsCreate: resRefundsCreate })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: true })
}

export const refundsGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resRefundsGetId = await refundsGetIdService(id)
        dispatch({ type: REFUNDS_GET_ID, resRefundsGetId: resRefundsGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const refundsListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resRefundsList = await refundsListService(data)
        dispatch({ type: REFUNDS_GET, resRefundsList: resRefundsList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const refundsUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resRefundsUpdate = await refundsUpdateService(data)
        dispatch({ type: REFUNDS_UPDATE, resRefundsUpdate: resRefundsUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}