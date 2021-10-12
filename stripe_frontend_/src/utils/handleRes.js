import { message } from 'antd'
import { deleteCookie } from './cookies'

export const errorHandle = ({ error, dispatch, typeLoading, typeError }) => {
    // console.log(error.response.data.type)
    if (error?.response?.data?.type === "invalid_token") {
        window.location.href = '/login';
        deleteCookie()
    }

    if (error.response)
        message.error(error?.response?.data?.payload?.error?.message)
    // else if (error.request)
    //     message.error(error.request)
    else
        message.error(error.message)

    if (typeError) {
        let resError = {
            type: typeError
        }

        if (typeError === "ERROR_CREATE")
            resError.errorCreate = error?.response?.data?.payload || error.message

        if (typeError === "ERROR_UPDATE")
            resError.errorUpdate = error?.response?.data?.payload || error.message

        if (typeError === "ERROR_GET")
            resError.errorList = error?.response?.data?.payload || error.message

        if (typeError === "ERROR_GET_ID")
            resError.errorGetId = error?.response?.data?.payload || error.message

        dispatch(resError)
    }

    if (typeLoading) {
        let loadingValue = {
            type: typeLoading
        }

        if (typeLoading === "LOADING_GET")
            loadingValue.loadingGet = false

        if (typeLoading === "LOADING_CREATE")
            loadingValue.loadingCreate = false

        if (typeLoading === "LOADING_UPDATE")
            loadingValue.loadingPost = false

        if (typeLoading === "LOADING_GET_ID")
            loadingValue.loadingGetId = false

        if (typeLoading === "LOADING_DELETE")
            loadingValue.loadingDelete = false

        dispatch(loadingValue)
    }
}

export const successHandle = ({ type, dispatch, typeLoading }) => {
    message.success("success " + type)

    let loadingValue = {
        type: typeLoading
    }

    if (typeLoading === "LOADING_GET")
        loadingValue.loadingGet = false

    if (typeLoading === "LOADING_CREATE")
        loadingValue.loadingCreate = false

    if (typeLoading === "LOADING_UPDATE")
        loadingValue.loadingPost = false

    if (typeLoading === "LOADING_GET_ID")
        loadingValue.loadingGetId = false

    if (typeLoading === "LOADING_DELETE")
        loadingValue.loadingDelete = false

    dispatch(loadingValue)
}