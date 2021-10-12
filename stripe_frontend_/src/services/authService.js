import axios from './apiStripe'

export const signUserIn = data => axios.post(`/auth/loginByAdmin`, data)