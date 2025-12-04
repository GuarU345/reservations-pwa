import { Network } from "@capacitor/network"
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
        queryKey: ['business', businessId],
        queryFn: async () => {
            const {connected} = await Network.getStatus()
            if (!connected) {
                const business = await getLocalBusinesses();
                const found = business.find(biz => biz.id === businessId);
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
        staleTime: 0,
        retry: 1,
    })

    return {
        businessData,
        isLoading,
        error: error?.message || null,
    }
}