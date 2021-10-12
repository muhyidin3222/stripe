import axios from 'config/axiosConfig'

export const invoiceItemCreateService = data => axios.post(`/privateUser/invoiceItems/invoiceItemsCreate`, data)
export const invoiceItemGetIdService = id => axios.get(`/privateUser/invoiceItems/invoiceItemsGetId/${id}`)
export const invoiceItemDeleteService = data => axios.post(`/privateUser/invoiceItems/invoiceItemsDelete`, data)
export const invoiceItemListService = data => axios.post(`/privateUser/invoiceItems/invoiceItemsList`, data)
export const invoiceItemUpdateService = data => axios.put(`/privateUser/invoiceItems/invoiceItemsUpdate`, data)