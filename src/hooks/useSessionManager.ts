import { useIonRouter } from "@ionic/react";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../services/auth";
import { clearSession, loadSession } from "../store/sessionStorage";
import { Network } from "@capacitor/network";
import { useOfflineAuth } from "../hooks/useOfflineAuth";

export const useSessionManager = () => {
    const { setIsLogin, setUser, setToken } = useAuthStore();
    const { grantOfflineAccess } = useOfflineAuth()
    const router = useIonRouter();

    const checkSession = async () => {
        const session = await loadSession()

        if (!session) return

        setToken(session.token)
        setIsLogin(session.isLogged)
        setUser(session.user)

        const { connected } = await Network.getStatus()

        if (!connected) {
            const ok = await grantOfflineAccess()

            if (!ok) {
                await clearSession()
                router.push('/login', 'root')
            }

            return
        }

        try {
            const response = await authService.tokenIsActive(session.token);
            if (!response.active) {
                await clearSession()

                setIsLogin(false);
                setToken(null);
                setUser(null);
                router.push("/login", "root");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        checkSession
    }
}