import axios from 'config/axiosConfig'

export const disputesCreateService = data => axios.post(`/privateUser/disputes/disputesCreate`, data)
export const disputesGetIdService = id => axios.get(`/privateUser/disputes/disputesGetId/${id}`)
export const disputesListService = data => axios.post(`/privateUser/disputes/disputesList`, data)
export const disputesUpdateService = data => axios.put(`/privateUser/disputes/disputesUpdate`, data)