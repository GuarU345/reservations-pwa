import { useMemo, useState } from "react";
import { Business } from "../types/business";
import { businessesService } from "../services/businesses";
import { useQuery } from "@tanstack/react-query";
import { getLocalBusinesses, saveLocalBusinesses } from "../services/local/businesses";
import { Network } from "@capacitor/network";

export const useFetchBusinesses = () => {
    const [searchText, setSearchText] = useState('')

    const { data: businesses = [], isLoading, error } = useQuery<Business[], Error>({
        queryKey: ['businesses'],
        queryFn: async () => {
            try {
                const { connected } = await Network.getStatus()

                if (!connected) throw new Error('offline')

                const response = await businessesService.getBusinesses()

                saveLocalBusinesses(response)

                return response
            } catch {
                const local = await getLocalBusinesses()
                console.log(local)
                return local
            }
        },
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