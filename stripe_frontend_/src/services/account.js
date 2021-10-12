import axios from 'config/axiosConfig'

export const accountCreateService = data => axios.post(`/privateUser/account/accountCreate`, data)
export const accountGetIdService = id => axios.get(`/privateUser/account/accountGetId/${id}`)
export const accountListService = data => axios.post(`/privateUser/account/accountList`, data)
export const accountUpdateService = data => axios.put(`/privateUser/account/accountUpdate`, data)