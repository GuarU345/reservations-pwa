import { useEffect } from "react";
import { useSessionManager } from "../hooks/useSessionManager";
import { Capacitor } from "@capacitor/core";

const SessionChecker: React.FC = () => {
    const { checkSession } = useSessionManager()

    useEffect(() => {
        const platform = Capacitor.getPlatform()
        checkSession(platform)
    }, [])

    return null;
};

export default SessionChecker