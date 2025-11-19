/* eslint-disable @typescript-eslint/no-explicit-any */
import { reservationsService } from "../services/reservations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const useFetchCreateReservation = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            await reservationsService.createReservation(data)
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['reservations'] })
            setSuccess(true)
        },
        onError: (error: any) => {
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
        createReservation: mutation.mutate,
        isLoading: mutation.isPending,
        success,
        setSuccess,
        error,
        setError,
        reset: mutation.reset,
        setValidationErrors,
        validationErrors
    }
}