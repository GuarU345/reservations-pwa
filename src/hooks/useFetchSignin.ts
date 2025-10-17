/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIonRouter } from "@ionic/react"
import { useState } from "react"
import { authService } from "../services/auth"
import { useAuthStore } from "../store/useAuthStore"
import { useMutation } from "@tanstack/react-query"

export const useFetchSignin = () => {
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const { setUser, setToken, setIsLogin } = useAuthStore()

    const router = useIonRouter()

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const body = {
                ...data,
                role: 'CUSTOMER'
            }

            const response = await authService.signin(body)
            return response
        },
        onSuccess: (data: any) => {
            setUser(data.user)
            setToken(data.token)
            setIsLogin(true)
            router.push('/home', 'forward')
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
        handleSignin: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error,
        setError,
        reset: mutation.reset,
        setValidationErrors,
        validationErrors
    }
}