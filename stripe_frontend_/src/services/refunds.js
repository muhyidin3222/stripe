import axios from 'config/axiosConfig'

export const refundsCreateService = data => axios.post(`/privateUser/refunds/refundsCreate`, data)
export const refundsGetIdService = id => axios.get(`/privateUser/refunds/refundsGetId/${id}`)
export const refundsListService = data => axios.post(`/privateUser/refunds/refundsList`, data)
export const refundsUpdateService = data => axios.put(`/privateUser/refunds/refundsUpdate`, data)