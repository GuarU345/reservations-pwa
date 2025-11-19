import { CancelReservationBody, ReservationBody } from "../types/reservation"
import { axios } from "../utils/axios"

const getReservations = async () => {
    const { data } = await axios.get('/reservations')
    return data
}

const createReservation = async (body: ReservationBody) => {
    const { data } = await axios.post('/reservations', body)
    return data
}

const cancelReservation = async (reservationId: string, body: CancelReservationBody) => {
    const { data } = await axios.delete(`/reservations/${reservationId}/cancel`, {
        data: body
    })
    return data
}

export const reservationsService = {
    getReservations,
    createReservation,
    cancelReservation
}