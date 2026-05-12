const BASE_URL = process.env.NEXT_PUBLIC_API_URL

import axios, {InternalAxiosRequestConfig} from "axios";


const authApi = axios.create({
    baseURL: BASE_URL
})

authApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("jwt")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export {authApi}