import { axios } from "../utils/axios"

const getReservations = async (token: string) => {
    const { data } = await axios.get('/reservations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const reservationsService = {
    getReservations
}