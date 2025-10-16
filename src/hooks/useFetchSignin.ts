/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIonRouter } from "@ionic/react"
import { useState } from "react"
import { authService } from "../services/auth"
import { useAuthStore } from "../store/useAuthStore"

export const useFetchSignin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const { setUser, setToken, setIsLogin } = useAuthStore()

    const router = useIonRouter()

    const handleSignin = async (data: any) => {
        setIsLoading(true)

        const body = {
            ...data,
            role: 'CUSTOMER'
        }

        try {
            const response = await authService.signin(body)
            setSuccess(true)
            setUser(response.user)
            setToken(response.token)
            setIsLogin(true)
            router.push('/home', 'forward')
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
        handleSignin
    }
}