import axios from 'axios';
import { base } from './init'
import { getCookie } from 'utils/cookies'

export default (() => {
    const dataCookie = getCookie('token')
    return axios.create({
        // timeout: 10000,
        baseURL: base,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': dataCookie
        },
    })
})()