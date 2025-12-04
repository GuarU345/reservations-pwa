import { businessesService } from "../services/businesses"
import { Business } from "../types/business"
import { useQuery } from "@tanstack/react-query"
import { getLocalBusinesses } from "../services/local/businesses"

export const useFetchBusinessData = (businessId: string) => {
    const {
        data: businessData,
        isLoading,
        error,
    } = useQuery<Business, Error>({
        queryKey: ['business', businessId, navigator.onLine],
        queryFn: async () => {
            const isOnline = navigator.onLine

            if (!isOnline) {
                const businesses = await getLocalBusinesses();
                const found = businesses.find(biz => biz.id === businessId);
                if (found) {
                    return found;
                } else {
                    throw new Error('Negocio no encontrado en modo offline');
                }
            }
            const response = await businessesService.getBusinessById(businessId)
            return response
        },
        enabled: !!businessId,
        retry: 1,
        networkMode: 'always'
    })

    return {
        businessData,
        isLoading,
        error: error?.message || null,
    }
}