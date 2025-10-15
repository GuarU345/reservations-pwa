/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { businessesService } from "../services/businesses"
import { Business } from "../types/business"

export const useFetchBusinessData = (token: string, businessId: string) => {
    const [businessData, setBusinessData] = useState<Business | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchBusinessData = async () => {
        setIsLoading(true);

        try {
            const response = await businessesService.getBusinessById(token, businessId)
            setBusinessData(response)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBusinessData()
    }, [businessId])

    return { businessData, isLoading, error }
}