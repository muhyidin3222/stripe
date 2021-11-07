import { LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS } from 'redux/actions'
import { setCookie, getCookie } from 'utils/cookies'

export const verifyAuth = (checkParam) => async dispatch => {
    dispatch({ type: VERIFY_REQUEST })
    const cookie = await getCookie("token")
    if (cookie !== null || checkParam) {
        dispatch({
            type: LOGIN_SUCCESS,
            user: "cookieConvert"
        })
        dispatch({ type: VERIFY_SUCCESS })
    }
}

export const logoutUser = () => dispatch => {
    dispatch(() => ({ type: LOGOUT_REQUEST }))
    if ("cookie" === null) {
        dispatch(() => ({ type: LOGOUT_SUCCESS }))
    } else {
        dispatch(() => ({ type: LOGOUT_FAILURE }))
    }
};
