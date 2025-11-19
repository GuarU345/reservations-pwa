/* eslint-disable @typescript-eslint/no-explicit-any */
import { axios } from "../utils/axios"


export const subscribe = async (body: any) => {
    const { data } = await axios.post("/notifications/subscribe", body)
    return data
}

export const isActiveSubscription = async (endpoint: string) => {
    const { data } = await axios.get(`/notifications/active?endpoint=${endpoint}`)
    return data
}