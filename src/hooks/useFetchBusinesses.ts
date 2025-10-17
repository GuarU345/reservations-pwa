import { useMemo, useState } from "react";
import { Business } from "../types/business";
import { businessesService } from "../services/businesses";
import { useQuery } from "@tanstack/react-query";

export const useFetchBusinesses = (token: string) => {
    const [searchText, setSearchText] = useState('')

    const { data: businesses = [], isLoading, error } = useQuery<Business[], Error>({
        queryKey: ['businesses', token],
        queryFn: async () => {
            const response = await businessesService.getBusinesses(token)
            return response
        },
        enabled: !!token,
        staleTime: 0,
    })

    const filtered = useMemo(() => {
        if (!searchText.trim()) return businesses

        return businesses.filter(business =>
            business.name.toLowerCase().includes(searchText.toLowerCase()) ||
            business.business_categories.category.toLowerCase().includes(searchText.toLowerCase())
        )
    }, [searchText, businesses])

    return {
        filtered,
        isLoading,
        error: error?.message || null,
        searchText,
        setSearchText,
    }
}