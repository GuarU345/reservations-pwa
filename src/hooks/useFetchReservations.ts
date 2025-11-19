import { reservationsService } from "../services/reservations"
import { Reservation } from "../types/reservation"
import { useQuery } from "@tanstack/react-query"

export const useFetchReservations = () => {
    return useQuery<Reservation[], Error>({
        queryKey: ['reservations'],
        queryFn: async () => {
            const response = await reservationsService.getReservations()
            return response
        },
        staleTime: 0
    })
}