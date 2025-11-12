/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "../store/useAuthStore"
import { reservationsService } from "../services/reservations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useModalStore } from "../store/useModalStore"

export const useFetchCancelReservation = (reservationId: string) => {
    const { token } = useAuthStore()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const { closeModal } = useModalStore()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (body: any) => {
            const response = reservationsService.cancelReservation(token!, reservationId, body)
            return response
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['reservations'] })
            setSuccess(true)
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
        success,
        setSuccess,
        error,
        setError,
        reset: mutation.reset,
        validationErrors,
        setValidationErrors
    }
}