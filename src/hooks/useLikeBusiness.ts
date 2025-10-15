/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { usersService } from "../services/user"

export const useLikeBusiness = (token: string, businessId: string, liked: boolean) => {
    const [isLiked, setIsLiked] = useState<boolean>(liked)
    const [sucess, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const handleLikeBusiness = async () => {
        try {
            if (!isLiked) {
                await usersService.likeBusiness(token, businessId)
                setSuccess(true)
                setMessage("Añadido a tus favoritos")
            } else {
                await usersService.dislikeBusiness(token, businessId)
                setSuccess(true)
                setMessage("Removido de tus favoritos")
            }
            setIsLiked((prev) => !prev)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        }
    }

    return {
        handleLikeBusiness,
        error,
        setError,
        sucess,
        setSuccess,
        message,
        isLiked
    }
}