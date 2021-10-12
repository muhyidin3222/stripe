import { quoteCreateService, quoteGetIdService, quoteDeleteService, quoteListService, quoteUpdateService, 
    quoteFinalizeQuoteService ,
    quoteAcceptQuoteService ,
    quotePdfService ,
    quoteListLineItemsService ,
    quoteListComputedUpfrontLineItemsService ,
} from 'services/quote';
import { CUSTOMERS_CREATE, CUSTOMERS_UPDATE, CUSTOMERS_GET, CUSTOMERS_GET_ID, CUSTOMERS_DELETE, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const quoteCreateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resQuoteCreate = await quoteCreateService(data)
        dispatch({ type: CUSTOMERS_CREATE, resQuoteCreate: resQuoteCreate })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: true })
}

export const quoteGetIdDispatch = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resQuoteGetId = await quoteGetIdService(id)
        console.log("customersGetIdDispatch", resQuoteGetId)
        dispatch({ type: CUSTOMERS_GET_ID, resQuoteGetId: resQuoteGetId?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const quoteDeleteDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resQuoteDelete = await quoteDeleteService(data)
        dispatch({ type: CUSTOMERS_DELETE, resQuoteDelete: resQuoteDelete?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const quoteListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resQuoteList = await quoteListService(data)
        dispatch({ type: CUSTOMERS_GET, resQuoteList: resQuoteList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}

export const quoteUpdateDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resQuoteUpdate = await quoteUpdateService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resQuoteUpdate: resQuoteUpdate?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}

export const quoteFinalizeQuoteDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resQuoteFinalizeQuote = await quoteFinalizeQuoteService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resQuoteFinalizeQuote: resQuoteFinalizeQuote?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const quoteAcceptQuote = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resQuoteAcceptQuote = await quoteAcceptQuoteService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resQuoteAcceptQuote: resQuoteAcceptQuote?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const quotePdfDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resQuotePdf = await quotePdfService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resQuotePdf: resQuotePdf?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}


export const quoteListComputedUpfrontLineItemsDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resQuoteListComputedUpfrontLineItems = await quoteListComputedUpfrontLineItemsService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resQuoteListComputedUpfrontLineItems: resQuoteListComputedUpfrontLineItems?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}

export const quoteListLineItemsDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
    try {
        const resQuoteListLineItemsService = await quoteListLineItemsService(data)
        dispatch({ type: CUSTOMERS_UPDATE, resQuoteListLineItemsService: resQuoteListLineItemsService?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
}