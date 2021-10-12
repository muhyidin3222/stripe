import { eventsGetIdService, eventsListService } from 'services';
import { EVENT_GET, EVENT_GET_ID, LOADING_GET } from 'redux/actions'

export const eventsGetIdDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resEventGetId = await eventsGetIdService(data)
        dispatch({ type: EVENT_GET_ID, resEventGetId: resEventGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}


export const eventsListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resEventList = await eventsListService(data)
        dispatch({ type: EVENT_GET, resEventList: resEventList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}