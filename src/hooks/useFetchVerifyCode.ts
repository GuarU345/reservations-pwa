/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIonRouter } from "@ionic/react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/auth"
import { useAuthStore } from "../store/useAuthStore"
import { saveSession } from "../store/sessionStorage"

export const useFetchVerifyCode = () => {
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const { login } = useAuthStore()
    const router = useIonRouter()

    const mutation = useMutation({
        mutationFn: async (data: { email: string; usr_id: string }) => {
            const body = {
                email: data.email,
                message: "",
                tok_token: "",
                usr_id: data.usr_id,
                cmp_id: ""
            }

            const response = await authService.verifyCode(body)
            return response
        },

        onSuccess: async (data: any) => {
            const session = {
                user: data.user,
                token: data.token,
                isLogged: true,
            }

            await saveSession(session)

            login({
                user: data.user,
                token: data.token
            })

            router.push("/home", "root")
        },

        onError: (error: any) => {
            const errors = error.response?.data?.errors || []

            if (errors.length > 0) {
                const messages = errors.map((err: any) => err.message)
                setValidationErrors(messages)
            } else {
                setError(error.response?.data?.message || "Error inesperado")
            }
        }
    })

    return {
        handleVerifyCode: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error,
        setError,
        validationErrors,
        setValidationErrors,
        reset: mutation.reset
    }
}
