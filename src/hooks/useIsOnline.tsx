import { Network } from "@capacitor/network"
import { useQuery } from "@tanstack/react-query"

export const useIsOnline = () => {

    const {data, error, isLoading} = useQuery({
        queryKey: ['isOnline'],
        queryFn: async () => {
            const { connected } = await Network.getStatus()
            return connected
        },
        staleTime: 30 * 1000, // 30 seconds
    })

    return {
        isOnline: data,
        isLoading,
        error,
    }
}