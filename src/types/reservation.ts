/* eslint-disable @typescript-eslint/no-explicit-any */

import { RESERVATION_STATUS } from "../utils/constants"

export interface Reservation {
    id: string
    business_id: string
    user_id: string
    start_time: string
    end_time: string
    number_of_people: number
    status: keyof typeof RESERVATION_STATUS
    active: boolean
    created_at: string
    reservation_cancellations: any[]
}

export interface ReservationBody {
    businessId: string
    numberOfPeople: number
    startTime: string
    endTime: string
}

export interface CancelReservationBody {
    reason: string
}