/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { reservationsService } from "../services/reservations"
import { Reservation } from "../types/reservation"

export const useFetchReservations = (token: string) => {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchReservations = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await reservationsService.getReservations(token)
            setReservations(response)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    return { reservations, isLoading, error }
}