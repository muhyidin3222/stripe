import { subscriptionsCreateService, subscriptionsGetIdService, subscriptionsDeleteService, subscriptionsListService, subscriptionsUpdateService } from 'services/subscriptions';
import { SUBSCRIPTIONS_CREATE, SUBSCRIPTIONS_UPDATE, SUBSCRIPTIONS_GET, SUBSCRIPTIONS_GET_ID, SUBSCRIPTIONS_DELETE, LOADING_GET, LOADING_CREATE, LOADING_UPDATE, ERROR_GET, ERROR_CREATE } from 'redux/actions'
import { successHandle, errorHandle } from 'utils/handleRes'

export const subscriptionsCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resSubscriptionsCreate = await subscriptionsCreateService(data)
        dispatch({ type: SUBSCRIPTIONS_CREATE, resSubscriptionsCreate: resSubscriptionsCreate })
        successHandle({ type: "create", dispatch, typeLoading: LOADING_CREATE })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
}

export const subscriptionsGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resSubscriptionsGetId = await subscriptionsGetIdService(id)
        console.log("SUBSCRIPTIONSGetIdDispatch", resSubscriptionsGetId)
        dispatch({ type: SUBSCRIPTIONS_GET_ID, resSubscriptionsGetId: resSubscriptionsGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const subscriptionsDeleteDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resCustomeelete = await subscriptionsDeleteService(data)
        dispatch({ type: SUBSCRIPTIONS_DELETE, resSubscriptionsDelete: resCustomeelete?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const subscriptionsListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resSubscriptionsList = await subscriptionsListService(data)
        successHandle({ type: "get", dispatch, typeLoading: LOADING_GET })
        dispatch({ type: SUBSCRIPTIONS_GET, resSubscriptionsList: resSubscriptionsList?.data?.payload })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        return false
    }
}

export const subscriptionsUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resSubscriptionsUpdate = await subscriptionsUpdateService(data)
        dispatch({ type: SUBSCRIPTIONS_UPDATE, resSubscriptionsUpdate: resSubscriptionsUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}