import axios from 'config/axiosConfig'

export const cardholderCreateService = data => axios.post(`/privateUser/issuing/cardholderCreate`, data)
export const cardholderUpdateService = data => axios.put(`/privateUser/issuing/cardholderUpdate`, data)
export const cardholderGetAllService = data => axios.post(`/privateUser/issuing/cardholderGetAll`, data)
export const cardholderGetIdService = data => axios.get(`/privateUser/issuing/cardholderGetId`, data)

export const cardCreateService = data => axios.post(`/privateUser/issuing/cardCreate`, data)
export const cardUpdateService = data => axios.put(`/privateUser/issuing/cardUpdate`, data)
export const cardGetAllService = data => axios.post(`/privateUser/issuing/cardGetAll`, data)
export const cardGetIdService = data => axios.get(`/privateUser/issuing/cardGetId`, data)

export const disputesCreateService = data => axios.post(`/privateUser/issuing/disputesCreate`, data)
export const disputesUpdateService = data => axios.put(`/privateUser/issuing/disputesUpdate`, data)
export const disputesGetAllService = data => axios.post(`/privateUser/issuing/disputesGetAll`, data)
export const disputesGetIdService = data => axios.get(`/privateUser/issuing/disputesGetId`, data)

export const transactionsCreateService = data => axios.post(`/privateUser/issuing/transactionsCreate`, data)
export const transactionsUpdateService = data => axios.put(`/privateUser/issuing/transactionsUpdate`, data)
export const transactionsGetAllService = data => axios.get(`/privateUser/issuing/transactionsGetAll`, data)
export const transactionsGetIdService = data => axios.get(`/privateUser/issuing/transactionsGetId`, data)

export const authorizationsApproveService = data => axios.post('/privateUser/issuing/authorizationsApprove', data)
export const authorizationsDeclineService = data => axios.post('/privateUser/issuing/authorizationsDecline', data)
export const authorizationsUpdateService = data => axios.put('/privateUser/issuing/authorizationsUpdate', data)
export const authorizationsGetAllService = data => axios.post('/privateUser/issuing/authorizationsGetAll', data)
export const authorizationsGetIdService = data => axios.get('/privateUser/issuing/authorizationsGetId', data)