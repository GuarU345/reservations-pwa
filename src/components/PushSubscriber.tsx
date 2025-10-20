import { useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { subscribeUserToPush } from "../utils/notification"

const PushSubscriber: React.FC = () => {
    const { token } = useAuthStore()

    useEffect(() => {
        const initPush = async () => {
            if (!token) return
            if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

            const permission = await Notification.requestPermission()
            if (permission !== "granted") return

            await subscribeUserToPush(token)
        }

        initPush()
    }, [token])

    return null
}

export default PushSubscriber