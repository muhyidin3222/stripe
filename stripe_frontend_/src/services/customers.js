import axios from 'config/axiosConfig'

export const customersCreateService = data => axios.post(`/privateUser/customers/customersCreate`, data)
export const customersGetIdService = id => axios.get(`/privateUser/customers/customersGetId/${id}`)
export const customersDeleteService = data => axios.post(`/privateUser/customers/customersDelete`, data)
export const customersListService = data => axios.post(`/privateUser/customers/customersList`, data)
export const customersUpdateService = data => axios.put(`/privateUser/customers/customersUpdate`, data)
export const customersBankService = data => axios.get(`/privateUser/customers/customersBank`, data)