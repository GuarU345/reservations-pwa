import { Network } from "@capacitor/network"
import { useEffect, useState } from "react"

export const useIsOnline = () => {
    const [isOnline, setIsOnline] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Obtener estado inicial
        Network.getStatus().then(({ connected }) => {
            setIsOnline(connected)
            setIsLoading(false)
        })

        // Escuchar cambios de conexión en tiempo real
        const handler = Network.addListener('networkStatusChange', (status) => {
            setIsOnline(status.connected)
        })

        return () => {
            handler.then(h => h.remove())
        }
    }, [])

    return {
        isOnline,
        isLoading,
    }
}