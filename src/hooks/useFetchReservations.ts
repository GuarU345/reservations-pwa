import { reservationsService } from "../services/reservations"
import { Reservation } from "../types/reservation"
import { useQuery } from "@tanstack/react-query"
import { Network } from "@capacitor/network"
import { getLocalReservations, saveLocalReservations } from "../services/local/reservations"
import { OfflineError } from "../utils/local-db"
import { useState } from "react"

export const useFetchReservations = () => {
    const [isOffline, setIsOffline] = useState(false)

    const { data: reservations = [], isLoading, error } = useQuery<Reservation[], Error>({
        queryKey: ['reservations', navigator.onLine],
        queryFn: async () => {
            try {
                const isOnline = navigator.onLine
                if (!isOnline) throw new OfflineError()

                const response = await reservationsService.getReservations()
                await saveLocalReservations(response)
                setIsOffline(false)
                return response
            } catch (error) {
                const cached = await getLocalReservations()
                
                if (cached.length > 0) {
                    setIsOffline(true)
                    return cached
                }

                if (error instanceof OfflineError) {
                    throw new Error('Sin conexión a internet')
                }
                
                throw new Error('No fue posible obtener la información')
            }
        },
        networkMode: 'always'
    })

    return {
        reservations,
        isLoading,
        error: error?.message || null,
        isOffline,
    }
}