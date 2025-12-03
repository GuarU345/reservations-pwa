import { useEffect } from "react"
import { useIsOnline } from "../hooks/useIsOnline"
import { useMutation } from "@tanstack/react-query"
import { getLocalPendings, removeLocalPending } from "../services/local/pendings"
import { reservationsService } from "../services/reservations"

const IsOnline: React.FC = () => {

    const {isOnline} = useIsOnline()

    const {mutate} = useMutation({
        mutationFn: async () => {
            const pendings = await getLocalPendings();

            if (pendings.length === 0) return;

            const promises = pendings.map(async ({id, ...pending}) => {
                try {
                    await reservationsService.createReservation(pending)
                
                    await removeLocalPending(id);
                } catch (error) {
                    return null;
                }
            })

            await Promise.all(promises);
        }
    })

    useEffect(() => {
        if (isOnline === false) return;

        mutate();

    }, [isOnline])

    return <div>{isOnline ? "Online" : "Offline"}</div>
}

export default IsOnline