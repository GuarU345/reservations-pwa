import { useIonRouter } from "@ionic/react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { authService } from "../services/auth";
import { clearSession, loadSession } from "../store/sessionStorage";

const SessionChecker: React.FC = () => {
    const { setIsLogin, setUser, setToken } = useAuthStore();
    const router = useIonRouter();

    useEffect(() => {
        const checkTokenIsActive = async () => {
            const session = await loadSession()

            if (!session) return

            setToken(session.token)
            setIsLogin(session.isLogged)
            setUser(session.user)

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

        checkTokenIsActive()
    }, []);

    return null;
};

export default SessionChecker