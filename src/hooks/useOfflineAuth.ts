import { NativeBiometric } from "capacitor-native-biometric"

export const useOfflineAuth = () => {
    const isBiometricAvailable = () => {
        return NativeBiometric.isAvailable()
    }

    const authenticate = async () => {
        try {
            await NativeBiometric.verifyIdentity({
                reason: "Usa tu huella para ingresar sin conexión",
                description: "Desbloquear sesión"
            })

            return true
        } catch {
            return false
        }
    }

    const grantOfflineAccess = async () => {
        const available = await isBiometricAvailable()

        if (!available.isAvailable) return false

        const verified = await authenticate()
        return verified
    }

    return {
        grantOfflineAccess,
        isBiometricAvailable,
        authenticate
    }
}