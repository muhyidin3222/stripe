import axios from 'config/axiosConfig'

export const subscriptionsCreateService = data => axios.post(`/privateUser/subscriptions/subscriptionsCreate`, data)
export const subscriptionsGetIdService = id => axios.get(`/privateUser/subscriptions/subscriptionsGetId/${id}`)
export const subscriptionsDeleteService = data => axios.post(`/privateUser/subscriptions/subscriptionsDelete`, data)
export const subscriptionsListService = data => axios.post(`/privateUser/subscriptions/subscriptionsList`, data)
export const subscriptionsUpdateService = data => axios.put(`/privateUser/subscriptions/subscriptionsUpdate`, data)