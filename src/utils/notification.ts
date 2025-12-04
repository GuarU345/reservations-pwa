import { isActiveSubscription, subscribe } from "../services/notification"
import { arrayBufferToBase64, urlBase64ToUint8Array } from "./functions"

export const subscribeUserWeb = async () => {
    if (!('serviceWorker' in navigator)) return

    const registration = await navigator.serviceWorker.ready
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY ?? ""
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

    const existingSubscription = await registration.pushManager.getSubscription()

    if (!existingSubscription) {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        })

        await saveSubscription(subscription)
        return
    }

    const response = await isActiveSubscription(existingSubscription?.endpoint ?? "")

    if (response.active) return

    await existingSubscription?.unsubscribe()

    const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    })

    await saveSubscription(newSubscription)
}

const saveSubscription = async (subscription: PushSubscription) => {
    const subscribeData = {
        type: 'WEB',
        endpoint: subscription.endpoint,
        p256dh: arrayBufferToBase64(subscription.getKey("p256dh")),
        auth: arrayBufferToBase64(subscription.getKey("auth")),
        expirationTime: subscription.expirationTime
    }

    await subscribe(subscribeData)
}