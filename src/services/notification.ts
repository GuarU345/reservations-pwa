/* eslint-disable @typescript-eslint/no-explicit-any */
import { axios } from "../utils/axios"


export const subscribe = async (body: any, token: string) => {
    const { data } = await axios.post("/notifications/subscribe", body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const isActiveSubscription = async (token: string, endpoint: string) => {
    const { data } = await axios.get(`/notifications/active?endpoint=${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}