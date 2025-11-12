import { useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { subscribeUserWeb, subscribeUserMobile } from "../utils/notification"
import { Capacitor } from "@capacitor/core"
import { PushNotifications } from "@capacitor/push-notifications"

const PushSubscriber: React.FC = () => {
    const { token } = useAuthStore()

    const webSubscribe = async () => {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

        const permission = await Notification.requestPermission()
        if (permission !== "granted") return

        await subscribeUserWeb(token!)
    }

    const movilSubscribe = async () => {
        const permission = await PushNotifications.requestPermissions()

        if (permission.receive !== "granted") return

        await subscribeUserMobile(token!)
    }

    useEffect(() => {
        const initPush = async () => {
            if (!token) return

            const platform = Capacitor.getPlatform()

            if (platform === "web") {
                webSubscribe()
            } else if (platform === "android" || platform === "ios") {
                movilSubscribe()
            }
        }

        initPush()
    }, [token])

    return null
}

export default PushSubscriber