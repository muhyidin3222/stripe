import axios from 'config/axiosConfig'

export const chargesCreateService = data => axios.post(`/privateUser/charges/chargesCreate`, data)
export const chargesGetIdService = id => axios.get(`/privateUser/charges/chargesGetId/${id}`)
export const chargesCaptureService = data => axios.post(`/privateUser/charges/chargesCapture`, data)
export const chargesListService = data => axios.post(`/privateUser/charges/chargesList`, data)
export const chargesUpdateService = data => axios.put(`/privateUser/charges/chargesUpdate`, data)