import { businessesService } from "../services/businesses"
import { Business } from "../types/business"
import { useQuery } from "@tanstack/react-query"

export const useFetchBusinessData = (businessId: string) => {
    const {
        data: businessData,
        isLoading,
        error,
    } = useQuery<Business, Error>({
        queryKey: ['business', businessId],
        queryFn: async () => {
            const response = await businessesService.getBusinessById(businessId)
            return response
        },
        enabled: !!businessId,
        staleTime: 0,
        retry: 1,
    })

    return {
        businessData,
        isLoading,
        error: error?.message || null,
    }
}