import axios from 'config/axiosConfig'

export const quoteCreateService = data => axios.post(`/privateUser/quote/quoteCreate`, data)
export const quoteGetIdService = id => axios.get(`/privateUser/quote/quoteGetId/${id}`)
export const quoteDeleteService = data => axios.post(`/privateUser/quote/quoteDelete`, data)
export const quoteListService = data => axios.post(`/privateUser/quote/quoteList`, data)
export const quoteFinalizeQuoteService = data => axios.put(`/privateUser/quote/quoteFinalizeQuote`, data)
export const quoteAcceptQuoteService = data => axios.put(`/privateUser/quote/quoteAcceptQuote`, data)
export const quotePdfService = data => axios.put(`/privateUser/quote/quotePdf`, data)
export const quoteListLineItemsService = data => axios.put(`/privateUser/quote/quoteListLineItems`, data)
export const quoteListComputedUpfrontLineItemsService = data => axios.put(`/privateUser/quote/quoteListComputedUpfrontLineItems`, data)
export const quoteUpdateService = data => axios.put(`/privateUser/quote/update`, data)