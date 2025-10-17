/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "../store/useAuthStore"
import { reservationsService } from "../services/reservations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useModalStore } from "../store/useModalStore"

export const useFetchCreateReservation = () => {
    const { token } = useAuthStore()
    const [error, setError] = useState("")
    const [validationErrors, setValidationErrors] = useState([])
    const { setShowModal } = useModalStore()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            await reservationsService.createReservation(token!, data)
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['reservations'] })
            setShowModal(false)
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
        isSuccess: mutation.isSuccess,
        error,
        setError,
        reset: mutation.reset,
        setValidationErrors,
        validationErrors
    }
}