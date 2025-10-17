/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "../store/useAuthStore"
import { reservationsService } from "../services/reservations"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export const useFetchCancelReservation = (reservationId: string) => {
    const { token } = useAuthStore()
    const [error, setError] = useState("")
    const [validationErrors, setValidationErrors] = useState([])

    const mutation = useMutation({
        mutationFn: async (body: any) => {
            return await reservationsService.cancelReservation(token!, reservationId, body)
        },
        onError: (error: any, _variables, _context) => {
            const errors = error.response?.data?.errors || [];
            if (errors.length > 0) {
                const errorMessages = errors.map((err: any) => err.message)
                setValidationErrors(errorMessages);
            } else {
                setError(error.response?.data.message)
            }
        },
    })

    return {
        cancelReservation: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error,
        setError,
        reset: mutation.reset,
        validationErrors,
        setValidationErrors
    }
}