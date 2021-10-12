import axios from 'config/axiosConfig'

export const payOutCreateService = data => axios.post(`/privateUser/payOut/payOutCreate`, data)
export const payOutGetIdService = id => axios.get(`/privateUser/payOut/payOutGetId/${id}`)
export const payOutCancelService = data => axios.post(`/privateUser/payOut/payOutCancel`, data)
export const payOutListService = data => axios.post(`/privateUser/payOut/payOutList`, data)
export const payOutUpdateService = data => axios.put(`/privateUser/payOut/payOutUpdate`, data)