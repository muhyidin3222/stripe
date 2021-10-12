import { COLLAPSED } from 'redux/actions'

export const collapsedChange = (condition) => async (dispatch, getState) => {
    dispatch({
        type: COLLAPSED,
        collapsed: condition,
    })
}