import { axios } from "../utils/axios"

const likeBusiness = async (token: string, businessId: string) => {
    const { data } = await axios.post(`/like/business/${businessId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

const dislikeBusiness = async (token: string, businessId: string) => {
    const { data } = await axios.delete(`/dislike/business/${businessId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const usersService = {
    likeBusiness,
    dislikeBusiness
}