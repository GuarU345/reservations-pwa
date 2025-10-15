/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Reservation {
    id: string
    business_id: string
    user_id: string
    start_time: string
    end_time: string
    number_of_people: number
    status: string
    active: boolean
    created_at: string
    reservation_cancellations: any[]
}