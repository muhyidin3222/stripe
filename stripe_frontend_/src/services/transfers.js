import axios from 'config/axiosConfig'

export const transfersCreateService = data => axios.post(`/privateUser/transfers/transfersCreate`, data)
export const transfersGetIdService = id => axios.get(`/privateUser/transfers/transfersGetId/${id}`)
export const transfersListService = data => axios.post(`/privateUser/transfers/transfersList`, data)
export const transfersUpdateService = data => axios.put(`/privateUser/transfers/transfersUpdate`, data)