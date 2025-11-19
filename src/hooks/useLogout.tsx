/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { authService } from "../services/auth"
import { useAuthStore } from "../store/useAuthStore"
import { useMutation } from "@tanstack/react-query"
import { clearSession } from "../store/sessionStorage"

export const useLogout = () => {
    const { setIsLogin, setToken, setUser } = useAuthStore()
    const [error, setError] = useState("")

    const mutation = useMutation({
        mutationFn: async () => {
            await authService.logout()
        },
        onSuccess: async () => {
            setIsLogin(false)
            setToken("")
            setUser(null)

            await clearSession()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        }
    })

    return {
        handleLogout: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error,
        setError
    }
}