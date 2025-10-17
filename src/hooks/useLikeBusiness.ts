/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { usersService } from "../services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/useAuthStore"

export const useLikeBusiness = (businessId: string, liked: boolean) => {
    const { token } = useAuthStore()
    const [isLiked, setIsLiked] = useState(liked)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            if (!isLiked) {
                await usersService.likeBusiness(token!, businessId)
                return { liked: true, message: 'Añadido a tus favoritos' }
            } else {
                await usersService.dislikeBusiness(token!, businessId)
                return { liked: false, message: 'Removido de tus favoritos' }
            }
        },
        onSuccess: (result) => {
            setIsLiked(result.liked)
            setMessage(result.message)

            queryClient.invalidateQueries({ queryKey: ['businesses'] })
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        },
    })

    return {
        handleLikeBusiness: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error,
        setError,
        reset: mutation.reset,
        message,
        isLiked,
    }
}