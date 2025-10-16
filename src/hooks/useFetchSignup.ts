/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { authService } from "../services/auth";
import { useIonRouter } from "@ionic/react";

export const useFetchSignup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const router = useIonRouter()

    const handleSignup = async (data: any) => {
        setIsLoading(true)

        const body = {
            ...data,
            role: 'CUSTOMER'
        }

        try {
            await authService.signup(body)
            setSuccess(true)
            router.push('/login')
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
        handleSignup
    }
}