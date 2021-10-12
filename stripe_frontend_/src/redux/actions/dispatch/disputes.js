import { disputesCreateService, disputesGetIdService, disputesListService, disputesUpdateService } from 'services/disputes';
import { PAYMENT_DISPUTES_CREATE, PAYMENT_DISPUTES_UPDATE, PAYMENT_DISPUTES_GET, PAYMENT_DISPUTES_GET_ID, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const disputesCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resDisputesCreate = await disputesCreateService(data)
        dispatch({ type: PAYMENT_DISPUTES_CREATE, resDisputesCreate: resDisputesCreate })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: true })
}

export const disputesGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resDisputesGetId = await disputesGetIdService(id)
        dispatch({ type: PAYMENT_DISPUTES_GET_ID, resDisputesGetId: resDisputesGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const disputesListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resDisputesList = await disputesListService(data)
        dispatch({ type: PAYMENT_DISPUTES_GET, resDisputesList: resDisputesList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const disputesUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resDisputesUpdate = await disputesUpdateService(data)
        dispatch({ type: PAYMENT_DISPUTES_UPDATE, resDisputesUpdate: resDisputesUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}