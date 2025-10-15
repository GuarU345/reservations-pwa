/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Business } from "../types/business";
import { businessesService } from "../services/businesses";

export const useFetchBusinesses = (token: string) => {
    const [businesses, setBusinesses] = useState<Business[]>([])
    const [filtered, setFiltered] = useState<Business[]>([])
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchBusinesses = async () => {
        setIsLoading(true);

        try {
            const response = await businessesService.getBusinesses(token)
            setBusinesses(response)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBusinesses()
    }, [])

    useEffect(() => {
        if (!searchText.trim()) {
            setFiltered(businesses)
            return
        }

        const filteredList = businesses.filter(business =>
            business.name.toLowerCase().includes(searchText.toLowerCase()) ||
            business.business_categories.category.toLowerCase().includes(searchText.toLowerCase())
        )

        setFiltered(filteredList)
    }, [searchText, businesses])

    return { filtered, isLoading, error, searchText, setSearchText }
}