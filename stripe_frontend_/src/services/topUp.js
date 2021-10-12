import axios from 'config/axiosConfig'

export const topUpCreateService = data => axios.post(`/privateUser/topUp/topUpCreate`, data)
export const topUpGetIdService = id => axios.get(`/privateUser/topUp/topUpGetId/${id}`)
export const topUpCancelService = data => axios.post(`/privateUser/topUp/topUpCancel`, data)
export const topUpListService = data => axios.post(`/privateUser/topUp/topUpList`, data)
export const topUpUpdateService = data => axios.put(`/privateUser/topUp/topUpUpdate`, data)