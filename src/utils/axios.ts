import ax from "axios";
import { getToken } from "../store/sessionStorage";

export const axios = ax.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:54321/api",
})

axios.interceptors.request.use(async (config) => {
    const token = await getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})