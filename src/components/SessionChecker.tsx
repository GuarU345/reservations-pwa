import { useIonRouter } from "@ionic/react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { authService } from "../services/auth";

const SessionChecker: React.FC = () => {
    const { token, isLogin, setIsLogin, setUser, setToken } = useAuthStore();
    const router = useIonRouter();

    useEffect(() => {
        const checkTokenIsActive = async (token: string) => {
            try {
                const response = await authService.tokenIsActive(token);
                if (!response.active) {
                    setIsLogin(false);
                    setToken("");
                    setUser(null);
                    router.push("/login", "root");
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (isLogin && token) {
            checkTokenIsActive(token);
        }
    }, [isLogin]);

    return null;
};

export default SessionChecker