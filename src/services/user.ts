import { axios } from "../utils/axios"

const likeBusiness = async (businessId: string) => {
    const { data } = await axios.post(`/like/business/${businessId}`, {})
    return data
}

const dislikeBusiness = async (businessId: string) => {
    const { data } = await axios.delete(`/dislike/business/${businessId}`)
    return data
}

export const usersService = {
    likeBusiness,
    dislikeBusiness
}