import axios from 'config/axiosConfig'

export const eventsGetIdService = id => axios.get(`/privateUser/events/eventsGetId/${id}`)
export const eventsListService = data => axios.post(`/privateUser/events/eventsList`, data)