/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { authService } from "../services/auth"
import { useAuthStore } from "../store/useAuthStore"
import { useIonRouter } from "@ionic/react"

export const useLogout = () => {
    const { token, setIsLogin, setToken, setUser } = useAuthStore()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const router = useIonRouter()

    const handleLogout = async () => {
        try {
            await authService.logout(token!)
            setSuccess(true)
            setIsLogin(false)
            setToken("")
            setUser(null)
            router.push("/login", "forward")
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        }
    }

    return {
        handleLogout,
        success,
        setSuccess,
        error,
        setError
    }
}