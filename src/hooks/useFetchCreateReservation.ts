/* eslint-disable @typescript-eslint/no-explicit-any */
import { reservationsService } from "../services/reservations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { putLocalPendings } from "../services/local/pendings"

export const useFetchCreateReservation = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [savedOffline, setSavedOffline] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const queryClient = useQueryClient()

    const mutation = useMutation({
        networkMode: 'always',
        mutationFn: async (data: any) => {
            const isOnline = navigator.onLine
            if (!isOnline) {
                await putLocalPendings({...data, id: crypto.randomUUID()});
                return { savedOffline: true }
            }

            await reservationsService.createReservation(data)
            return { savedOffline: false }
        },
        onSuccess: async (result) => {
            if (result?.savedOffline) {
                setSavedOffline(true)
            } else {
                await queryClient.refetchQueries({ queryKey: ['reservations'] })
                setSuccess(true)
            }
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
        savedOffline,
        setSavedOffline,
        error,
        setError,
        reset: mutation.reset,
        setValidationErrors,
        validationErrors
    }
}