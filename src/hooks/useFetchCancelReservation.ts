/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { reservationsService } from "../services/reservations"

export const useFetchCancelReservation = (reservationId: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const { token } = useAuthStore()

    const handleCancel = async (body: any) => {
        setIsLoading(true)

        try {
            await reservationsService.cancelReservation(token!, reservationId, body)
            setSuccess(true)
        } catch (error: any) {
            const errors = error.response?.data?.errors || [];
            if (errors.length > 0) {
                const errorMessages = errors.map((err: any) => err.message)
                setValidationErrors(errorMessages);
            } else {
                setError(error.response?.data.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        success,
        setSuccess,
        setError,
        error,
        setValidationErrors,
        validationErrors,
        handleCancel
    }
}