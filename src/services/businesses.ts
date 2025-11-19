import { axios } from "../utils/axios"

const getBusinesses = async () => {
    const { data } = await axios.get('/businesses')
    return data
}

const getBusinessById = async (businessId: string) => {
    const { data } = await axios.get(`/businesses/${businessId}`)
    return data
}

export const businessesService = {
    getBusinesses,
    getBusinessById
}