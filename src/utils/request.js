import axios from 'axios'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
})
export default service;