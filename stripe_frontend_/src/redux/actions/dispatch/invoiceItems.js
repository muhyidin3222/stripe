import { invoiceItemCreateService, invoiceItemGetIdService, invoiceItemDeleteService, invoiceItemListService, invoiceItemUpdateService } from 'services/invoiceItem';
import { INVOICE_ITEM_CREATE, INVOICE_ITEM_UPDATE, INVOICE_ITEM_GET, INVOICE_ITEM_GET_ID, INVOICE_ITEM_DELETE, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const invoiceItemCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resInvoiceItemCreate = await invoiceItemCreateService(data)
        dispatch({ type: INVOICE_ITEM_CREATE, resInvoiceItemCreate: resInvoiceItemCreate })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: true })
}

export const invoiceItemGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resInvoiceItemGetId = await invoiceItemGetIdService(id)
        console.log("invoiceItemGetIdDispatch", resInvoiceItemGetId)
        dispatch({ type: INVOICE_ITEM_GET_ID, resInvoiceItemGetId: resInvoiceItemGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const invoiceItemDeleteDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resCustomeelete = await invoiceItemDeleteService(data)
        dispatch({ type: INVOICE_ITEM_DELETE, resInvoiceItemDelete: resCustomeelete?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const invoiceItemListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resInvoiceItemList = await invoiceItemListService(data)
        dispatch({ type: INVOICE_ITEM_GET, resInvoiceItemList: resInvoiceItemList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const invoiceItemUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoiceItemUpdate = await invoiceItemUpdateService(data)
        dispatch({ type: INVOICE_ITEM_UPDATE, resInvoiceItemUpdate: resInvoiceItemUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}