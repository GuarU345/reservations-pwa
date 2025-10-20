import { subscribe } from "../services/notification"
import { urlBase64ToUint8Array } from "./functions"

export const subscribeUserToPush = async (token: string) => {
    if (!('serviceWorker' in navigator)) return

    const registration = await navigator.serviceWorker.ready

    const existingSubscription = await registration.pushManager.getSubscription()

    if (existingSubscription) return existingSubscription

    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY ?? ""
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    })

    const subscribeData = {
        endpoint: subscription.endpoint,
        p256dh: subscription.getKey("p256dh"),
        auth: subscription.getKey("auth"),
        expirationTime: subscription.expirationTime
    }

    await subscribe(subscribeData, token)
}