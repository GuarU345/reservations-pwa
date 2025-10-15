import { ReservationBody } from "../types/reservation"
import { axios } from "../utils/axios"

const getReservations = async (token: string) => {
    const { data } = await axios.get('/reservations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

const createReservation = async (token: string, body: ReservationBody) => {
    const { data } = await axios.post('/reservations', body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const reservationsService = {
    getReservations,
    createReservation
}