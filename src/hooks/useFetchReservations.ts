import { reservationsService } from "../services/reservations"
import { Reservation } from "../types/reservation"
import { useQuery } from "@tanstack/react-query"

export const useFetchReservations = (token: string) => {
    return useQuery<Reservation[], Error>({
        queryKey: ['reservations'],
        queryFn: async () => {
            const response = await reservationsService.getReservations(token)
            return response
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    })
}