import axios from 'axios'
import { base } from 'config/init'

export const loginService = data => axios.post(`${base}/auth/login`, data)