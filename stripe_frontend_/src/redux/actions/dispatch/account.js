import { accountCreateService, accountGetIdService, accountListService, accountUpdateService } from 'services/account';
import { ACCOUNT_CREATE, ACCOUNT_UPDATE, ACCOUNT_GET, ACCOUNT_GET_ID, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const accountCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    const resCreate = await accountCreateService(data)
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    dispatch({ type: ACCOUNT_CREATE, dataDetail: resCreate })
};

export const accountGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    const resAccountGetIdData = await accountGetIdService(data)
    dispatch({ type: LOADING_GET, loadingGet: false })
    dispatch({ type: ACCOUNT_GET_ID, accountGetIdData: resAccountGetIdData?.data?.payload })
};

export const accountListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    const resAccountList = await accountListService(data)
    dispatch({ type: ACCOUNT_GET, resAccountList: resAccountList?.data?.payload })
    dispatch({ type: LOADING_GET, loadingGet: false })
};

export const accountUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    const resAccountUpdate = await accountUpdateService(data)
    dispatch({ type: ACCOUNT_UPDATE, resAccountUpdate: resAccountUpdate?.data?.payload })
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};