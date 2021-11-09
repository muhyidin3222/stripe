import axios from 'axios';
import { base } from './init'
import { getCookie } from 'utils/cookies'

const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(async config => {
    const dataCookie = await getCookie('token')
    config.headers.Authorization = dataCookie
    config.baseURL = base;
    return config;
})

export default axiosApiInstance