import { invoicesCreateService, invoicesGetIdService, invoicesDeleteService, invoicesListService, invoicesUpdateService, invoicesFinalizeInvoiceService, invoicesPayService, invoicesSendInvoiceService, invoicesVoidInvoiceService, invoicesMarkUncollectibleService, invoicesListLineItemsService, invoicesRetrieveUpcomingService, invoicesListUpcomingLineItemsService } from 'services/invoices';
import { INVOICES_CREATE, INVOICES_UPDATE, INVOICES_LIST, INVOICES_GET_ID, INVOICES_DELETE, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const invoicesCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resInvoicesCreate = await invoicesCreateService(data)
        dispatch({ type: INVOICES_CREATE, resInvoicesCreate: resInvoicesCreate })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: true })
}

export const invoicesGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resInvoicesGetId = await invoicesGetIdService(id)
        console.log("customersGetIdDispatch", resInvoicesGetId)
        dispatch({ type: INVOICES_GET_ID, resInvoicesGetId: resInvoicesGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const invoicesDeleteDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resInvoicesDelete = await invoicesDeleteService(data)
        dispatch({ type: INVOICES_DELETE, resInvoicesDelete: resInvoicesDelete?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const invoicesListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resInvoicesList = await invoicesListService(data)
        dispatch({ type: INVOICES_LIST, resInvoicesList: resInvoicesList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const invoicesUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesUpdate = await invoicesUpdateService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesUpdate: resInvoicesUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesFinalizeInvoiceDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesFinalizeInvoice = await invoicesFinalizeInvoiceService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesFinalizeInvoice: resInvoicesFinalizeInvoice?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesPayDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesPayUpdate = await invoicesPayService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesPayUpdate: resInvoicesPayUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesSendInvoiceDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesSendInvoiceUpdate = await invoicesSendInvoiceService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesSendInvoiceUpdate: resInvoicesSendInvoiceUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesVoidInvoiceDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesVoidInvoiceUpdate = await invoicesVoidInvoiceService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesVoidInvoiceUpdate: resInvoicesVoidInvoiceUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesMarkUncollectibleDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesMarkUncollectible = await invoicesMarkUncollectibleService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesMarkUncollectible: resInvoicesMarkUncollectible?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesListLineItemsDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesListLineItems = await invoicesListLineItemsService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesListLineItems: resInvoicesListLineItems?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesRetrieveUpcomingDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesRetrieveUpcoming = await invoicesRetrieveUpcomingService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesRetrieveUpcoming: resInvoicesRetrieveUpcoming?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const invoicesListUpcomingLineItemsDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resInvoicesListUpcomingLineItems = await invoicesListUpcomingLineItemsService(data)
        dispatch({ type: INVOICES_UPDATE, resInvoicesListUpcomingLineItems: resInvoicesListUpcomingLineItems?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}