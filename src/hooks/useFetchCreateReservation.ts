/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { reservationsService } from "../services/reservations"

export const useFetchCreateReservation = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const { token } = useAuthStore()

    const handleCreate = async (data: any) => {
        setIsLoading(true)

        try {
            const response = await reservationsService.createReservation(token!, data)
            setSuccess(true)
            console.log(response)
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
        handleCreate
    }
}