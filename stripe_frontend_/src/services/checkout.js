import axios from 'config/axiosConfig'

export const checkoutListService = data => axios.post(`/privateUser/checkout/checkoutGetAll`, data)