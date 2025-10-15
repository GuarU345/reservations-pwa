import { axios } from "../utils/axios"

const getBusinesses = async (token: string) => {
    const { data } = await axios.get('/businesses', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

const getBusinessById = async (token: string, businessId: string) => {
    const { data } = await axios.get(`/businesses/${businessId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const businessesService = {
    getBusinesses,
    getBusinessById
}