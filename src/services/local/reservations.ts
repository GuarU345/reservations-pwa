import { Reservation } from "../../types/reservation"
import { db } from "../../utils/local-db"

export const saveLocalReservations = async (list: Reservation[]) => {
    await db.reservations.clear()
    await db.reservations.bulkPut(list)
}

export const getLocalReservations = async (): Promise<Reservation[]> => {
    return await db.reservations.toArray()
}
