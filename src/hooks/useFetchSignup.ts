/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { authService } from "../services/auth";
import { useIonRouter } from "@ionic/react";
import { useMutation } from "@tanstack/react-query";

export const useFetchSignup = () => {
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const router = useIonRouter()

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const body = {
                ...data,
                role: 'CUSTOMER'
            }

            await authService.signup(body)
        },
        onSuccess: () => {
            router.push('/login')
        },
        onError: (error: any) => {
            const errors = error.response?.data?.errors || [];
            if (errors.length > 0) {
                const errorMessages = errors.map((err: any) => err.message)
                setValidationErrors(errorMessages);
            } else {
                setError(error.response?.data.message)
            }
        }
    })

    return {
        handleSignup: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error,
        setError,
        reset: mutation.reset,
        setValidationErrors,
        validationErrors
    }
}